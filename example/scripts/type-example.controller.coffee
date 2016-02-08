'use strict'

TypeController = ->
  vm = this
  vm.permissions = []

  activate = ->
    vm.appName = 'Big Boss App'

    vm

  activate()

angular.module('example').controller 'TypeController', TypeController
