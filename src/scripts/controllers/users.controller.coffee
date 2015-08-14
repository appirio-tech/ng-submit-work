'use strict'

controller = ($scope, NavService) ->
  vm = this

  vm.submit = ->
    if $scope.usersForm.$valid
      $scope.save()

      NavService.setNextState 'users'


  activate = ->
    $scope.$watch 'usersForm', (usersForm) ->
      NavService.findState('users').form = usersForm if usersForm

    vm

  activate()

controller .$inject = ['$scope', 'NavService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkUsersController', controller

