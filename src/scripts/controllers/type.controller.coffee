'use strict'

controller = ($scope, NavService) ->
  vm = this

  vm.setType = (e, type) ->
    e.target.focus()

    $scope.requestType = type

  vm.submit = ->
    if $scope.typeForm.$valid
      $scope.save()

      NavService.setNextState 'type'

  activate = ->
    $scope.$watch 'typeForm', (typeForm) ->
      NavService.findState('type').form = typeForm if typeForm

    vm

  activate()

controller.$inject = ['$scope', 'NavService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkTypeController', controller


