#!/usr/bin/env bash
# Run the project's Express entry point with this UI as its public directory.
set -euo pipefail
ui_dir=$(cd "$(dirname "$0")" && pwd)
project_dir=$(dirname "$ui_dir")
stage=$(mktemp -d)
trap 'rm -rf -- "$stage"' EXIT
mkdir "$stage/src" "$stage/public"
ln -s "$project_dir/node_modules" "$stage/node_modules"
for entry in "$project_dir"/src/*; do
  ln -s "$entry" "$stage/src/"
done
for entry in "$project_dir"/public/*; do
  [[ $(basename "$entry") == index.html || $(basename "$entry") == jt ]] || ln -s "$entry" "$stage/public/"
done
ln -s "$ui_dir/index.html" "$ui_dir/jt" "$stage/public/"
cd "$project_dir"
node --preserve-symlinks-main "$stage/src/app.js"
