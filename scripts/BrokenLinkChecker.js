import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import pLimit from "p-limit";

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
  "product-c8y-iot": "Cumulocity IoT",
  "c8y-edge-current-version-alt": "10.18",
  "domain-c8y": "cumulocity.com",
  "link-c8y-github": "https://github.com/Cumulocity-IoT",
  "link-sag-portal": "https://empower.softwareag.com/",
  "link-sag-tech-forum": "https://tech.forums.softwareag.com/",
  "link-apamadoc-api": "https://documentation.softwareag.com/pam/10.15.5/en/webhelp/related/ApamaDoc/",
  "link-sag-dev-community": "https://tech.forums.softwareag.com/tag/Cumulocity-IoT",
  "link-apama-webhelp": "https://documentation.softwareag.com/pam/10.15.5/en/webhelp/pam-webhelp/",
  "link-sag-privacy-statement": "https://www.softwareag.com/en_corporate/privacy.html",
  "link-device-portal": "https://ecosystem.cumulocity.com/device-ecosystem/devices/?_gl=1*1uyml12*_gcl_au*MTI2NTExNjU3MS4xNzMzODQzODY0*_ga*NzUyNzgxNzA4LjE3MzM4NDM4NjU.*_ga_B9NM1M9Q48*MTczNDM4NDM3Ni4xNS4xLjE3MzQzODU3NDcuMjMuMC4w&filter_cumulocity_certified=yes&query_type_cumulocity_certified=and",
  "c8y-support-link": "https://cumulocity.atlassian.net/servicedesk/customer/user/login?destination=portals",
  "link-sag-documentation" :"https://documentation.softwareag.com/",
  "link-c8y-training": "https://cumulocity.moodlecloud.com/",
  "c8y-resources-server-link": "https://download.cumulocity.com/",
  "c8y-tech-community-link" : "https://techcommunity.cumulocity.com/",
  "c8y-support-email" : "support@cumulocity.com",
  "email-c8y-info" : "info@cumulocity.com"

};

const resolveHugoShortcode = (link) => {
  return link.replace(/\{\{<\s*(.*?)\s*>\}\}/g, (match, shortcode) => {
    const resolvedValue = shortcodeMapping[shortcode];
    return resolvedValue !== undefined && resolvedValue !== null ? resolvedValue : ""; 
  });
};

const resolveFullUrl = (link) => {
  if (link.startsWith("mailto:") || link.startsWith("tel:")) {
    return null; 
  }

  const resolvedLink = resolveHugoShortcode(link);
  if (resolvedLink.startsWith("http://") || resolvedLink.startsWith("https://")) {
    return resolvedLink;
  }

  return `${BASE_URL.replace(/\/$/, "")}/${resolvedLink.replace(/^\//, "")}`;
};

const checkLink = async (link, mdFile) => {
  const fullUrl = resolveFullUrl(link);
  if (!fullUrl) {
    return null; 
  }

  try {
    let response = await fetch(fullUrl, { method: "HEAD" });
    if (response.status === 405) {
      response = await fetch(fullUrl, { method: "GET" });
    }

    if (!response.ok) {
      return { url: fullUrl, file: mdFile, status: response.status };
    }
  } catch (error) {
    return { url: fullUrl, file: mdFile, status: "Error" };
  }

  return null;
};

(async () => {
  const projectDir = ".././content"; 
  const markdownFiles = getMarkdownFiles(projectDir);

  const brokenLinks = [];
  const limit = pLimit(10); 
  

  const tasks = markdownFiles.map((mdFile) => {
    const content = fs.readFileSync(mdFile, "utf8");
  const links = [...content.matchAll(/(?<!\!)\[.*?\]\((.+?)\)/g)].map((match) => match[1]);



    return links.map((link) =>
      limit(async () => {
        const result = await checkLink(link, mdFile);
        if (result) brokenLinks.push(result);
      })
    );
  });

  await Promise.all(tasks.flat());

  const csvData =
    "URL,File Path,Status Code\n" +
    brokenLinks.map((link) => `${link.url},${link.file},${link.status}`).join("\n");

  fs.writeFileSync("broken_links_markdown.csv", csvData);
  console.log("Broken links in markdown files saved to broken_links_markdown.csv");
  process.exit(0);
})();
