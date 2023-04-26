#!/bin/bash
version=$(sed -n 's/.*"version": "\(.*\)",/\1/p' dist/syphonx/manifest.json)
last_tag=$(git describe --tags --abbrev=0)
# if version is empty then exit
if [ -z "$version" ]; then
  echo "no build output"
  exit 1
fi
if [ "v$version" = "$last_tag" ]; then
  echo "update version in manifest.json"
  exit 1
fi
pushd dist
zip -r syphonx-"$version".zip syphonx
gh release create "v$version" syphonx-"$version".zip \
    --prerelease \
    --notes-start-tag "$last_tag"
popd
