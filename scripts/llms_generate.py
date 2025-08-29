import os

CONTENT_DIR = "../content"
OUTPUT_DIR = "../static"
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "llms.txt")

os.makedirs(OUTPUT_DIR, exist_ok=True)

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write("# LLMs Documentation Index\n\n")
    
    for root, dirs, files in os.walk(CONTENT_DIR):
        depth = root.replace(CONTENT_DIR, "").count(os.sep)
        folder_title = os.path.basename(root) or "Root"
        indent = "  " * depth
        f.write(f"\n{indent}## {folder_title}\n")

        for file in sorted(files):
            if file.endswith(".md") and not file.startswith("_"):
                rel_path = os.path.relpath(os.path.join(root, file), start=CONTENT_DIR)
                rel_path = "/" + rel_path.replace("\\", "/")
                name = os.path.splitext(file)[0].replace("-", " ").title()
                f.write(f"{indent}- [{name}]({rel_path})\n")

print(f"Index generated at {OUTPUT_FILE}")
