#!/usr/bin/env bash
# Usage:
#   scripts/run.sh <year> <dayNum|dayXX> <py|js|ts> [sample|real]
# Examples:
#   scripts/run.sh 2020 1 py sample
#   scripts/run.sh 2020 day01 js
#   scripts/run.sh 2025 3 ts real

set -euo pipefail

YEAR="${1:?year (e.g., 2020)}"
RAW_DAY="${2:?day number or dayXX (e.g., 1 or day01)}"
LANG="${3:?language: py|js|ts}"
WHICH="${4:-real}"  # sample | real

# --- Resolve repo root: prefer git, fallback to script location ---
if REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null); then
  :
else
  REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
fi

# Normalize day => dayXX
if [[ "$RAW_DAY" =~ ^day[0-9]{2}$ ]]; then
  DAY="$RAW_DAY"
else
  printf -v DAY "day%02d" "$RAW_DAY"
fi

DAY_DIR="$REPO_ROOT/$YEAR/$DAY"
INPUT_DIR="$REPO_ROOT/$YEAR/$DAY"
if [[ "$WHICH" == "sample" ]]; then
  INPUT_FILE="$INPUT_DIR/$DAY.sample.txt"
else
  INPUT_FILE="$INPUT_DIR/$DAY.txt"
fi

# --- Sanity checks ---
[[ -d "$DAY_DIR" ]]    || { echo "Day folder not found: $DAY_DIR" >&2; exit 1; }
[[ -f "$INPUT_FILE" ]] || { echo "Input not found: $INPUT_FILE" >&2; exit 1; }

case "$LANG" in
  py)
    FILE="$DAY_DIR/py/main.py"
    [[ -f "$FILE" ]] || { echo "Python file not found: $FILE" >&2; exit 1; }
    ( cd "$DAY_DIR/py" && python3 "main.py" "$INPUT_FILE" )
    ;;

  js)
    FILE="$DAY_DIR/js/main.js"
    [[ -f "$FILE" ]] || { echo "JS file not found: $FILE" >&2; exit 1; }
    ( cd "$DAY_DIR/js" && node "main.js" "$INPUT_FILE" )
    ;;

  ts)
    FILE="$DAY_DIR/ts/main.ts"
    [[ -f "$FILE" ]] || { echo "TS file not found: $FILE" >&2; exit 1; }
    ( cd "$DAY_DIR/ts" && npx tsx "main.ts" "$INPUT_FILE" )
    ;;

  *)
    echo "Unknown language: $LANG (use py|js|ts)" >&2
    exit 1
    ;;
esac

