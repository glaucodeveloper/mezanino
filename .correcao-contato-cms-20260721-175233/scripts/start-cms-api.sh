#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$ROOT/.env.cms"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Arquivo ausente: $ENV_FILE" >&2
  echo "Execute: cp '$ROOT/.env.cms.example' '$ROOT/.env.cms'" >&2
  exit 1
fi

set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

exec node "$ROOT/scripts/cms-api-server.mjs"
