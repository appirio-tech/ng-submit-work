'use strict'

SubmitWorkCompleteController = ($scope) ->
  vm = this

  activate = ->
    vm

  activate()

SubmitWorkCompleteController.$inject = ['$scope']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkCompleteController', SubmitWorkCompleteController