import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import * as child_process from 'child_process';
import { parseStringPromise } from 'xml2js';

const contentDir = path.resolve(__dirname, '../content');
const tmpDir = path.resolve(__dirname, './tmp');
const outputDir = path.resolve(__dirname, '../public/pdfs');
const templatesDir = path.resolve(__dirname, './templates');
const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');

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
  const rootUrl = allUrls.find(u => u.match(new RegExp(`/docs/${folderName}/$`)));
  let urls = allUrls.filter(u => u.includes(`/${folderName}/`));
  if (urls.length === 0 && rootUrl) {
    urls.push(rootUrl);
  } else if (rootUrl && !urls.includes(rootUrl)) {
    urls.unshift(rootUrl);
  }
  return urls;
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

// Run the shell script to generate the PDF, then copy it to output directory
async function runPdfGenerationScript(tmpFolder: string, folderName: string, desiredFilename: string) {
  console.log(`Generating PDF for ${folderName}...`);
    try {
      child_process.execSync(`bash command.sh`, {
        cwd: tmpFolder,
        stdio: 'inherit',
      });
      const generatedPdfs = fs.readdirSync(tmpFolder).filter(f => f.endsWith('.pdf'));

      if (generatedPdfs.length === 0) {
        throw new Error(`No PDF generated for ${folderName}`);
      }

      const pdfFilename = generatedPdfs[0];
      const tmpPdfPath = path.join(tmpFolder, pdfFilename);
      const outputPdfPath = path.join(outputDir, desiredFilename);

      fs.copyFileSync(tmpPdfPath, outputPdfPath);
      console.log(`Copied PDF to: ${outputPdfPath}`);

      fs.unlinkSync(tmpPdfPath);
      return;
    } catch (err) {
      console.error(`Failed to generate PDF for ${folderName}:`, err);
    }
  }

// Main process for each folder: read metadata, build links, generate templates, run PDF script
async function processFolder(folderName: string) {
  const cardFile = path.join(contentDir, `${folderName}-card.md`);
  if (!fs.existsSync(cardFile)) {
    console.warn(`No card file for ${folderName}, skipping`);
    return;
  }

  const raw = fs.readFileSync(cardFile, 'utf-8');
  const matterResult = matter(raw);
  if (matterResult.data.external) {
    console.log(`Skipping external card: ${folderName} (${matterResult.data.external})`);
  return;
  } 
  const title: string = matterResult.data.title || folderName;
  const bundleFolder: string = matterResult.data.bundlefolder || folderName;
  const uniqueLinks = await buildFolderLinksFromSitemap(bundleFolder);
  const filteredLinks = uniqueLinks.filter(u => !u.endsWith(`/${bundleFolder}`) && !u.endsWith(`/${bundleFolder}/`));
  const normalizedLinks = filteredLinks.map(u =>
  u.split('#')[0].split('?')[0].replace(/\/$/, '')
);
  const seen = new Set<string>();
  const dedupedLinks = normalizedLinks.filter(u => {
  if (seen.has(u)) return false;
  seen.add(u);
  return true;
});
  if (dedupedLinks.length === 0) {
    console.warn(`No usable links for ${folderName} (bundlefolder: ${bundleFolder}), skipping`);
    return;
  }

  const linksBlock = dedupedLinks
    .map((link, i, arr) => `  ${link}${i < arr.length - 1 ? ' \\' : ''}`)
    .join('\n');
  const pdfFilename = titleToFilename(title);
  const tmpFolder = path.join(tmpDir, folderName);
  if (fs.existsSync(tmpFolder)) {
    fs.rmSync(tmpFolder, { recursive: true, force: true });
    console.log(`Cleaned temp folder: ${tmpFolder}`);
  }
  fs.mkdirSync(tmpFolder, { recursive: true });
  const current_Year = new Date().getFullYear().toString();
  const replacements = { title, urls: linksBlock, current_year: current_Year};
  generateTemplateFiles(tmpFolder, replacements);
  runPdfGenerationScript(tmpFolder, folderName, pdfFilename);
  await sleep(5000);
}