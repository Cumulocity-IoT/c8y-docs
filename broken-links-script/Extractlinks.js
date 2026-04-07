import fs from "fs";
import path from "path";
import matter from "gray-matter";

const getMarkdownFiles = (dir) => {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let markdownFiles = [];
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      markdownFiles = markdownFiles.concat(getMarkdownFiles(fullPath));
    } else if (file.isFile() && file.name.endsWith(".md")) {
      markdownFiles.push(fullPath);
    }
  }
  return markdownFiles;
};

const BASE_URL = "https://cumulocity.com/docs/2025";

const shortcodeMapping = {

  "c8y-current-version": "2025",
  "c8y-edge-current-version": "2025",
  "c8y-resources-server-link": "https://download.cumulocity.com/",
  "c8y-resources-server": "Cumulocity Download Center",
  "c8y-support-link": "https://cumulocity.com/support",
  "c8y-support-portal": "Cumulocity Customer Service Desk",
  "c8y-tech-community-link": "https://community.cumulocity.com/",
  "c8y-tech-community": "Cumulocity Tech Community",
  "company-c8y": "Cumulocity",
  "device-portal": "Partner Devices Ecosystem",
  "domain-c8y": "cumulocity.com",
  "email-c8y-info": "info@cumulocity.com",
  "enterprise-tenant": "Enterprise tenant",
  "learning-portal": "Cumulocity Learning Portal",
  "link-apama-webhelp": "https://cumulocity.com/apama/docs/10.15",
  "link-apamadoc-api": "https://cumulocity.com/apama/docs/10.15/related/ApamaDoc/",
  "link-c8y-github": "https://github.com/Cumulocity-IoT/",
  "link-c8y-training": "https://learning.cumulocity.com",
  "link-device-portal": "https://ecosystem.cumulocity.com/devices/?filter_cumulocity_certified=yes",
  "management-tenant": "Management tenant",
  "openapi": "Cumulocity OpenAPI Specification",
  "product-c8y-iot": "Cumulocity",
  "sensor-app": "Cumulocity Sensor App",
  "standard-tenant": "Standard tenant",
  "c8y-support-email": "support@cumulocity.com",
  "email-c8y-info": "info@cumulocity.com",
};

const hasRenderFalse = (fileContent) => {
  try {
    const { data } = matter(fileContent);
    return data?.build?.render === false || data?._build?.render === false;
  } catch {
    return false;
  }
};

const resolveHugoShortcode = (link) => {
  return link.replace(/\{\{<\s*(.*?)\s*>\}\}/g, (match, shortcode) => {
    const resolvedValue = shortcodeMapping[shortcode];
    return resolvedValue !== undefined && resolvedValue !== null ? resolvedValue : "";
  });
};

const resolveFullUrl = (link, relativePath, fileContent) => {
  if (link.startsWith("mailto:") || link.startsWith("tel:")) {
    return null;
  }

  if (link.startsWith("#")) {
    const fileDir = path.dirname(relativePath).replaceAll(path.sep, "/");
    const fileName = path.basename(relativePath, ".md");

    let segments = fileDir.split("/").filter(Boolean);
    let hasBundle = false;

    if (segments.length > 0) {
      const lastSegment = segments[segments.length - 1];
      if (/-bundle$/.test(lastSegment)) {
        segments[segments.length - 1] = lastSegment.replace(/-bundle$/, "");
        hasBundle = true;
      }
    }

    // if this file is not rendered, publish from its directory (e.g., /glossary/)
    const notRendered = hasRenderFalse(fileContent);

    let publishedBasePath = "";
    if (notRendered || hasBundle) {
      publishedBasePath = segments.join("/");
    } else {
      publishedBasePath = fileName === "index" ? fileDir : `${fileDir}/${fileName}`;
    }
    let url = `${BASE_URL}/${publishedBasePath}#${link.substring(1)}`;
    url = url.replace(/([^:]\/)\/+/g, '$1'); // removes duplicate slashes
    url = url.replace(/\/#/g, '#'); // removes slash before hash
    return url;
  }

  const resolvedLink = resolveHugoShortcode(link);
  if (/^https?:\/\//i.test(resolvedLink)) {
    return resolvedLink;
  }
  return `${BASE_URL.replace(/\/$/, "")}/${resolvedLink.replace(/^\//, "")}`;
};

(() => {
  const projectDir = "../content";
  const markdownFiles = getMarkdownFiles(projectDir);
  const linkMap = {};

  markdownFiles.forEach((mdFile) => {
    const relativePath = path.relative(projectDir, mdFile).replace(/\\/g, "/");
    const content = fs.readFileSync(mdFile, "utf8");

    // Find markdown links
    const linkMatches = [...content.matchAll(/(?<!\!)\[.*?\]\((.+?)\)/g)];
    linkMatches.forEach(match => {
      const link = match[1];
      const resolvedLink = resolveFullUrl(link, relativePath, content);
      if (resolvedLink) {
        if (!linkMap[resolvedLink]) {
          linkMap[resolvedLink] = new Set();
        }
        linkMap[resolvedLink].add(relativePath);
      }
    });
  });

  const result = Object.keys(linkMap).map(link => ({
    link,
    files: Array.from(linkMap[link])
  }));

  fs.writeFileSync("all_links.json", JSON.stringify(result, null, 2));
  console.log("All links and their file paths saved to all_links.json");
})();
