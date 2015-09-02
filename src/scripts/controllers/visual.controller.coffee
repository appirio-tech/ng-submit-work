'use strict'

SubmitWorkVisualController = ($scope, SubmitWorkAPIService) ->
  vm      = this

  activate = ->
    vm

  activate()

SubmitWorkVisualController.$inject = ['$scope', 'SubmitWorkAPIService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkVisualController', SubmitWorkVisualController