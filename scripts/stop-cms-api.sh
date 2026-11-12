#!/usr/bin/env bash
set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PID_FILE="$ROOT_DIR/.cms-api.pid"

if [[ ! -f "$PID_FILE" ]]; then
  echo "PID da CMS API não encontrado."
  exit 0
fi

pid="$(cat "$PID_FILE" 2>/dev/null || true)"

if [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null; then
  kill "$pid"
  echo "CMS API encerrada: PID $pid"
else
  echo "O processo da CMS API já não estava ativo."
fi

rm -f "$PID_FILE"
