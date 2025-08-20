import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import { URL } from 'url';
import matter from 'gray-matter';
import * as child_process from 'child_process';

const baseUrl = 'http://localhost:1313/docs/';
const contentDir = path.resolve(__dirname, '../content');
const tmpDir = path.resolve(__dirname, './tmp');
const outputDir = path.resolve(__dirname, '../static/pdfs');
const templatesDir = path.resolve(__dirname, './templates');

const visited = new Set<string>();
const allLinks: string[] = [];

(async () => {
  console.log(`Crawling from ${baseUrl}`);
  await crawlLinks(baseUrl);

  const linksByFolder = groupLinksByFolder(allLinks);

  if (fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    console.log(`Cleaned entire tmp directory: ${tmpDir}`);
  }
  fs.mkdirSync(tmpDir, { recursive: true });

  deleteOldPdfs(outputDir);

  for (const folderName of Object.keys(linksByFolder)) {
    await processFolder(folderName, linksByFolder[folderName]);
  }
})();

async function crawlLinks(url: string): Promise<void> {
  if (visited.has(url)) return;
  visited.add(url);

  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      if (!href) return;

      try {
        const fullUrl = new URL(href, url).href;
        if (
          fullUrl.startsWith(baseUrl) &&
          !visited.has(fullUrl) &&
          !fullUrl.includes('#') &&
          !fullUrl.endsWith('.pdf') &&
          !fullUrl.includes('mailto:')
        ) {
          allLinks.push(fullUrl);
        }
      } catch {}
    });

    for (const link of [...new Set(allLinks)]) {
      await crawlLinks(link);
    }
  } catch (err) {
    console.warn(`Failed to load ${url}`);
  }
}

function groupLinksByFolder(links: string[]): Record<string, string[]> {
  const grouped: Record<string, string[]> = {};
  for (const link of links) {
    const parts = link.replace(baseUrl, '').split('/').filter(Boolean);
    const folder = parts[0];
    if (!folder) continue;
    if (!grouped[folder]) grouped[folder] = [];
    grouped[folder].push(link);
  }
  return grouped;
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

async function processFolder(folderName: string, links: string[]) {
  const contentPath = path.join(contentDir, folderName);
  const indexFile = ['_index.md', '_index.html']
    .map(name => path.join(contentPath, name))
    .find(fs.existsSync);

  if (!indexFile) {
    console.warn(`No _index found in ${folderName}, skipping`);
    return;
  }

  const raw = fs.readFileSync(indexFile, 'utf-8');
  const { data } = matter(raw);
  const title = data.title || folderName;

  const normalizedBase = `${baseUrl}${folderName}`.replace(/\/+$/, '');
  const uniqueLinks = Array.from(new Set(
    links.map(link => link.replace(/\/+$/, ''))
  ))
    .filter(link => link !== normalizedBase)
    .sort();

  if (uniqueLinks.length === 0) {
    console.warn(`No usable links for ${folderName}, skipping`);
    return;
  }

  console.log(`${folderName}: ${links.length} total → ${uniqueLinks.length} unique links`);

  const linksBlock = uniqueLinks.map((link, i, arr) => `  ${link}${i < arr.length - 1 ? ' \\' : ''}`).join('\n');

  
  const replacements = { title, urls: linksBlock };

  const tmpFolder = path.join(tmpDir, folderName);

  if (fs.existsSync(tmpFolder)) {
    fs.rmSync(tmpFolder, { recursive: true, force: true });
    console.log(`Cleaned temp folder: ${tmpFolder}`);
  }

  fs.mkdirSync(tmpFolder, { recursive: true });

  generateTemplateFiles(tmpFolder, replacements);
  runPdfGenerationScript(tmpFolder, folderName);

}


function generateTemplateFiles(tmpFolder: string, replacements: Record<string, string>) {
  const templates = [
    { filename: 'pdf-copyright-page.html', outName: 'copyright.html' },
    { filename: 'cover.template.html', outName: 'cover.html' },
    { filename: 'header.template.html', outName: 'header.html' }
  ];

  for (const { filename, outName } of templates) {
    const templatePath = path.join(templatesDir, filename);
    const outputPath = path.join(tmpFolder, outName);
    const rendered = applyTemplate(fs.readFileSync(templatePath, 'utf-8'), replacements);
    fs.writeFileSync(outputPath, rendered);
  }

  const commandContent = applyTemplate(fs.readFileSync(path.join(templatesDir, 'command.template.sh'), 'utf-8'), replacements);
  const scriptPath = path.join(tmpFolder, 'command.sh');
  fs.writeFileSync(scriptPath, commandContent);
  fs.chmodSync(scriptPath, 0o755);
}

function runPdfGenerationScript(tmpFolder: string, folderName: string) {
  console.log(`Generating PDF for ${folderName}...`);
  try {
    child_process.execSync(`bash command.sh`, {
      cwd: tmpFolder,
      stdio: 'inherit',
    });

    const generatedPdfs = fs.readdirSync(tmpFolder).filter(f => f.endsWith('.pdf'));

    if (generatedPdfs.length === 0) {
      console.warn(`No PDF generated for ${folderName}`);
      return;
    }

    const pdfFilename = generatedPdfs[0];
    const tmpPdfPath = path.join(tmpFolder, pdfFilename);
    const outputPdfPath = path.join(outputDir, pdfFilename);

    fs.copyFileSync(tmpPdfPath, outputPdfPath);
    console.log(`Copied PDF to: ${outputPdfPath}`);

    fs.unlinkSync(tmpPdfPath);
  } catch (err) {
    console.error(`Failed to generate PDF for ${folderName}:`, err);
  }
}

function applyTemplate(template: string, replacements: Record<string, string>) {
  return template.replace(/{{\s*(\w+)\s*}}/g, (_, key) => replacements[key] || '');
}
