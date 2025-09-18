import os
import re
from urllib.parse import urlparse
from collections import defaultdict

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, "..")) 

CONTENT_DIR = os.path.join(PROJECT_ROOT, "content")
OUTPUT_DIR = os.path.join(PROJECT_ROOT, "static")
SITEMAP_XML = os.path.join(PROJECT_ROOT, "public", "sitemap.xml")
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "llms.txt")

os.makedirs(OUTPUT_DIR, exist_ok=True)

FM_BLOCK_RE = re.compile(r"^---\s*\r?\n(.*?)\r?\n---\s*", re.DOTALL | re.MULTILINE)
TITLE_LINE_RE = re.compile(r"^title:\s*(.+?)\s*$", re.MULTILINE)

def read_front_matter_title(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            text = f.read(4000)
        m = FM_BLOCK_RE.match(text)
        if not m:
            return None
        block = m.group(1)
        t = TITLE_LINE_RE.search(block)
        if not t:
            return None
        return t.group(1).strip().strip('"').strip("'")
    except Exception:
        return None

def title_from_slug(slug: str) -> str:
    return slug.replace("-", " ").replace("_", " ").title()

LOC_RE = re.compile(r"<loc>\s*(.*?)\s*</loc>", re.IGNORECASE | re.DOTALL)

def normalize_path(p: str) -> str:
    if not p:
        return ""
    if p.endswith(".html"):
        p = p[:-5]
    if not p.startswith("/"):
        p = "/" + p
    if not p.endswith("/"):
        p = p + "/"
    return p

def is_change_logs(path_lower: str) -> bool:
    return "/change-logs/" in path_lower 

def is_card_page(path: str) -> bool:
    parts = [p for p in path.strip("/").split("/") if p]
    return bool(parts) and parts[-1].endswith("-card")

def is_glossary(path_lower: str) -> bool:
    return "/glossary/" in path_lower or path_lower.endswith("/glossary/")

def load_urls_from_sitemap(sitemap_path):
    try:
        with open(sitemap_path, "r", encoding="utf-8") as f:
            xml = f.read()
    except FileNotFoundError:
        return []

    urls = []
    for loc in LOC_RE.findall(xml):
        loc = loc.strip()
        path = normalize_path(urlparse(loc).path)
        if not path.startswith("/docs/"):
            continue
        low = path.lower()
        if is_change_logs(low):
            continue
        if is_glossary(low):              
            continue
        if is_card_page(path):
            continue
        urls.append((path, loc))
    return urls

def has_real_content(path: str) -> bool:
    for cand in guess_content_paths_for_url_path(path):
        if os.path.isfile(cand):
            return True
    return False

URLS = load_urls_from_sitemap(SITEMAP_XML)

def guess_content_paths_for_url_path(path: str):
    parts = [p for p in path.strip("/").split("/") if p]
    if not parts or parts[0] != "docs":
        return []
    parts = parts[1:]
    if not parts:
        return []
    p1 = os.path.join(CONTENT_DIR, *parts, "index.md")
    p2 = os.path.join(CONTENT_DIR, *parts) + ".md"
    return [p1, p2]

def page_title_for_url_path(path: str):
    for cand in guess_content_paths_for_url_path(path):
        if os.path.isfile(cand):
            t = read_front_matter_title(cand)
            if t:
                return t
    slug = [p for p in path.strip("/").split("/") if p][-1]
    return title_from_slug(slug)

def section_key_for_path(path: str):
    parts = [p for p in path.strip("/").split("/") if p]
    if len(parts) <= 1:
        return ""  
    return parts[1]

def section_title_for_key(key: str):
    if not key:
        return "Root"
    for idx in ("_index.html", "_index.md"):
        candidate = os.path.join(CONTENT_DIR, key, idx)
        if os.path.isfile(candidate):
            t = read_front_matter_title(candidate)
            if t:
                return t
    return title_from_slug(key)

sections = defaultdict(list) 

for path, full_url in URLS:
    if not has_real_content(path):
        continue
    key = section_key_for_path(path)
    title = page_title_for_url_path(path)
    sections[key].append((title, full_url, path))

for key in sections:
    sections[key].sort(key=lambda x: (x[0].lower(), x[2]))

ordered_keys = [""] + sorted(
    [k for k in sections.keys() if k],
    key=lambda k: section_title_for_key(k).lower()
)

with open(OUTPUT_FILE, "w", encoding="utf-8") as out:
    out.write("# Cumulocity Documentation Index\n\n")
    out.write("> Cumulocity IoT’s documentation is a comprehensive resource for developers and users working with the platform.  \n")
    out.write("> It is structured to provide information for various levels of expertise, from beginners to advanced users.\n\n")
    out.write("Key features of the documentation include:\n\n")
    out.write("- User Guides: Step-by-step instructions on how to use the core features of the Cumulocity IoT platform, such as device management, data visualization, and alarm handling.  \n")
    out.write("- Developer’s Guides: Detailed information on APIs, SDKs, and supported programming languages for building applications and integrations.  \n")
    out.write("- API Reference: In-depth details on all available REST APIs, including endpoints, parameters, and example requests and responses.  \n")
    out.write("- Tutorials and Examples: Practical tutorials and code examples to help users get started quickly with tasks like connecting a device or creating a custom widget.  \n")
    out.write("- Release Notes: Updates on new features, improvements, and bug fixes, released regularly with each new version of Cumulocity IoT.\n\n")
    out.write("The below links provide direct access to the available documentation sections:\n\n")
    for key in ordered_keys:
        if key not in sections:
            continue
        header = section_title_for_key(key)
        out.write(f"\n## {header}\n")
        for title, url, _ in sections[key]:
            out.write(f"- [{title}]({url})\n")

print(f"Index generated at {OUTPUT_FILE}")
