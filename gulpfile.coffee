configs =
  __dirname : __dirname

configs.templateCache = []

configs.templateCache.push
  files : [
    '.tmp/views/nav.html'
    '.tmp/views/submit-work-type.directive.html'
    '.tmp/views/submit-work-features.directive.html'
    '.tmp/views/submit-work-visuals.directive.html'
    '.tmp/views/submit-work-development.directive.html'
    '.tmp/views/submit-work-complete.directive.html'
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
