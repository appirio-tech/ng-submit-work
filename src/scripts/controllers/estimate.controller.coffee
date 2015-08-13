'use strict'

controller = ($scope, SubmitWorkService, NavService) ->
  vm             = this
  vm.getEstimate = SubmitWorkService.getEstimate
  vm.showTerms   = false

  vm.change = ->
    NavService.setActiveState 'estimate'

  getActiveState = ->
    NavService.activeState

  hideTerms = (activeState) ->
    vm.showTerms = false unless activeState == 'estimate'

  activate = ->
    $scope.$watch 'estimateForm', (estimateForm) ->
      NavService.findState('estimate').form = estimateForm if estimateForm

    # Hide terms when no longer on estimate
    $scope.$watch getActiveState, hideTerms, true

    vm

  activate()

controller.$inject = ['$scope', 'SubmitWorkService', 'NavService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkEstimateController', controller

