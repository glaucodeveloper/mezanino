#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

PID_FILE="$ROOT_DIR/.cms-api.pid"
LOG_FILE="$ROOT_DIR/.cms-api.log"
PORT="${CMS_PORT:-8787}"

if curl -fsS "http://127.0.0.1:${PORT}/health" >/dev/null 2>&1; then
  echo "CMS API já está ativa em http://127.0.0.1:${PORT}"
  exit 0
fi

if [[ -f "$PID_FILE" ]]; then
  old_pid="$(cat "$PID_FILE" 2>/dev/null || true)"

  if [[ -n "$old_pid" ]] && kill -0 "$old_pid" 2>/dev/null; then
    kill "$old_pid" 2>/dev/null || true
    sleep 1
  fi

  rm -f "$PID_FILE"
fi

nohup node scripts/cms-api-server.mjs \
  >>"$LOG_FILE" 2>&1 &

pid="$!"
echo "$pid" > "$PID_FILE"

for _ in {1..30}; do
  if curl -fsS "http://127.0.0.1:${PORT}/health" >/dev/null 2>&1; then
    echo "CMS API iniciada."
    echo "PID: $pid"
    echo "URL: http://127.0.0.1:${PORT}"
    echo "Log: $LOG_FILE"
    exit 0
  fi

  if ! kill -0 "$pid" 2>/dev/null; then
    echo "A API encerrou durante a inicialização." >&2
    tail -n 40 "$LOG_FILE" >&2 || true
    exit 1
  fi

  sleep 0.2
done

echo "A API não respondeu no prazo esperado." >&2
tail -n 40 "$LOG_FILE" >&2 || true
exit 1
