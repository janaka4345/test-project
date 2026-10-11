#!/bin/sh
set -eu

: "${APP_ENV:?APP_ENV must be set}"

json_escape() {
  printf '%s' "$1" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g'
}

printf '{"appEnv":"%s"}\n' "$(json_escape "$APP_ENV")" > /usr/share/nginx/html/config.json
