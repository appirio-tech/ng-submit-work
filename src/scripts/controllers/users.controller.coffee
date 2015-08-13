'use strict'

controller = ($scope, NavService) ->
  vm = this

  vm.submit = ->
    NavService.setNextState 'users' if $scope.usersForm.$valid

  activate = ->
    $scope.$watch 'usersForm', (usersForm) ->
      NavService.findState('users').form = usersForm if usersForm

    vm

  activate()

controller .$inject = ['$scope', 'NavService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkUsersController', controller

