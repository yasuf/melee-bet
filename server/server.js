const chalk = require('chalk');
const app = require('./app');

app.set('port', 8080);
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'))
});
