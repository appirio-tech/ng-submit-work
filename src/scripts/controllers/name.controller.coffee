'use strict'

controller = ($scope, NavService) ->
  vm = this

  $scope.$watch 'nameForm', (nameForm) ->
    NavService.findState('name').form = nameForm if nameForm

  vm.submit = ->
    if $scope.nameForm.$valid
      NavService.findState('name').visited = true

      NavService.setNextState 'name'

  activate = ->
    vm

  activate()

controller.$inject = ['$scope', 'NavService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkNameController', controller

