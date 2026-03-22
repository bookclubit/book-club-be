#!/bin/bash
# Stop — typecheck after TS changes

TRACKED_TS=$(git diff HEAD --name-only 2>/dev/null | grep '\.ts$')
UNTRACKED_TS=$(git status --porcelain 2>/dev/null | grep '^\?\?' | awk '{print $2}' | grep '\.ts$')
ALL_TS=$(printf '%s\n%s\n' "$TRACKED_TS" "$UNTRACKED_TS" | grep -v '^$')

if [ -n "$ALL_TS" ]; then
  echo "## Post-turn typecheck"
  bunx tsc --noEmit 2>&1 | tail -30
fi

exit 0
