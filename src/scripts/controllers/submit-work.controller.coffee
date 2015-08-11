'use strict'

SubmitWorkController = ($scope, SubmitWorkService, NavService, $state) ->
  $scope.activeState  = NavService.activeState
  $scope.work         = SubmitWorkService.work
  $scope.completed    = NavService.completed
  $scope.asideService = getEstimate: SubmitWorkService.getEstimate

  # Watch service to set active state
  watchActiveState = ->
    NavService.activeState

  setActiveState = (activeState) ->
    $scope.activeState = activeState

  $scope.$watch watchActiveState, setActiveState, true

  # Watch service to set completed
  watchCompleted = ->
    NavService.completed

  setCompleted = (completed) ->
    $scope.completed = completed

  $scope.$watch watchCompleted, setCompleted, true

  $scope.launch = ->
    for state in NavService.states

      unless state.form?.$valid && !state.uploading && !state.hasErrors
        state.form.$setDirty()
        activateState = state unless activateState

    if activateState
      NavService.setActiveState activateState
    else
      NavService.reset()

      options = saved: true

      SubmitWorkService.save('Submitted', true).then ->
        $state.go 'view-work-multiple' , options

  activate = ->
    SubmitWorkService.resetWork() unless $scope.work

  activate()

SubmitWorkController.$inject = ['$scope', 'SubmitWorkService', 'NavService', '$state']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkController', SubmitWorkController

