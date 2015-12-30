'use strict'

TypeController = ->
  vm = this

  activate = ->
    vm.appName = 'Big Boss App'

    vm

  activate()

angular.module('example').controller 'TypeController', TypeController
