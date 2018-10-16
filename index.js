module.exports.register = (program) => {

  program
      .command('bump yarn PROJECT_NAME', 'bump given version of specified package in meta and child repositories using yarn')
      .command('bump npm PROJECT_NAME', 'bump given version of specified package in meta and child repositories using npm');

}
