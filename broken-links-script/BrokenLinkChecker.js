import fs from "fs";
import path from "path";

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

const BASE_URL = "https://cumulocity.com/docs";

const shortcodeMapping = {
  "product-c8y-iot": "Cumulocity",
  "domain-c8y": "cumulocity.com",
  "link-c8y-github": "https://github.com/Cumulocity-IoT/",
  "c8y-edge-current-version-alt": "10.18",
  "c8y-edge-current-version": "1018",
  "c8y-support-link": "https://cumulocity.com/support",
  "link-apamadoc-api": "https://cumulocity.com/apama/docs/latest/related/ApamaDoc/index.html",
  "link-c8y-doc-baseurl": ".Page.Site.BaseURL",
  "link-device-portal": "https://ecosystem.cumulocity.com/devices/?filter_cumulocity_certified=yes",
  "link-apama-webhelp": "https://cumulocity.com/apama/docs/latest",
  "link-c8y-training": "https://cumulocity.moodlecloud.com/",
  "c8y-resources-server-link": "https://download.cumulocity.com/",
  "c8y-tech-community-link": "https://techcommunity.cumulocity.com/",
  "c8y-support-email": "support@cumulocity.com",
  "email-c8y-info": "info@cumulocity.com",
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
    const fileDir = path.dirname(relativePath);
    const fileName = path.basename(relativePath, ".md");
    let segments = fileDir.split(path.sep);
    let hasBundle = false;

    if (segments.length > 0) {
      const lastSegment = segments[segments.length - 1];
      if (lastSegment.endsWith("-bundle")) {
        segments[segments.length - 1] = lastSegment.replace(/-bundle$/, "");
        hasBundle = true;
      }
    }

    let publishedBasePath = "";
    if (hasBundle) {
      publishedBasePath = segments.join("/");
    } else {
      publishedBasePath = fileName === "index" ? fileDir : path.join(fileDir, fileName);
    }
    publishedBasePath = publishedBasePath
      .replace(/\\/g, "/")
      .replace(/^\/+/, "")
      .replace(/\/+$/, "");
    return `${BASE_URL.replace(/\/$/, "")}/${publishedBasePath}/#${link.substring(1)}`;
  }

  const resolvedLink = resolveHugoShortcode(link);
  if (resolvedLink.startsWith("http://") || resolvedLink.startsWith("https://")) {
    return resolvedLink;
  }
  return `${BASE_URL.replace(/\/$/, "")}/${resolvedLink.replace(/^\//, "")}`;
};

(() => {
  const projectDir = "../content";
  const markdownFiles = getMarkdownFiles(projectDir);
  
  // Use an object to map each unique link to a Set of file paths where it's found.
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

    // Find header anchors
    const headerAnchorMatches = [...content.matchAll(/^#{1,6}.*\{#([^}]+)\}/gm)];
    headerAnchorMatches.forEach(match => {
      const anchor = "#" + match[1];
      const resolvedAnchorLink = resolveFullUrl(anchor, relativePath, content);
      if (resolvedAnchorLink) {
        if (!linkMap[resolvedAnchorLink]) {
          linkMap[resolvedAnchorLink] = new Set();
        }
        linkMap[resolvedAnchorLink].add(relativePath);
      }
    });
  });

  // Convert the map into an array of objects.
  const result = Object.keys(linkMap).map(link => ({
    link,
    files: Array.from(linkMap[link])
  }));

  fs.writeFileSync("all_links.json", JSON.stringify(result, null, 2));
  console.log("All links and their file paths saved to all_links.json");
})();
