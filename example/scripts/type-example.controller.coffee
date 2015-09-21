'use strict'

TypeController = ->
  vm = this

  activate = ->
    vm.appName = 'Big Boss App'

    vm

  activate()

angular.module('appirio-tech-ng-work-layout').controller 'TypeController', TypeController
