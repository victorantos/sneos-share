#!/usr/bin/env python3
"""
Fix multiline :responses attributes in ai-library markdown files.
The Vue parser cannot handle newlines in single-quoted attributes, so we need to
collapse the :responses attribute onto a single line.
"""

import os
import re
import subprocess

def find_md_files(base_dir):
    """Find all markdown files in the ai-library."""
    md_files = []
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith('.md'):
                md_files.append(os.path.join(root, file))
    return md_files

def fix_multiline_responses(file_path):
    """Fix multiline :responses attribute in a single file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if file has a :responses attribute
        if ':responses=' not in content:
            return False, "No :responses attribute found"

        # Pattern to match :responses attribute that spans multiple lines
        # It should start with :responses=' and end with }' followed by published-date or />
        pattern = r"(:responses=')\{[\s\n]+(.*?)[\s\n]+\}'(\s+published-date=)"

        def collapse_responses(match):
            """Collapse the responses onto a single line."""
            prefix = match.group(1)  # :responses='
            content = match.group(2)   # The JSON content
            suffix = match.group(3)    # published-date=

            # Remove newlines and extra spaces from the content, but preserve the JSON structure
            # Replace all newlines and multiple spaces with single space
            collapsed = re.sub(r'\s*\n\s*', ' ', content)
            collapsed = re.sub(r'\s+', ' ', collapsed)

            return f"{prefix}{{{collapsed}}}' {suffix}"

        # Apply the fix
        fixed_content = re.sub(pattern, collapse_responses, content, flags=re.DOTALL)

        # Check if anything changed
        if fixed_content == content:
            return False, "No changes needed"

        # Write the fixed content back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(fixed_content)

        return True, "Fixed"

    except Exception as e:
        return False, f"Error: {e}"

def main():
    base_dir = 'docs/ai-library'

    print("🔍 Finding markdown files...")
    files = find_md_files(base_dir)
    print(f"📝 Found {len(files)} markdown files\n")

    fixed = 0
    skipped = 0
    failed = 0

    for file_path in files:
        success, message = fix_multiline_responses(file_path)
        if success:
            fixed += 1
            print(f"✅ {file_path}: {message}")
        elif "Error" in message:
            failed += 1
            print(f"❌ {file_path}: {message}")
        else:
            skipped += 1
            # Don't print skipped files to reduce noise

    print(f"\n🎉 Summary:")
    print(f"   Fixed: {fixed}")
    print(f"   Skipped: {skipped}")
    print(f"   Failed: {failed}")

    if fixed > 0:
        print("\nNext steps:")
        print("1. Review the changes: git diff | head -100")
        print("2. Commit the changes: git add . && git commit -m 'fix: Collapse :responses attributes onto single line'")
        print("3. Push to remote: git push")

    return 0 if failed == 0 else 1

if __name__ == '__main__':
    import sys
    sys.exit(main())
