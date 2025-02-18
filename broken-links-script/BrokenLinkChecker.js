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

const hasUnencodedParentheses = (link) => {
  return /[()]/.test(link);
};

const checkLink = async (link) => {
  try {
    const baseUrl = link.split("#")[0];
    let response = await fetch(baseUrl, { method: "HEAD" });
    if (response.status === 405) {
      response = await fetch(baseUrl, { method: "GET" });
    }
    if (!response.ok && response.status !== 403 && response.status !== 500) {
      return { type: "notFound404", url: link, status: response.status };
    }
  } catch (error) {
    return { type: "error", url: link, status: "Network Error" };
  }
  return null;
};

(async () => {
  const projectDir = "../content";
  const markdownFiles = getMarkdownFiles(projectDir);

  const linkFileMap = new Map();
  const uniqueLinks = new Set();
  const issues = [];

  markdownFiles.forEach((mdFile) => {
    const relativePath = path.relative(projectDir, mdFile);
    const content = fs.readFileSync(mdFile, "utf8");
    const links = [...content.matchAll(/(?<!\!)\[.*?\]\((.+?)\)/g)].map((match) => match[1]);

    links.forEach((link) => {
      const resolvedLink = resolveFullUrl(link);
      if (resolvedLink) {
        uniqueLinks.add(resolvedLink);
        if (!linkFileMap.has(resolvedLink)) {
          linkFileMap.set(resolvedLink, []);
        }
        linkFileMap.get(resolvedLink).push(relativePath);
      }
      if (hasUnencodedParentheses(link)) {
        issues.push({
          type: "unencodedParentheses",
          url: link,
          status: "Invalid Character",
          files: [relativePath],
        });
      }
    });
  });

  const limit = pLimit(10);

  await Promise.all([...uniqueLinks].map((link) =>
    limit(async () => {
      const result = await checkLink(link);
      if (result) {
        result.files = linkFileMap.get(link).map((file) => file);
        issues.push(result);
      }
    })
  ));

  if (issues.length > 0) {
    let reportContent = "| URL | Issue | Files Location |\n";
    reportContent += "| --- | --- | --- |\n";
    reportContent += issues
      .map((issue) =>
        `| ${issue.url} | ${issue.type} | ${issue.files.join(", ")} |`
      )
      .join("\n");

    fs.writeFileSync("broken_links_report.md", reportContent);
    console.log("Issues saved to broken_links_report.md");
  } else {
    console.log("No broken links found.");
  }
})();