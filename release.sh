#!/usr/bin/env bash
set -e

npm run transpile

# Get new tags from remote
git fetch --tags
# Get latest tag name
latestTag=$(git rev-list --tags --max-count=1)
[ -n "$latestTag" ] && latestTag=$(git describe --tags $latestTag) && latestTag=${latestTag#"v"} # remove 'v' from latestTag

echo "Enter release version (latest is ${latestTag:-0.0.0}): "
read VERSION

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "Releasing $VERSION ..."

    # commit
    yarn version --new-version $VERSION --message "[release] $VERSION"

    # publish
    git push origin refs/tags/v$VERSION
    git push
fi
