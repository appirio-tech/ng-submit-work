'use strict'

defaultFeatures = [
  name       : 'Login'
  description: 'Users can login / register for your app'
,
  name       : 'Social'
  description: 'Users can see data from social networks (FB, Twitter etc.) in your app'
,
  name       : 'Profiles'
  description: 'Users can create profiles with personal info'
,
  name       : 'Map'
  description: 'A map with a user\'s GPS location that helps them get to places'
,
  name       : 'Forms'
  description: 'Users send specific information to you via forms '
,
  name       : 'Listing'
  description: 'Display list of products, images, items that the user can browse or search through'
]

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

  vm.add = ->
    isNotBlank = vm.newFeatureName.trim().length > 0 && vm.newFeatureExplanation.trim().length > 0

    if isNotBlank
      $scope.features.push
        name       : vm.newFeatureName
        explanation: vm.newFeatureExplanation
        description: ''
        custom     : true

      syncWorkFeatures()

      vm.newFeatureName        = ''
      vm.newFeatureExplanation = ''
      vm.newFeature            = false

  syncWorkFeatures = ->
    vm.features = angular.copy defaultFeatures

    for feature in $scope.features
      vm.features.push
        name       : feature.name
        description: feature.description
        explanation: feature.explanation
        selected   : true

  vm.deleteFeature = (i) ->
    $scope.features.splice i, 1

  activate = ->
    $scope.$watch 'featureForm', (featureForm) ->
      NavService.findState('features').form = featureForm if featureForm

    $scope.$watch 'features', ->
      syncWorkFeatures()

    vm

  activate()

controller.$inject = ['$scope', 'NavService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkFeaturesController', controller

