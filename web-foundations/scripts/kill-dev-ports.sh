#!/bin/bash
set -euo pipefail

# Free this project's Jekyll ports before restart.
LIVERELOAD_PORT="${LIVERELOAD_PORT:-35729}"
SERVER_PORT="${PORT:-4000}"

for port in "$LIVERELOAD_PORT" "$SERVER_PORT"; do
	pids=$(lsof -t -i:"$port" 2>/dev/null || true)
	if [ -n "$pids" ]; then
		echo "[kill-dev-ports] freeing port $port (pids: $pids)"
		kill -9 $pids 2>/dev/null || true
	fi
done
