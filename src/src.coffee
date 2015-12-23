require.context './styles/', true, /^(.*\.(scss$))[^.]*$/igm

require 'appirio-tech-ng-ui-components'
require 'appirio-tech-ng-file-upload'
require './scripts/submit-work.module'

requireContextFiles = (files) ->
  paths = files.keys()

  for path in paths
    files path

directives  = require.context './scripts/directives/', true, /^(.*\.(coffee$))[^.]*$/igm
controllers = require.context './scripts/controllers/', true, /^(.*\.(coffee$))[^.]*$/igm
views       = require.context './views/', true, /^(.*\.(jade$))[^.]*$/igm

requireContextFiles directives
requireContextFiles controllers

viewPaths = views.keys()

templateCache = ($templateCache) ->
  for viewPath in viewPaths
    viewPathClean = viewPath.split('./').pop()

    # TODD: bug if .jade occurs more often than once
    viewPathCleanHtml = viewPathClean.replace '.jade', '.html'

    $templateCache.put "views/#{viewPathCleanHtml}", views(viewPath)()

templateCache.$nject = ['$templateCache']

angular.module('appirio-tech-submit-work').run templateCache