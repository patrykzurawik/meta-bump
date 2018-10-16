module.exports.register = (program) => {

  program
      .command('bump-yarn', 'bump given version of specified package in meta and child repositories using yarn')
      .command('bump-npm', 'bump given version of specified package in meta and child repositories using npm');

}
