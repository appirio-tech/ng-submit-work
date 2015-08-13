'use strict'

SubmitWorkController = ($scope, SubmitWorkService, NavService, $state, FeatureService) ->
  vm                  = this
  $scope.activeState  = NavService.activeState
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

  getWork = ->
    SubmitWorkService.work

  activate = ->
    $scope.$watch getWork, ->
      vm.work = SubmitWorkService.work

    if $scope.workId?.length
      SubmitWorkService.initializeWork $scope.workId
    else
      SubmitWorkService.resetWork()
      FeatureService.resetFeatures()

    vm

  activate()

SubmitWorkController.$inject = ['$scope', 'SubmitWorkService', 'NavService', '$state', 'FeatureService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkController', SubmitWorkController

