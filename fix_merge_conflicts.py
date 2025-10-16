#!/usr/bin/env python3
"""
Fix merge conflicts in ai-library markdown files.
This script resolves conflicts by keeping the main branch version.
"""

import os
import subprocess
import sys

def find_files_with_conflicts(base_dir):
    """Find all files with merge conflict markers."""
    try:
        result = subprocess.run(
            ['grep', '-r', '<<<<<<< HEAD', base_dir, '--files-with-matches'],
            capture_output=True,
            text=True,
            check=False
        )
        if result.returncode == 0:
            return [f.strip() for f in result.stdout.strip().split('\n') if f.strip()]
        return []
    except Exception as e:
        print(f"Error finding files: {e}")
        return []

def fix_merge_conflict(file_path):
    """Fix merge conflicts in a single file by keeping the main branch version."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()

        fixed_lines = []
        in_conflict = False
        in_main_section = False

        for line in lines:
            if line.startswith('<<<<<<< HEAD'):
                in_conflict = True
                in_main_section = False
                continue
            elif line.startswith('=======') and in_conflict:
                in_main_section = True
                continue
            elif line.startswith('>>>>>>> main') and in_conflict:
                in_conflict = False
                in_main_section = False
                continue

            # Keep lines that are not in the HEAD section
            if in_conflict and not in_main_section:
                continue

            fixed_lines.append(line)

        # Write the fixed content back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(fixed_lines)

        return True
    except Exception as e:
        print(f"  ❌ Error fixing {file_path}: {e}")
        return False

def main():
    base_dir = 'docs/ai-library'

    print("🔍 Finding files with merge conflicts...")
    files = find_files_with_conflicts(base_dir)

    if not files:
        print("✅ No merge conflicts found!")
        return 0

    print(f"📝 Found {len(files)} files with merge conflicts\n")

    fixed = 0
    failed = 0

    for file_path in files:
        print(f"Fixing: {file_path}")
        if fix_merge_conflict(file_path):
            fixed += 1
            print("  ✅ Fixed\n")
        else:
            failed += 1

    print(f"\n🎉 Fixed {fixed} files!")
    if failed > 0:
        print(f"⚠️  Failed to fix {failed} files")

    print("\nNext steps:")
    print("1. Review the changes: git diff")
    print("2. Commit the changes: git add . && git commit -m 'fix: Resolve merge conflicts in ai-library'")
    print("3. Push to remote: git push")

    return 0 if failed == 0 else 1

if __name__ == '__main__':
    sys.exit(main())
