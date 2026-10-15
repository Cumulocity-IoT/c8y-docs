#!/usr/bin/env python3
"""Check the API references of skills against the published OpenAPI specifications.

For each skill (content/skills/*.md, or the files given as arguments) this checks:
- every `api` front matter entry: its API is listed in data/apis.json, its operation
  exists in that API's specification, and `method` and `path` match the specification;
  a `title` that differs from the operation summary is a warning
- every link in the body to <API URL>#operation/<operationId>: the operation exists in
  the specification of the linked API and is listed in `api`
- every `api` entry is linked in the body (warning otherwise)

The specifications are downloaded from the `spec` URLs in data/apis.json. Only the Python
standard library is used: JSON specifications are parsed as JSON, YAML specifications with
a line-based reader for the `paths` section.

Usage: python3 scripts/check_skill_api_refs.py [content/skills/<name>.md ...]
Exit status: 1 if there are errors, otherwise 0.
"""

import glob
import json
import os
import re
import sys
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
METHODS = ("get", "put", "post", "delete", "patch", "head", "options")


def read_front_matter(text):
    """Returns the front matter lines and the body of a Markdown file."""
    lines = text.split("\n")
    if lines[0].strip() != "---":
        return [], text
    end = lines.index("---", 1)
    return lines[1:end], "\n".join(lines[end + 1:])


def unquote(value):
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in "'\"":
        return value[1:-1]
    return value


def read_api_entries(front_matter):
    """Returns the entries of the `api` list, with their line numbers (1-based, in the file)."""
    entries, current, inside = [], None, False
    for index, line in enumerate(front_matter):
        if re.match(r"^api:\s*$", line):
            inside = True
            continue
        if inside and line and not line[0].isspace():
            break
        if not inside or not line.strip():
            continue
        item = re.match(r"^\s*-\s+(\w+):\s*(.*)$", line)
        field = re.match(r"^\s+(\w+):\s*(.*)$", line)
        if item:
            current = {"line": index + 2, item.group(1): unquote(item.group(2))}
            entries.append(current)
        elif field and current is not None:
            current[field.group(1)] = unquote(field.group(2))
    return entries


def parse_yaml_paths(text):
    """Returns {operationId: {method, path, summary}} from the paths section of a YAML spec."""
    operations, path, block = {}, None, None

    def flush():
        if block and block.get("operationId"):
            operations[block["operationId"]] = block

    for line in text.split("\n"):
        top = re.match(r"^\S", line)
        path_line = re.match(r"^  (['\"]?)(/[^'\"]*)\1:\s*$", line)
        method_line = re.match(r"^    (" + "|".join(METHODS) + r"):\s*$", line)
        if top or path_line:
            flush()
            block = None
            path = path_line.group(2) if path_line else None
        elif method_line and path:
            flush()
            block = {"method": method_line.group(1).upper(), "path": path, "summary": ""}
        elif block is not None:
            operation = re.match(r"^      operationId:\s*(\S+)\s*$", line)
            summary = re.match(r"^      summary:\s*(.+?)\s*$", line)
            if operation:
                block["operationId"] = unquote(operation.group(1))
            elif summary:
                block["summary"] = unquote(summary.group(1))
    flush()
    return operations


def parse_json_paths(text):
    operations = {}
    for path, item in json.loads(text).get("paths", {}).items():
        for method, operation in item.items():
            if method in METHODS and isinstance(operation, dict) and operation.get("operationId"):
                operations[operation["operationId"]] = {
                    "method": method.upper(), "path": path, "summary": operation.get("summary", "")}
    return operations


_specs = {}


def operations_of(key, api):
    """Downloads and indexes the specification of an API once."""
    if key not in _specs:
        with urllib.request.urlopen(api["spec"], timeout=60) as response:
            text = response.read().decode("utf-8")
        _specs[key] = parse_json_paths(text) if api["spec"].endswith(".json") else parse_yaml_paths(text)
        if not _specs[key]:
            sys.exit(f"No operations found in {api['spec']}")
    return _specs[key]


def check(file, apis, report):
    text = open(file, encoding="utf-8").read()
    relative = os.path.relpath(os.path.abspath(file), ROOT)
    file = file if relative.startswith("..") else relative
    front_matter, body = read_front_matter(text)
    body_offset = len(front_matter) + 2
    listed = set()

    for entry in read_api_entries(front_matter):
        where = f"{file}:{entry['line']}"
        key = entry.get("spec", "core")
        operation = entry.get("operation")
        missing = [field for field in ("operation", "method", "path", "title") if not entry.get(field)]
        if missing:
            report("ERROR", where, f"api entry without {', '.join(missing)}")
        if key not in apis:
            report("ERROR", where, f"API {key!r} is not listed in data/apis.json")
            continue
        if not operation:
            continue
        listed.add((key, operation))
        spec = operations_of(key, apis[key]).get(operation)
        if not spec:
            report("ERROR", where, f"operation {operation!r} does not exist in the {apis[key]['title']} specification")
            continue
        if entry.get("method", "").upper() != spec["method"]:
            report("ERROR", where, f"{operation}: method {entry.get('method')!r}, specification {spec['method']!r}")
        if entry.get("path") != spec["path"]:
            report("ERROR", where, f"{operation}: path {entry.get('path')!r}, specification {spec['path']!r}")
        if entry.get("title") and entry["title"] != spec["summary"]:
            report("WARN", where, f"{operation}: title {entry['title']!r}, summary {spec['summary']!r}")

    linked = set()
    url_to_key = {api["url"].split("://", 1)[1]: key for key, api in apis.items()}
    for number, line in enumerate(body.split("\n"), start=body_offset):
        for host_path, operation in re.findall(
                r"https://(?:\{\{<\s*domain-c8y\s*>\}\}|cumulocity\.com)(/api/[^#)\s]*)#operation/([A-Za-z0-9_]+)", line):
            key = url_to_key.get("cumulocity.com" + host_path)
            where = f"{file}:{number}"
            if key is None:
                report("ERROR", where, f"link to {host_path}#operation/{operation}: API not listed in data/apis.json")
                continue
            linked.add((key, operation))
            if operation not in operations_of(key, apis[key]):
                report("ERROR", where, f"link to operation {operation!r}, which does not exist in the {apis[key]['title']} specification")
            elif (key, operation) not in listed:
                report("ERROR", where, f"link to operation {operation!r}, which is not listed in the api front matter")

    for key, operation in sorted(listed - linked):
        report("WARN", file, f"api entry {operation!r} is not linked in the body")


def main():
    apis = json.load(open(os.path.join(ROOT, "data", "apis.json"), encoding="utf-8"))
    files = sys.argv[1:] or sorted(
        f for f in glob.glob(os.path.join(ROOT, "content", "skills", "*.md")) if not f.endswith("_index.md"))
    counts = {"ERROR": 0, "WARN": 0}

    def report(level, where, message):
        counts[level] += 1
        print(f"{level} {where}: {message}")

    for file in files:
        check(file, apis, report)
    print(f"Checked {len(files)} skill(s): {counts['ERROR']} error(s), {counts['WARN']} warning(s)")
    return 1 if counts["ERROR"] else 0


if __name__ == "__main__":
    sys.exit(main())
