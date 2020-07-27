const GitUrlParse = require('git-url-parse');

/**
 * There are various protocol to connect to Git (see https://git-scm.com/book/en/v2/Git-on-the-Server-The-Protocols)
 * This method will look for if there is protocol attach, if not, it will use default git+ssh
 * @param  {String} url Git repository URL
 * @return {String}     The original url, if it has protocol already, or the url with the default (git+ssh) protocol attached
 */
const getSourceUrlWithProtocol = url => {
  const parsedUrl = new GitUrlParse(url);
  if (parsedUrl.protocols && parsedUrl.protocols.length > 0) {
    return url;
  }

  return `git+ssh://${url}`;
}

module.exports = (packages) => {

  var results = [];

  for (let i = 0; i < packages.length; i++) {

    let parent = packages[i];

    for (let j = 0; j < packages.length; j++) {

      if (i === j) continue;

      let dependency = packages[j];

      if (parent.dependencies && Object.keys(parent.dependencies).indexOf(dependency.name) > -1) {
        results.push({
          source: dependency.name,
          sourceUrlWithProtocol: getSourceUrlWithProtocol(dependency.metaSourceClone),
          sourceFolder: dependency.folder,
          target: parent.name,
          targetFolder: parent.folder,
        });
      }

      if (parent.devDependencies && Object.keys(parent.devDependencies).indexOf(dependency.name) > -1) {
        results.push({
          source: dependency.name,
          sourceUrlWithProtocol: getSourceUrlWithProtocol(dependency.metaSourceClone),
          sourceFolder: dependency.folder,
          target: parent.name,
          targetFolder: parent.folder,
        });
      }

    }

  }

  return results;

};
