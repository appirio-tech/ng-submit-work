'use strict'

store = require './store'

ctrl =  ->
  vm       = this
  vm.store = store

  vm

ctrl.$inject = []

angular.module('example').controller 'FeaturesExampleController', ctrl

