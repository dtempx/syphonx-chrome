#!/bin/bash

version=$(sed -n 's/.*"version": "\(.*\)",/\1/p' dist/syphonx/manifest.json)
last_tag=$(git describe --tags --abbrev=0)

echo "Current version is v$version"
echo "Last release version is $last_tag"

# exit if version is empty
if [ -z "$version" ]; then
  echo "No build output found."
  exit 1
fi

# exit if version is not updated
if [ "v$version" = "$last_tag" ] && [ "$1" != "-f" ]; then
  echo "Update version in manifest.json. Use -f to bypass this check."
  exit 1
fi

# exit if there are uncommitted changes
git_status=$(git status --porcelain)
if [ -n "$git_status" ] && [ "$1" != "-f" ]; then
    echo "There are uncommitted changes in the repository. Use -f to bypass this check."
    exit 1
fi

pushd dist
zip -r syphonx-"$version".zip syphonx
gh release create "v$version" syphonx-"$version".zip \
    --prerelease \
    --notes-start-tag "$last_tag"
popd
