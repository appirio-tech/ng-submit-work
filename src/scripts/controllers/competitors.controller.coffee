'use strict'

controller = ($scope, NavService) ->
  vm         = this
  vm.appName = ''

  vm.add = ->
    appName     = vm.appName.trim()
    isBlank     = appName.length == 0
    isDuplicate = $scope.competitorApps.indexOf(appName) > -1

    if !isBlank && !isDuplicate
      $scope.competitorApps.push appName

      vm.appName     = ''
      vm.placeholder = ' '

  vm.submit = ->
    if $scope.competitorForm.$valid
      $scope.save()

      NavService.setNextState 'competitors'


  activate = ->
    $scope.$watch 'competitorForm', (competitorForm) ->
      NavService.findState('competitors').form = competitorForm if competitorForm

    vm

  activate()

controller.$inject = ['$scope', 'NavService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkCompetitorsController', controller

