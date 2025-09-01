import sys
import os
import datetime
import re
from io import StringIO
import ruamel.yaml

def update_front_matter(filepath):
    """
    Updates the 'date' (if missing) and 'lastmod' (always) fields in
    the front matter of a given markdown file, preserving formatting.
    """
    print(f"--- Processing: {filepath} ---")
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            original_content = f.read()

        # Regex to find front matter (handles optional spaces around '---' and optional newline at the end)
        front_matter_match = re.match(r'^---\s*\n(.*?)\n^---\s*(.*)', original_content, re.DOTALL | re.MULTILINE)

        if not front_matter_match:
            print(f"  Skipping {filepath}: No YAML front matter found.", file=sys.stderr)
            return

        front_matter_str = front_matter_match.group(1)
        body = front_matter_match.group(2)

        yaml = ruamel.yaml.YAML()
        try:
            front_matter = yaml.load(front_matter_str)
            if front_matter is None:
                front_matter = {}
            
            if not isinstance(front_matter, dict):
                print(f"  Skipping {filepath}: Front matter is not a valid YAML dictionary.", file=sys.stderr)
                return
        except ruamel.yaml.YAMLError as ye:
            print(f"  Skipping {filepath}: YAML parsing error: {ye}", file=sys.stderr)
            return

        modified_front_matter = False

        current_utc_time = datetime.datetime.now(datetime.timezone.utc).isoformat(timespec='seconds').replace('+00:00', 'Z')

        if 'date' not in front_matter or front_matter['date'] is None:
            front_matter['date'] = current_utc_time
            modified_front_matter = True
            print(f"  SETTING 'date' for {filepath} to {front_matter['date']}")

        if 'lastmod' not in front_matter or front_matter['lastmod'] is None:
            front_matter['lastmod'] = current_utc_time
            modified_front_matter = True
            print(f"  SETTING 'lastmod' for {filepath} to {front_matter['lastmod']}")
        elif str(front_matter.get('lastmod')) != current_utc_time:
            front_matter['lastmod'] = current_utc_time
            modified_front_matter = True
            print(f"  UPDATING 'lastmod' for {filepath} to {front_matter['lastmod']}")

        if not modified_front_matter:
            print(f"  No front matter fields needed update for {filepath}.")
            return

        # Dump the updated front matter back to a string, preserving formatting
        string_stream = StringIO()
        yaml.dump(front_matter, string_stream)
        updated_front_matter_str = string_stream.getvalue()

        # Construct the new total content of the file
        new_content = f"---\n{updated_front_matter_str}---{body}"

        if new_content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"  Successfully wrote updated content to {filepath}")
        else:
            print(f"  Content identical after update attempt for {filepath}. Skipping write.")

    except Exception as e:
        print(f"  FATAL Error processing {filepath}: {e}", file=sys.stderr)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        # Check for ruamel.yaml
        try:
            import ruamel.yaml
        except ImportError:
            print("Error: The 'ruamel.yaml' package is required. Please install it:", file=sys.stderr)
            print("venv/bin/pip install ruamel.yaml", file=sys.stderr)
            sys.exit(1)
            
        for filepath_arg in sys.argv[1:]:
            if os.path.exists(filepath_arg) and (filepath_arg.endswith(('.md', '.markdown'))):
                update_front_matter(filepath_arg)
            else:
                print(f"Skipping invalid or non-markdown path: {filepath_arg}", file=sys.stderr)
    else:
        print("Usage: venv/bin/python update_dates.py <file1.md> [file2.md ...]", file=sys.stderr)
        sys.exit(1)
