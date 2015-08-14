'use strict'

controller = ($scope, NavService) ->
  vm = this

  activate = ->
    vm

  activate()

controller.$inject = ['$scope', 'NavService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkNavController', controller


