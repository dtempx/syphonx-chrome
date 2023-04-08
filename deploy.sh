#!/bin/bash
version=v$(sed -n 's/.*"version": "\(.*\)",/\1/p' dist/manifest.json)
last_tag=$(git describe --tags --abbrev=0)
if [ "$version" = "$last_tag" ]; then
  echo "manifest.json version not updated"
  exit 1
fi
[ -d "tmp" ] && rm -rf "tmp"
mkdir tmp
pushd tmp
cp -r ../dist syphonx
zip -r syphonx.zip syphonx
gh release create "$version" syphonx.zip \
    --prerelease \
    --notes-start-tag "$last_tag"
popd
