import sys
import os
import datetime
import re
import yaml

def update_front_matter(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Regex to find front matter
        front_matter_match = re.match(r'---\s*\n(.*?)\n---\s*\n(.*)', content, re.DOTALL)

        if not front_matter_match:
            print(f"No front matter found in {filepath}", file=sys.stderr)
            return

        front_matter_str = front_matter_match.group(1)
        body = front_matter_match.group(2)

        front_matter = yaml.safe_load(front_matter_str)

        now = datetime.datetime.now().isoformat() + "+00:00" # ISO 8601 with timezone

        # Set creation date if not present
        if 'date' not in front_matter:
            # You might want to get the actual Git creation date here for better accuracy
            # For simplicity, using 'now' for initial creation if 'date' is missing
            front_matter['date'] = now
            print(f"Setting 'date' for {filepath} to {front_matter['date']}")


        # Always update lastmod
        front_matter['lastmod'] = now
        print(f"Updating 'lastmod' for {filepath} to {front_matter['lastmod']}")

        updated_front_matter_str = yaml.dump(front_matter, sort_keys=False, default_flow_style=False, allow_unicode=True)

        new_content = f"---\n{updated_front_matter_str}---\n{body}"

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

    except Exception as e:
        print(f"Error processing {filepath}: {e}", file=sys.stderr)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        for filepath in sys.argv[1:]:
            if filepath.endswith(('.md', '.markdown')): # Only process markdown files
                update_front_matter(filepath)
    else:
        print("Usage: python update_dates.py <file1.md> [file2.md ...]", file=sys.stderr)
