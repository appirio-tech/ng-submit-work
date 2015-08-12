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

configs.ngConstants =
  constants:
    apiUrl                  : 'http://api.topcoder.com/v3/' # slash is grandfathered in, need to remove
    API_URL                 : 'http://api.topcoder.com/v3'
    API_URL_V2              : 'https://api.topcoder.com/v2'
    AVATAR_URL              : 'http://www.topcoder.com'

### END CONFIG ###
loadTasksModule = require __dirname + '/node_modules/appirio-gulp-tasks/load-tasks.coffee'

loadTasksModule.loadTasks configs
