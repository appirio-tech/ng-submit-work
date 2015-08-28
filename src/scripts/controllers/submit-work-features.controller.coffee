'use strict'

SubmitWorkFeaturesController = ($scope, SubmitWorkAPIService) ->
  vm      = this
  vm.loading          = true
  vm.showDefineAFeatureModal = false
  vm.workId           = $scope.workId

  vm.work =
    name       : null
    requestType: null
    summary    : null
    features   : []

#TODO: replace palceholder features & descriptions
  vm.defaultFeatures = [
    {
      name: 'Login',
      description: 'Users can login / register for your app',
      checked: false
    }, {
      name: 'Onboarding',
      description: 'Users can see data from social networks (FB, Twitter etc.) in your app',
      checked: false
    }, {
      name: 'Registration',
      description: 'Users can create profiles with personal info',
      checked: false
    }, {
      name: 'Dates & Location',
      description: 'A map with a user\'s GPS location that helps them get to places',
      checked: false
    }
  ];

  vm.showCustomFeatureModal = ->
    vm.showDefineAFeatureModal = true

  vm.hideCustomFeatureModal = ->
    resetCustomFeature()
    vm.showDefineAFeatureModal = false

  vm.addCustomFeature = ->
    vm.work.features.push vm.customFeature
    resetCustomFeature()
    vm.hideCustomFeatureModal()

  vm.save = (onSuccess) ->
    if vm.workId
      params =
        id: vm.workId

      resource = SubmitWorkAPIService.put params, vm.work
      resource.$promise.then (response) ->
        onSuccess? response
      resource.$promise.catch (response) ->
        # TODO: add error handling

  vm.submitFeatures = ->
    vm.defaultFeatures.forEach (feature) ->
      if feature.checked
        vm.work.features.push(
          name: feature.name
          description: feature.description
          custom: null
        )
    if vm.work.features.length
      # TODO: Replace with proper back-end status
      vm.work.status = 'FeaturesAdded'
      vm.save (response) ->
        # TODO: navigate to "proceed to visuals" view

  resetCustomFeature = ->
    vm.customFeature =
      name: null
      description: null
      custom: true

  activate = ->
    # initialize custom feature modal inputs
    resetCustomFeature()

    if vm.workId
      params =
        id      : vm.workId

      resource = SubmitWorkAPIService.get params

      resource.$promise.then (response) ->
        vm.work = response

       resource.$promise.catch (response) ->
         # TODO: add error handling

       resource.$promise.finally ->
         vm.loading = false
    else
      vm.loading = false

    vm

  activate()

SubmitWorkFeaturesController.$inject = ['$scope', 'SubmitWorkAPIService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkFeaturesController', SubmitWorkFeaturesController