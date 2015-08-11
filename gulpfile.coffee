configs =
  __dirname : __dirname

configs.templateCache = []

configs.templateCache.push
  files : [
    '.tmp/views/submit-work.directive.html'
  ]
  root  : 'views/'
  module: 'appirio-tech-ng-submit-work'

configs.templateCache.push
  fileName: 'example-templates.js'
  files : [
    '.tmp/views/submit-work.html'
  ]
  root  : 'views/'
  module: 'example'

### END CONFIG ###
loadTasksModule = require __dirname + '/node_modules/appirio-gulp-tasks/load-tasks.coffee'

loadTasksModule.loadTasks configs
