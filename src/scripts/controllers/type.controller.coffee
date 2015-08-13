'use strict'

controller = ($scope, NavService) ->
  vm = this

  vm.setType = (e, type) ->
    e.target.focus()

    $scope.requestType = type

  vm.submit = ->
    NavService.setNextState 'type' if $scope.typeForm.$valid

  activate = ->
    $scope.$watch 'typeForm', (typeForm) ->
      NavService.findState('type').form = typeForm if typeForm

    vm

  activate()

controller.$inject = ['$scope', 'NavService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkTypeController', controller


