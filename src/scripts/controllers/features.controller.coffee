'use strict'

controller = ($scope, NavService) ->
  vm                       = this
  vm.newFeatureName        = ''
  vm.newFeatureExplanation = ''
  vm.newFeature            = false
  vm.showExample           = false
  vm.add                   = null
  vm.deleteFeature         = null

  vm.clickExample = ->
    $scope.showExample = true

  vm.submit = ->
    NavService.setNextState 'features' if $scope.featureForm.$valid

  vm.add =->
    isNotBlank = vm.newFeatureName.trim().length > 0 && vm.newFeatureExplanation.trim().length > 0

    if isNotBlank
      $scope.features.push
        id         : vm.newFeatureName
        name       : vm.newFeatureName
        explanation: vm.newFeatureExplanation
        description: ''
        custom     : true
        selected   : true

      vm.newFeatureName        = ''
      vm.newFeatureExplanation = ''
      vm.newFeature            = false

  vm.deleteFeature = (i) ->
    $scope.features.splice i, 1

  activate = ->
    $scope.$watch 'featureForm', (featureForm) ->
      NavService.findState('features').form = featureForm if featureForm

    vm

  activate()

controller.$inject = ['$scope', 'NavService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkFeaturesController', controller

