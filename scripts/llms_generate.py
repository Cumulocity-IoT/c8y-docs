import os
import re

CONTENT_DIR = "../content"
OUTPUT_DIR = "../static"
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "llms.txt")

os.makedirs(OUTPUT_DIR, exist_ok=True)

FM_BLOCK_RE = re.compile(r"^---\s*\n(.*?)\n---\s*", re.DOTALL | re.MULTILINE)
TITLE_LINE_RE = re.compile(r"^title:\s*(.+?)\s*$", re.MULTILINE)

def extract_frontmatter_title(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            text = f.read(4000)
        m = FM_BLOCK_RE.match(text)
        if m:
            block = m.group(1)
            t = TITLE_LINE_RE.search(block)
            if t:
                return t.group(1).strip().strip('"').strip("'")
    except Exception:
        pass
    return None

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write("# LLMs Documentation Index\n\n")
    
    for root, dirs, files in os.walk(CONTENT_DIR):
        depth = root.replace(CONTENT_DIR, "").count(os.sep)

        if depth == 0:
            continue

        folder_title = os.path.basename(root) or "Root"

        if folder_title == "change-logs":
            dirs[:] = []  
            continue

        indent = "  " * depth

        section_title = folder_title.replace("-", " ").title()
        for idx in ("_index.html"):
            idx_path = os.path.join(root, idx)
            if os.path.isfile(idx_path):
                t = extract_frontmatter_title(idx_path)
                if t:
                    section_title = t
                    break

        f.write(f"\n{indent}## {section_title}\n")

        for file in sorted(files):
            if file.endswith(".md") and not file.startswith("_"):
                md_path = os.path.join(root, file)

                norm_path = md_path.replace("\\", "/")
                if "/change-logs/" in norm_path:
                    continue

                rel_path = "/" + os.path.relpath(md_path, start=CONTENT_DIR).replace("\\", "/")

                title = extract_frontmatter_title(md_path)
                if not title:
                    title = os.path.splitext(file)[0].replace("-", " ").title()

                f.write(f"{indent}- [{title}]({rel_path})\n")

print(f"Index generated at {OUTPUT_FILE}")