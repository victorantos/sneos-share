#!/bin/bash

# Fix merge conflicts in ai-library markdown files
# This script resolves merge conflicts by keeping the main branch version

echo "🔍 Finding files with merge conflicts..."
FILES=$(grep -r "<<<<<<< HEAD" docs/ai-library --files-with-matches 2>/dev/null)

if [ -z "$FILES" ]; then
    echo "✅ No merge conflicts found!"
    exit 0
fi

COUNT=$(echo "$FILES" | wc -l | tr -d ' ')
echo "📝 Found $COUNT files with merge conflicts"
echo ""

FIXED=0
for FILE in $FILES; do
    echo "Fixing: $FILE"

    # Use sed to remove merge conflict markers and keep only the main branch version
    # This removes:
    # - Lines with <<<<<<< HEAD
    # - Everything between <<<<<<< HEAD and =======
    # - The ======= line
    # - The >>>>>>> main line
    # Keeping only the content between ======= and >>>>>>> main

    # Create a temporary file
    TMPFILE="${FILE}.tmp"

    # Process the file using awk to handle merge conflicts
    awk '
        BEGIN { in_conflict = 0; in_main = 0 }
        /^<<<<<<< HEAD/ { in_conflict = 1; next }
        /^=======/ && in_conflict { in_main = 1; next }
        /^>>>>>>> main/ && in_conflict { in_conflict = 0; in_main = 0; next }
        in_conflict && !in_main { next }
        { print }
    ' "$FILE" > "$TMPFILE"

    # Replace original file with fixed version
    mv "$TMPFILE" "$FILE"

    ((FIXED++))
    echo "  ✅ Fixed"
    echo ""
done

echo "🎉 Fixed $FIXED files!"
echo ""
echo "Next steps:"
echo "1. Review the changes: git diff"
echo "2. Test the build locally: npm run build"
echo "3. Commit the changes: git add . && git commit -m 'fix: Resolve merge conflicts in ai-library'"
echo "4. Push to remote: git push"
