'use strict'

SubmitWorkController = ($scope) ->
  vm = this

  activate = ->
    vm

  activate()

SubmitWorkController.$inject = ['$scope']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkController', SubmitWorkController

