#!/usr/bin/env bash

set -e

# Get new tags from remote
git fetch --tags
# Get latest tag name
latestTag=$(git describe --abbrev=0 --tags)
# remove 'v' from latestTag
latestTag=${latestTag#"v"}

echo "Enter release version (latest is $latestTag): "
read VERSION

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "Releasing $VERSION ..."

    # commit
  npm version $VERSION --message "[release] $VERSION"

    # publish
    git push origin refs/tags/v$VERSION
    git push
    npm publish
fi
