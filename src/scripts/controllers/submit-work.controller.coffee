'use strict'

SubmitWorkController = (
  $scope
  SubmitWorkService2
  NavService
  $state
  SubmitWorkAPIService
) ->
  vm                  = this
  $scope.activeState  = NavService.activeState
  $scope.completed    = NavService.completed
  $scope.asideService = getEstimate: SubmitWorkService2.getEstimate

  vm.work =
    name             : null
    modelType        : 'app-project'
    requestType      : null
    usageDescription : null
    summary          : null
    status           : 'Incomplete'
    competitorApps   : []
    features         : []
    acceptedTerms    : false
    costEstimate     :
      low: 0
      high: 0

  watchActiveState = ->
    NavService.activeState

  setActiveState = (activeState) ->
    $scope.activeState = activeState

  watchCompleted = ->
    NavService.completed

  setCompleted = (completed) ->
    $scope.completed = completed

  vm.launch = ->
    for state in NavService.states
      unless state.form?.$valid && !state.uploading && !state.hasErrors
        state.form.$setDirty()
        activateState = state unless activateState

    if activateState
      NavService.setActiveState activateState
    else
      NavService.reset()

      options = saved: true

      SubmitWorkService2.save('Submitted', true).then ->
        $state.go 'view-work-multiple' , options

  vm.save = ->


  activate = ->
    $scope.$watch watchActiveState, setActiveState, true
    $scope.$watch watchCompleted, setCompleted, true

    if $scope.workId?.length
      params =
        id: $scope.workId

      resource = SubmitWorkAPIService.get params

      resource.$promise.then (data) ->
        vm.work = data.result.content

      resource.$promise.catch (data) ->

      resource.$promise.finally (data) ->

    vm

  activate()

SubmitWorkController.$inject = [
  '$scope'
  'SubmitWorkService2'
  'NavService'
  '$state'
  'SubmitWorkAPIService'
]

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkController', SubmitWorkController

