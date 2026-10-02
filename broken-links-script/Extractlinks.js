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

// Shortcodes used inside links are resolved from the theme's own templates,
// so each branch is checked against exactly the URLs it renders (e.g. a
// release branch that pins c8y-current-version to "2026"). Only templates that
// are a single string literal, like {{- "https://..." -}}, can be read this
// way; a template with logic needs an entry in shortcodeOverrides, otherwise
// extraction fails.
const SHORTCODES_DIR = "../themes/c8ydocs/layouts/shortcodes";

const loadLiteralShortcodes = () => {
  const mapping = {};
  for (const file of fs.readdirSync(SHORTCODES_DIR)) {
    if (!file.endsWith(".html")) continue;
    const template = fs.readFileSync(path.join(SHORTCODES_DIR, file), "utf8");
    const literal = template.match(/^\s*\{\{-?\s*"([^"]*)"\s*-?\}\}\s*$/);
    if (literal) {
      mapping[path.basename(file, ".html")] = literal[1];
    }
  }
  return mapping;
};

const literalShortcodes = loadLiteralShortcodes();

// The published URL is Hugo's baseURL plus the release version, which the
// deploy workflow (staging.yml) derives from the branch name: release/y2026 is
// published under /docs/2026, develop under /docs. The branch name isn't
// reliable here (PR runs check out feature branches), so the version is taken
// from c8y-current-version, which each release branch pins to the same value
// and develop leaves empty.
const getBaseUrl = () => {
  const config = fs.readFileSync("../config.toml", "utf8");
  const baseURL = config.match(/^baseURL\s*=\s*"([^"]+)"/m)?.[1];
  if (!baseURL) {
    throw new Error("baseURL not found in ../config.toml");
  }
  const version = literalShortcodes["c8y-current-version"];
  if (version === undefined) {
    throw new Error(`c8y-current-version not found in ${SHORTCODES_DIR}`);
  }
  return [baseURL.replace(/\/+$/, ""), version].filter(Boolean).join("/");
};

const BASE_URL = getBaseUrl();

const shortcodeOverrides = {
  // {{ .Page.Site.BaseURL | lower }}
  "link-c8y-doc-baseurl": `${BASE_URL.toLowerCase()}/`,
};

const shortcodeMapping = { ...literalShortcodes, ...shortcodeOverrides };

// shortcode -> files whose links use it but it couldn't be resolved
const unresolvedShortcodes = new Map();

const hasRenderFalse = (fileContent) => {
  try {
    const { data } = matter(fileContent);
    return data?.build?.render === false || data?._build?.render === false;
  } catch {
    return false;
  }
};

const resolveHugoShortcode = (link, relativePath) => {
  return link.replace(/\{\{<\s*(.*?)\s*>\}\}/g, (match, shortcode) => {
    if (Object.hasOwn(shortcodeMapping, shortcode)) {
      return shortcodeMapping[shortcode];
    }
    if (!unresolvedShortcodes.has(shortcode)) {
      unresolvedShortcodes.set(shortcode, new Set());
    }
    unresolvedShortcodes.get(shortcode).add(relativePath);
    return "";
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

  const resolvedLink = resolveHugoShortcode(link, relativePath);
  if (/^https?:\/\//i.test(resolvedLink)) {
    return resolvedLink;
  }
  // A root-relative link that already names a version ("/2025/edge-kubernetes/...")
  // is an explicit cross-version reference: it must resolve against the
  // unversioned site root, because prefixing this branch's own version too
  // would produce an invalid doubled path like ".../docs/2026/2025/...".
  //
  // Every other root-relative link ("/edge-kubernetes/datahub",
  // "/legal-notices/copyright/") is an ordinary same-version internal link
  // and resolves against BASE_URL, version prefix included. Stripping the
  // prefix for those is what silently pointed release-branch content at the
  // *current* published docs instead of that release's own, which 404s as
  // soon as the release stops being current. Shared pages are mirrored under
  // every version prefix, so keeping the prefix is safe for them too.
  if (resolvedLink.startsWith("/")) {
    const isCrossVersion = /^\/\d{4}(\/|$)/.test(resolvedLink);
    const base = isCrossVersion ? BASE_URL.replace(/\/\d{4}$/, "") : BASE_URL.replace(/\/$/, "");
    return `${base}${resolvedLink}`.replace(/([^:]\/)\/+/g, '$1');
  }
  return `${BASE_URL.replace(/\/$/, "")}/${resolvedLink}`;
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

  // An unresolved shortcode would otherwise silently become "" and the
  // checker would validate a URL the site never renders.
  if (unresolvedShortcodes.size > 0) {
    for (const [shortcode, files] of unresolvedShortcodes) {
      console.error(
        `Error: shortcode "${shortcode}" used in a link could not be resolved. Its template in ` +
        `${SHORTCODES_DIR} is missing or isn't a plain string literal; add it to shortcodeOverrides ` +
        `in Extractlinks.js. Used in: ${Array.from(files).join(", ")}`
      );
    }
    process.exit(1);
  }

  fs.writeFileSync("all_links.json", JSON.stringify(result, null, 2));
  console.log("All links and their file paths saved to all_links.json");
})();
