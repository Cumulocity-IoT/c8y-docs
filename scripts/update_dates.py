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

        # Get file system timestamps
        stat_result = os.stat(filepath)
        mod_time = datetime.datetime.fromtimestamp(stat_result.st_mtime, tz=datetime.timezone.utc)
        
        try:
            # st_birthtime is the true creation time on some systems (like macOS)
            creation_time = datetime.datetime.fromtimestamp(stat_result.st_birthtime, tz=datetime.timezone.utc)
        except AttributeError:
            # Fallback for systems without birthtime (uses last metadata change time)
            creation_time = datetime.datetime.fromtimestamp(stat_result.st_ctime, tz=datetime.timezone.utc)

        creation_time_str = creation_time.isoformat(timespec='seconds').replace('+00:00', 'Z')
        mod_time_str = mod_time.isoformat(timespec='seconds').replace('+00:00', 'Z')

        # 1. Update 'date' field (only if missing)
        if 'date' not in front_matter or front_matter['date'] is None:
            front_matter['date'] = creation_time_str
            modified_front_matter = True
            print(f"  SETTING 'date' from file creation time to {creation_time_str}")

        # 2. Update 'lastmod' field (always, if different from file mod time)
        if 'lastmod' not in front_matter or str(front_matter.get('lastmod')) != mod_time_str:
            front_matter['lastmod'] = mod_time_str
            modified_front_matter = True
            print(f"  UPDATING 'lastmod' from file modification time to {mod_time_str}")

        if not modified_front_matter:
            print(f"  No front matter fields needed update for {filepath}.")
            return

        # Dump the updated front matter back to a string, preserving formatting
        string_stream = StringIO()
        yaml.dump(front_matter, string_stream)
        updated_front_matter_str = string_stream.getvalue()

        new_content = f"---\n{updated_front_matter_str}---\n{body}"

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
        try:
            import ruamel.yaml
        except ImportError:
            print("Error: The 'ruamel.yaml' package is required. Please install it:", file=sys.stderr)
            print("pip install ruamel.yaml", file=sys.stderr)
            sys.exit(1)
            
        for filepath_arg in sys.argv[1:]:
            if os.path.exists(filepath_arg) and (filepath_arg.endswith(('.md', '.markdown'))):
                update_front_matter(filepath_arg)
            else:
                print(f"Skipping invalid or non-markdown path: {filepath_arg}", file=sys.stderr)
    else:
        print("Usage: python update_dates.py <file1.md> [file2.md ...]", file=sys.stderr)
        sys.exit(1)
