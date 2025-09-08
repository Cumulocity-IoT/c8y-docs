import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import * as child_process from 'child_process';
import { parseStringPromise } from 'xml2js';

const contentDir = path.resolve(__dirname, '../content');
const tmpDir = path.resolve(__dirname, './tmp');
const outputDir = path.resolve(__dirname, '../static/pdfs');
const templatesDir = path.resolve(__dirname, './templates');
const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');

(async () => {
  if (fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    console.log(`Cleaned entire tmp directory: ${tmpDir}`);
  }
  fs.mkdirSync(tmpDir, { recursive: true });

  deleteOldPdfs(outputDir);

  const folders = findFoldersWithCards(contentDir);
  if (folders.length === 0) {
    console.warn('No *-card.md files found under content');
    return;
  }

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

async function buildFolderLinksFromSitemap(folderName: string): Promise<string[]> {
  const allUrls = await loadUrlsFromSitemap();
  let urls = allUrls.filter(u => u.includes(`/${folderName}/`));

  // 🔽 Always remove the folder root url (/docs/folderName/)
  urls = urls.filter(u => !u.match(new RegExp(`/docs/${folderName}/$`)));

  return urls;
}



function extractCurrentVersion(): string {
  const versionFilePath = path.resolve(
    __dirname,
    '../themes/c8ydocs/layouts/shortcodes/c8y-current-version.html'
  );

  if (!fs.existsSync(versionFilePath)) {
    throw new Error(`Version file not found at ${versionFilePath}`);
  }

  const versionRaw = fs.readFileSync(versionFilePath, 'utf-8');
  const match = versionRaw.match(/{{-\s*"(.+?)"\s*-}}/);

  if (!match) {
    throw new Error('Could not extract version information from c8y-current-version.html');
  }

  return match[1];
}

function titleToFilename(title: string, version: string) {
  return `${title.trim()}-y${version}.pdf`
    .replace(/[^\w\s.-]/g, '') // allow letters, numbers, spaces, dots, hyphens
    .replace(/\s+/g, ' '); // normalize multiple spaces
}

function applyTemplate(template: string, replacements: Record<string, string>) {
  return template.replace(/{{\s*(\w+)\s*}}/g, (_, key) => replacements[key] || '');
}

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

async function runPdfGenerationScript(tmpFolder: string, folderName: string, desiredFilename: string) {
  console.log(`Generating PDF for ${folderName}...`);

  for (let attempt = 1; attempt <= 3; attempt++) {
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

      // ✅ success → return
      return;
    } catch (err) {
      console.error(`❌ Attempt ${attempt} failed for ${folderName}:`, err);
      if (attempt < 3) {
        console.log(`⏳ Retrying ${folderName} after 10s...`);
        await sleep(10000);
      } else {
        console.error(`🚨 Failed to generate PDF for ${folderName} after 3 attempts`);
      }
    }
  }
}


async function processFolder(folderName: string) {
  const cardFile = path.join(contentDir, `${folderName}-card.md`);
  if (!fs.existsSync(cardFile)) {
    console.warn(`No card file for ${folderName}, skipping`);
    return;
  }

  const raw = fs.readFileSync(cardFile, 'utf-8');
  const matterResult = matter(raw);
  const title: string = matterResult.data.title || folderName;
  const bundleFolder: string = matterResult.data.bundlefolder || folderName;
  const uniqueLinks = await buildFolderLinksFromSitemap(bundleFolder);
  if (uniqueLinks.length === 0) {
    console.warn(`No usable links for ${folderName} (bundlefolder: ${bundleFolder}), skipping`);
    return;
  }

  console.log(`${folderName} → ${bundleFolder}: ${uniqueLinks.length} pages`);

  const linksBlock = uniqueLinks
    .map((link, i, arr) => `  ${link}${i < arr.length - 1 ? ' \\' : ''}`)
    .join('\n');
  const version = extractCurrentVersion();
  const pdfFilename = titleToFilename(title, version);
  const tmpFolder = path.join(tmpDir, folderName);
  if (fs.existsSync(tmpFolder)) {
    fs.rmSync(tmpFolder, { recursive: true, force: true });
    console.log(`Cleaned temp folder: ${tmpFolder}`);
  }
  fs.mkdirSync(tmpFolder, { recursive: true });
  const replacements = { title, urls: linksBlock, version };
  generateTemplateFiles(tmpFolder, replacements);
  runPdfGenerationScript(tmpFolder, folderName, pdfFilename);
  await sleep(5000); // wait 5s before next folder

}

