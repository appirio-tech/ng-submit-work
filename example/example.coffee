require 'appirio-tech-api-schemas'
require '../src/src'
require './styles/main.scss'
require './scripts/example.module'
require './scripts/feature-list.example'
require './scripts/routes'
require './scripts/type-example.controller'
require './scripts/features.example.controller'
require './scripts/development.example.controller'
require './scripts/visual.example.controller'

exampleNav = require './nav.jade'

document.getElementById('example-nav').innerHTML = exampleNav()

views = require.context './views/', true, /^(.*\.(jade$))[^.]*$/igm
viewPaths = views.keys()

templateCache = ($templateCache) ->
  for viewPath in viewPaths
    viewPathClean = viewPath.split('./').pop()

    # TODD: bug if .jade occurs more often than once
    viewPathCleanHtml = viewPathClean.replace '.jade', '.html'

    $templateCache.put "views/#{viewPathCleanHtml}", views(viewPath)()

templateCache.$nject = ['$templateCache']

angular.module('example').run templateCache