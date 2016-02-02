'use strict'

store = require './store'

ctrl =  ->
  vm       = this
  vm.store = store

  vm

ctrl.$inject = []

angular.module('example').controller 'VisualExampleController', ctrl

