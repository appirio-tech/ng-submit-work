'use strict'

SubmitWorkDevelopmentController = ($scope, SubmitWorkAPIService) ->
  vm      = this

  activate = ->
    vm

  activate()

SubmitWorkDevelopmentController.$inject = ['$scope', 'SubmitWorkAPIService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkDevelopmentController', SubmitWorkDevelopmentController