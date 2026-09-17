import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import * as child_process from 'child_process';
import { parseStringPromise } from 'xml2js';
import archiver from 'archiver';

const contentDir = path.resolve(__dirname, '../content');
const tmpDir = path.resolve(__dirname, './tmp');
const outputDir = path.resolve(__dirname, '../public/pdfs');
const templatesDir = path.resolve(__dirname, './templates');
const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
const sectorToPdfs = new Map<string, Set<string>>();
const zipOutputDir = path.resolve(__dirname, '../public/zips');

// Outcome of every card we looked at, so the run can be summarized at the end instead of
// leaving failures buried in the build log.
type BundleStatus = 'ok' | 'failed' | 'skipped-external' | 'no-links';
interface BundleResult {
  folder: string;
  title: string;
  pdfFilename?: string;
  status: BundleStatus;
  reason?: string;
  // Set when the PDF was produced despite wkhtmltopdf exiting non-zero.
  warning?: string;
}
const bundleResults: BundleResult[] = [];

// Sectors whose ZIP was not written because none of its PDFs were generated.
const skippedSectors: string[] = [];
// Sector -> PDFs that were expected but missing when the ZIP was built.
const incompleteSectors = new Map<string, string[]>();

(async () => {
  // Clean and recreate tmp directory
  if (fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    console.log(`Cleaned entire tmp directory: ${tmpDir}`);
  }
  fs.mkdirSync(tmpDir, { recursive: true });

  deleteOldPdfs(outputDir);

  // Search all folders and subfolders for *-card.md files
  const folders = findFoldersWithCards(contentDir);
  if (folders.length === 0) {
    console.warn('No *-card.md files found under content');
    return;
  }

  // Process each folder to generate PDFs
  for (const folderName of folders) {
    try {
      await processFolder(folderName);
    } catch (err) {
      console.error(`Failed to process folder "${folderName}":`, err);
    }
  }
  await buildSectorZips();
  reportSummary();
})();

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Get folders that have *-card.md files 
function findFoldersWithCards(root: string): string[] {
  const results: string[] = [];

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      if (e.isDirectory()) {
        walk(path.join(dir, e.name));
      } else if (e.isFile()) {
        const m = e.name.match(/^(.+)-card\.md$/);
        if (m) {
          const relativeDir = path.relative(root, dir);
          const folderName = path.join(relativeDir, m[1]);
          results.push(folderName);
        }
      }
    }
  }
  walk(root);
  return results.sort();
}

// Delete old PDFs in the output directory
function deleteOldPdfs(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
  fs.readdirSync(dir)
    .filter(file => file.endsWith('.pdf'))
    .forEach(file => {
      const filePath = path.join(dir, file);
      fs.unlinkSync(filePath);
      console.log(`Deleted old PDF: ${file}`);
    });
}

// Load and parse sitemap.xml, return all URLs
async function loadUrlsFromSitemap(): Promise<string[]> {
  if (!fs.existsSync(sitemapPath)) {
    throw new Error(`sitemap.xml not found at ${sitemapPath}`);
  }

  const rawXml = fs.readFileSync(sitemapPath, 'utf-8');
  const result = await parseStringPromise(rawXml);

  const urls: string[] = [];
  if (result?.urlset?.url) {
    for (const u of result.urlset.url) {
      if (u.loc?.[0]) {
        urls.push(u.loc[0]);
      }
    }
  }
  return urls;
}

// Get sitemap URLs that belong to a specific folder
async function buildFolderLinksFromSitemap(folderName: string): Promise<string[]> {
  const allUrls = await loadUrlsFromSitemap();
  let urls = allUrls.filter(u => u.includes(`/${folderName}/`));
  urls = urls.filter(u => !u.endsWith(`/${folderName}`) && !u.endsWith(`/${folderName}/`));
  const normalized = urls.map(u => u.split('#')[0].split('?')[0].replace(/\/$/, ''));
  return [...new Set(normalized)];
}

// Convert a title into a valid PDF filename
function titleToFilename(title: string) {
  return `${title.trim()}.pdf`
    .replace(/[^\w\s.-]/g, '') // allow letters, numbers, spaces, dots, hyphens
    .replace(/\s+/g, ' '); // normalize multiple spaces
}

// Replace placeholders in a template with actual values
function applyTemplate(template: string, replacements: Record<string, string>) {
  return template.replace(/{{\s*(\w+)\s*}}/g, (_, key) => replacements[key] || '');
}

// Generate HTML and bash script files from templates directory
function generateTemplateFiles(tmpFolder: string, replacements: Record<string, string>) {
  fs.mkdirSync(tmpFolder, { recursive: true });
  const templates = [
    { filename: 'pdf-copyright-page.html', outName: 'copyright.html' },
    { filename: 'cover.template.html', outName: 'cover.html' },
    { filename: 'header.template.html', outName: 'header.html' },
  ];

  for (const { filename, outName } of templates) {
    const templatePath = path.join(templatesDir, filename);
    const outputPath = path.join(tmpFolder, outName);
    const rendered = applyTemplate(fs.readFileSync(templatePath, 'utf-8'), replacements);
    fs.writeFileSync(outputPath, rendered);
  }

  const commandContent = applyTemplate(
    fs.readFileSync(path.join(templatesDir, 'command.template.sh'), 'utf-8'),
    replacements
  );
  const scriptPath = path.join(tmpFolder, 'command.sh');
  fs.writeFileSync(scriptPath, commandContent);
  fs.chmodSync(scriptPath, 0o755);
}

// Combined stdout/stderr of a failed execSync call.
function outputOf(err: unknown): string {
  return [
    (err as { stderr?: Buffer | string })?.stderr?.toString() ?? '',
    (err as { stdout?: Buffer | string })?.stdout?.toString() ?? '',
  ].join('\n');
}

// True when wkhtmltopdf could not load a single one of the bundle's content pages. It still
// writes a PDF in that case - cover, copyright and an empty table of contents - which must not
// be mistaken for a successful render.
function allContentPagesFailed(err: unknown, links: string[]): boolean {
  if (links.length === 0) return false;
  const output = outputOf(err);
  return links.every(link => {
    // The sitemap URLs are normalized without a trailing slash; wkhtmltopdf echoes them back
    // verbatim in its "Failed to load <url>" / "Failed loading page <url>" messages.
    const escaped = link.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`Failed (?:to load|loading page) ${escaped}(?![\\w/-])`).test(output);
  });
}

// Pick the most useful lines out of a wkhtmltopdf run so the summary says *why* it failed
// ("Authentication Required", "ContentNotFound", ...) instead of just "Command failed".
function extractFailureReason(err: unknown): string {
  const output = outputOf(err);

  const lines = output
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
    // Progress bars and per-page counters carry no diagnostic value.
    .filter(l => !/^\[=*>?\s*\]/.test(l) && !/^(Loading|Counting|Resolving|Rendering|Printing|Done)\b/.test(l));

  const errorLines = lines.filter(l => /error|warning|failed|exit with code/i.test(l));
  const picked = (errorLines.length ? errorLines : lines).slice(-3);
  return picked.join(' | ') || (err instanceof Error ? err.message : String(err));
}

// Run the shell script to generate the PDF, then copy it to output directory.
// Never throws: a failed bundle is reported at the end of the run rather than aborting the
// whole deploy, since a transient render error should not block a documentation release.
async function runPdfGenerationScript(
  tmpFolder: string,
  folderName: string,
  desiredFilename: string,
  links: string[]
): Promise<{ ok: boolean; reason?: string; warning?: string }> {
  console.log(`Generating PDF for ${folderName}...`);

  let runError: unknown;
  try {
    // Captured rather than inherited so the output can be attributed to this bundle.
    child_process.execSync(`bash command.sh`, {
      cwd: tmpFolder,
      stdio: ['ignore', 'pipe', 'pipe'],
      maxBuffer: 32 * 1024 * 1024,
    });
  } catch (err) {
    runError = err;
  }

  // wkhtmltopdf exits non-zero for any sub-resource it could not load (a missing image, a
  // stray script) even when it rendered every page and wrote a complete PDF. Judge the run by
  // whether a PDF came out, not by the exit code, and downgrade the error to a warning -
  // otherwise a single missing asset would discard a perfectly good document.
  let generatedPdfs: string[] = [];
  try {
    generatedPdfs = fs.readdirSync(tmpFolder).filter(f => f.endsWith('.pdf'));
  } catch {
    generatedPdfs = [];
  }

  if (generatedPdfs.length === 0) {
    const reason = runError
      ? extractFailureReason(runError)
      : `wkhtmltopdf reported success but produced no PDF in ${tmpFolder}`;
    console.error(`Failed to generate PDF for ${folderName}: ${reason}`);
    return { ok: false, reason };
  }

  // A PDF containing only the cover and an empty table of contents is worse than none at all.
  if (runError && allContentPagesFailed(runError, links)) {
    const reason = `none of the ${links.length} pages could be loaded - ${extractFailureReason(runError)}`;
    console.error(`Failed to generate PDF for ${folderName}: ${reason}`);
    fs.rmSync(path.join(tmpFolder, generatedPdfs[0]), { force: true });
    return { ok: false, reason };
  }

  const pdfFilename = generatedPdfs[0];
  const tmpPdfPath = path.join(tmpFolder, pdfFilename);
  const outputPdfPath = path.join(outputDir, desiredFilename);

  try {
    fs.copyFileSync(tmpPdfPath, outputPdfPath);
    fs.unlinkSync(tmpPdfPath);
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.error(`Failed to store PDF for ${folderName}: ${reason}`);
    return { ok: false, reason };
  }

  if (runError) {
    const warning = extractFailureReason(runError);
    console.warn(`Generated PDF for ${folderName} with errors: ${warning}`);
    console.log(`Copied PDF to: ${outputPdfPath}`);
    return { ok: true, warning };
  }

  console.log(`Copied PDF to: ${outputPdfPath}`);
  return { ok: true };
}

// Main process for each folder: read metadata, build links, generate templates, run PDF script
async function processFolder(folderName: string) {
  const cardFile = path.join(contentDir, `${folderName}-card.md`);
  if (!fs.existsSync(cardFile)) {
    console.warn(`No card file for ${folderName}, skipping`);
    bundleResults.push({
      folder: folderName,
      title: folderName,
      status: 'no-links',
      reason: `card file not found at ${cardFile}`,
    });
    return;
  }

  const raw = fs.readFileSync(cardFile, 'utf-8');
  const matterResult = matter(raw);
  const cardTitle: string = matterResult.data.title || folderName;
  if (matterResult.data.external) {
    console.log(`Skipping external card: ${folderName} (${matterResult.data.external})`);
    bundleResults.push({
      folder: folderName,
      title: cardTitle,
      status: 'skipped-external',
      reason: String(matterResult.data.external),
    });
    return;
  }
  const title: string = cardTitle;
  const bundleFolder: string = matterResult.data.bundlefolder || folderName;
  const links = await buildFolderLinksFromSitemap(bundleFolder);
  if (links.length === 0) {
    console.warn(`No usable links for ${folderName} (bundlefolder: ${bundleFolder}), skipping`);
    bundleResults.push({
      folder: folderName,
      title,
      status: 'no-links',
      reason: `no sitemap URLs matched bundlefolder "${bundleFolder}"`,
    });
    return;
  }

  const linksBlock = links
    .map((link, i, arr) => `  ${link}${i < arr.length - 1 ? ' \\' : ''}`)
    .join('\n');
  const pdfFilename = titleToFilename(title);
  const isNotEmpty = (s: unknown): boolean => String(s).trim().length > 0;
  const sectors: string[] = [matterResult.data.sector].flat().filter(isNotEmpty);

  for (const key of sectors) {
    if (!sectorToPdfs.has(key)) sectorToPdfs.set(key, new Set());
    sectorToPdfs.get(key)!.add(pdfFilename);
  }

  const tmpFolder = path.join(tmpDir, folderName);
  if (fs.existsSync(tmpFolder)) {
    fs.rmSync(tmpFolder, { recursive: true, force: true });
    console.log(`Cleaned temp folder: ${tmpFolder}`);
  }
  fs.mkdirSync(tmpFolder, { recursive: true });

  const current_Year = new Date().getFullYear().toString();
  const replacements = { title, urls: linksBlock, current_year: current_Year };
  generateTemplateFiles(tmpFolder, replacements);
  const result = await runPdfGenerationScript(tmpFolder, folderName, pdfFilename, links);
  bundleResults.push({
    folder: folderName,
    title,
    pdfFilename,
    status: result.ok ? 'ok' : 'failed',
    reason: result.reason,
    warning: result.warning,
  });
  await sleep(5000);
}

function sanitizeZipName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^\w-]+/g, '-')   
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Archives exactly the files it is given; callers are responsible for checking they exist.
function createZip(zipPath: string, files: string[]) {
  return new Promise<void>((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    output.on('close', () => resolve());
    output.on('error', reject);
    archive.on('error', reject);
    archive.pipe(output);

    for (const filePath of files) {
      archive.file(filePath, { name: path.basename(filePath) });
    }
    archive.finalize();
  });
}

// Remove ZIPs from a previous run so a sector that no longer produces one does not keep
// shipping a stale archive from a reused workspace.
function deleteOldZips(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
  fs.readdirSync(dir)
    .filter(file => file.endsWith('.zip'))
    .forEach(file => {
      fs.unlinkSync(path.join(dir, file));
      console.log(`Deleted old ZIP: ${file}`);
    });
}

async function buildSectorZips() {
  deleteOldZips(zipOutputDir);
  for (const [sector, pdfSet] of sectorToPdfs.entries()) {
    const pdfs = Array.from(pdfSet);
    if (pdfs.length === 0) continue;

    const present: string[] = [];
    const missing: string[] = [];
    for (const pdf of pdfs) {
      const pdfPath = path.join(outputDir, pdf);
      if (fs.existsSync(pdfPath)) present.push(pdfPath);
      else missing.push(pdf);
    }

    // Writing an empty archive here would replace the currently published ZIP with a
    // useless one. Skipping leaves the previous, working ZIP in place on the server -
    // the upload steps do not delete what they do not overwrite.
    if (missing.length > 0) {
      incompleteSectors.set(sector, missing);
    }
    if (present.length === 0) {
      skippedSectors.push(sector);
      console.error(`No PDFs available for sector "${sector}" - not writing a ZIP`);
      continue;
    }

    const zipName = `${sanitizeZipName(sector)}.zip`;
    const zipPath = path.join(zipOutputDir, zipName);

    await createZip(zipPath, present);
    console.log(
      `Created ZIP for sector "${sector}" (${present.length}/${pdfs.length} PDFs): ${zipPath}`
    );
  }
}

// Print a digest of the run and, on GitHub Actions, surface it as annotations and in the job
// summary. The exit code stays 0 on purpose: a failed bundle must not block a docs release.
function reportSummary() {
  const failed = bundleResults.filter(r => r.status === 'failed');
  const noLinks = bundleResults.filter(r => r.status === 'no-links');
  const generated = bundleResults.filter(r => r.status === 'ok');
  const external = bundleResults.filter(r => r.status === 'skipped-external');
  const withWarnings = generated.filter(r => r.warning);

  console.log('\n===== PDF generation summary =====');
  console.log(
    `Bundles: ${generated.length} generated (${withWarnings.length} with render errors), ` +
      `${failed.length} failed, ${noLinks.length} without usable links, ` +
      `${external.length} external (skipped)`
  );

  for (const r of failed) {
    console.error(`  FAILED  ${r.folder} ("${r.title}"): ${r.reason ?? 'unknown error'}`);
  }
  for (const r of withWarnings) {
    console.warn(`  OK*     ${r.folder} ("${r.title}") rendered with errors: ${r.warning}`);
  }
  for (const r of noLinks) {
    console.warn(`  SKIPPED ${r.folder} ("${r.title}"): ${r.reason ?? 'no usable links'}`);
  }

  for (const [sector, pdfSet] of sectorToPdfs.entries()) {
    const total = pdfSet.size;
    const missing = incompleteSectors.get(sector) ?? [];
    if (skippedSectors.includes(sector)) {
      console.error(`  sector ${sector}: 0/${total} PDFs - ZIP not written`);
    } else if (missing.length > 0) {
      console.warn(`  sector ${sector}: ${total - missing.length}/${total} PDFs - missing: ${missing.join(', ')}`);
    } else {
      console.log(`  sector ${sector}: ${total}/${total} PDFs`);
    }
  }
  console.log('==================================\n');

  // GitHub Actions annotations, so failures are visible on the run page without opening the log.
  if (process.env.GITHUB_ACTIONS) {
    for (const r of failed) {
      console.log(`::warning title=PDF generation failed::${r.folder} - ${r.reason ?? 'unknown error'}`);
    }
    for (const r of withWarnings) {
      console.log(`::warning title=PDF rendered with errors::${r.folder} - ${r.warning}`);
    }
    for (const sector of skippedSectors) {
      console.log(`::error title=Empty ZIP skipped::No PDFs for sector "${sector}"; previous ZIP left untouched`);
    }
    for (const [sector, missing] of incompleteSectors.entries()) {
      if (skippedSectors.includes(sector)) continue; // already reported as an error above
      console.log(`::warning title=Incomplete ZIP::Sector "${sector}" is missing: ${missing.join(', ')}`);
    }
  }

  const summaryFile = process.env.GITHUB_STEP_SUMMARY;
  if (summaryFile) {
    const rows = [
      '## PDF generation',
      '',
      `${generated.length} generated (${withWarnings.length} with render errors), ${failed.length} failed, ` +
        `${noLinks.length} without usable links, ${external.length} external.`,
      '',
      '| Sector | PDFs | ZIP |',
      '| --- | --- | --- |',
      ...Array.from(sectorToPdfs.entries()).map(([sector, pdfSet]) => {
        const total = pdfSet.size;
        const missing = incompleteSectors.get(sector) ?? [];
        const zipState = skippedSectors.includes(sector)
          ? 'not written'
          : missing.length > 0
            ? `incomplete (missing: ${missing.join(', ')})`
            : 'ok';
        return `| ${sector} | ${total - missing.length}/${total} | ${zipState} |`;
      }),
    ];

    if (failed.length > 0) {
      rows.push('', '### Failed bundles', '', '| Bundle | Reason |', '| --- | --- |');
      for (const r of failed) {
        rows.push(`| ${r.folder} | ${(r.reason ?? 'unknown error').replace(/\|/g, '\\|')} |`);
      }
    }

    fs.appendFileSync(summaryFile, rows.join('\n') + '\n');
  }

  // Tell the workflow whether this run produced a complete set. Only then is it safe to prune
  // the remote directories with rsync --delete-after; after a partial run, deleting what this
  // run failed to produce would take live PDFs and sector ZIPs offline.
  const complete =
    failed.length === 0 && skippedSectors.length === 0 && incompleteSectors.size === 0;
  const outputFile = process.env.GITHUB_OUTPUT;
  if (outputFile) {
    fs.appendFileSync(outputFile, `complete=${complete}\n`);
  }
  console.log(`Run complete (safe to prune stale files): ${complete}`);
}