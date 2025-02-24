import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import pLimit from "p-limit";
import { JSDOM } from "jsdom";

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
    return shortcodeMapping[shortcode] || "";
  });
};

const resolveFullUrl = (link) => {
  if (link.startsWith("mailto:") || link.startsWith("tel:")) return null;

  const resolvedLink = resolveHugoShortcode(link);
  if (resolvedLink.startsWith("http://") || resolvedLink.startsWith("https://")) {
    return resolvedLink;
  }

  return `${BASE_URL.replace(/\/$/, "")}/${resolvedLink.replace(/^\//, "")}`;
};

const hasUnencodedParentheses = (link) => /[()]/.test(link);

const fetchWithRetries = async (url, attempts = 3) => {
  const headers = { "User-Agent": "Mozilla/5.0" }; 

  for (let i = 0; i < attempts; i++) {
    try {
      if (url.includes("github.com") && url.includes("/issues/")) {
        const issueExists = await checkGitHubIssue(url);
        if (issueExists) return null; 
        return { type: "notFound404", url, status: 404 };
      }

      let response = await fetch(url, { method: "HEAD", headers });
      if (response.status === 405) {
        response = await fetch(url, { method: "GET", headers });
      }
      if (response.ok || response.status === 403 || response.status === 500) {
        return null;
      }
      return { type: "notFound404", url, status: response.status };
    } catch (error) {
      if (i === attempts - 1) {
        return null;
      }
    }
  }
  return null;
};


const checkLink = async (link) => {
  if (hasUnencodedParentheses(link)) {
    return { type: "unencodedParentheses", url: link, status: "Invalid Character" };
  }
  return await fetchWithRetries(link);
};

const checkAnchorExists = async (baseUrl, anchorId) => {
  if (!baseUrl.includes("cumulocity.com")) return null;

  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      return { type: "pageNotFound", url: baseUrl, status: response.status };
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const anchorElement = dom.window.document.querySelector(`#${anchorId}`);

    if (!anchorElement) {
      return { type: "missingAnchor", url: `${baseUrl}#${anchorId}`, status: "Anchor Not Found" };
    }
  } catch (error) {
    return null;
  }

  return null;
};

(async () => {
  const projectDir = "../content";
  const markdownFiles = getMarkdownFiles(projectDir);

  const linkFileMap = new Map();
  const uniqueLinks = new Map();
  const issues = [];

  markdownFiles.forEach((mdFile) => {
    const relativePath = path.relative(projectDir, mdFile);
    const content = fs.readFileSync(mdFile, "utf8");
    const links = [...content.matchAll(/(?<!\!)\[.*?\]\((.+?)\)/g)].map((match) => match[1]);

    links.forEach((link) => {
      const resolvedLink = resolveFullUrl(link);
      if (resolvedLink) {
        const [baseUrl, anchorId] = resolvedLink.split("#");
        uniqueLinks.set(baseUrl, anchorId || null);

        if (!linkFileMap.has(resolvedLink)) {
          linkFileMap.set(resolvedLink, new Set());
        }
        linkFileMap.get(resolvedLink).add(relativePath);
      }

      if (hasUnencodedParentheses(link)) {
        issues.push({
          type: "unencodedParentheses",
          url: link,
          status: "Invalid Character",
          files: new Set([relativePath]),
        });
      }
    });
  });

  const limit = pLimit(10);
  const linkResults = new Map();

  await Promise.all([...uniqueLinks.keys()].map((baseUrl) =>
    limit(async () => {
      const result = await checkLink(baseUrl);
      if (result) {
        result.files = linkFileMap.get(baseUrl) ? [...linkFileMap.get(baseUrl)] : [];
        issues.push(result);
      } else {
        linkResults.set(baseUrl, "OK");
      }
    })
  ));

  await Promise.all([...uniqueLinks.entries()].map(([baseUrl, anchorId]) =>
    limit(async () => {
      if (anchorId && baseUrl.includes("cumulocity.com") && linkResults.get(baseUrl) === "OK") {
        const result = await checkAnchorExists(baseUrl, anchorId);
        if (result) {
          result.files = linkFileMap.get(`${baseUrl}#${anchorId}`) ? [...linkFileMap.get(`${baseUrl}#${anchorId}`)] : [];
          issues.push(result);
        }
      }
    })
  ));

  const issueMap = new Map();
  issues.forEach(issue => {
    const issueKey = `${issue.type}|${issue.url}`;
    
    if (!issueMap.has(issueKey)) {
      issueMap.set(issueKey, { ...issue, files: new Set(issue.files) });
    } else {
      issue.files.forEach(file => issueMap.get(issueKey).files.add(file));
    }
  });

  const deduplicatedIssues = [...issueMap.values()].map(issue => ({
  ...issue,
  files: [...issue.files]
  }));

  if (deduplicatedIssues.length > 0) {
    const groupedIssues = deduplicatedIssues.reduce((acc, issue) => {
      if (!acc[issue.type]) {
        acc[issue.type] = [];
      }
      acc[issue.type].push(issue);
      return acc;
    }, {});

    let reportContent = '### :warning: Broken links and missing anchors found!\n\n';

    for (const [type, issueList] of Object.entries(groupedIssues)) {
      reportContent += `#### ${type}\n`;
      issueList.forEach(issue => {
        reportContent += `- ${issue.url} (${issue.status})\n`;
        issue.files.forEach(file => {
          reportContent += `  - ${file}\n`;
        });
      });
      reportContent += '\n';
    }

    fs.writeFileSync("broken_links_report.md", reportContent);
    console.log("Issues saved to broken_links_report.md");
  } else {
    console.log("No broken links or missing anchors found.");
  }
})();
