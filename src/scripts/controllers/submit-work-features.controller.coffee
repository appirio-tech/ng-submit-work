'use strict'

SubmitWorkFeaturesController = ($scope, SubmitWorkAPIService, API_URL) ->
  vm      = this
  vm.loading          = true
  vm.showDefineAFeatureModal = false
  vm.workId           = $scope.workId
  vm.featuresUploaderUploading = null
  vm.featuresUploaderHasErrors = null

  vm.work =
    name       : null
    requestType: null
    summary    : null
    features   : []
    featuresDetails: null

#TODO: replace palceholder features & descriptions
  vm.defaultFeatures = [
      name: 'Login',
      description: 'Users can login / register for your app',
      checked: false
    ,
      name: 'Onboarding',
      description: 'Users can see data from social networks (FB, Twitter etc.) in your app',
      checked: false
    ,
      name: 'Registration',
      description: 'Users can create profiles with personal info',
      checked: false
    ,
      name: 'Dates & Location',
      description: 'A map with a user\'s GPS location that helps them get to places',
      checked: false
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
    workFeatures = vm.work.features

    vm.defaultFeatures.forEach (feature) ->
      if feature.checked
         workFeatures.push
          name: feature.name
          description: feature.description
          custom: null

    if workFeatures.length
      # TODO: Replace with proper back-end status
      vm.work.status = 'FeaturesAdded'
      vm.save (response) ->
        # TODO: navigate to "proceed to visuals" view

  resetCustomFeature = ->
    vm.customFeature =
      name: null
      description: null
      custom: true

  configureUploader = ->
    assetType = 'specs';
    queryUrl = API_URL + '/v3/work-files/assets?filter=workId%3D' + vm.workId + '%26assetType%3D' + assetType;
    vm.featuresUploaderConfig =
      name: 'uploader' + vm.workId
      allowMultiple: true
      queryUrl: queryUrl
      urlPresigner: API_URL + '/v3/work-files/uploadurl'
      fileEndpoint: API_URL + '/v3/work-files/:fileId'
      saveParams:
        workId: vm.workId
        assetType: assetType

  activate = ->
    # initialize custom feature modal inputs
    resetCustomFeature()
    configureUploader()

    if vm.workId
      params =
        id      : vm.workId

      resource = SubmitWorkAPIService.get params

      resource.$promise.then (response) ->
        vm.work = response
        # TODO: remove once details are added to payload
        vm.work.featuresDetails = null

       resource.$promise.catch (response) ->
         # TODO: add error handling

       resource.$promise.finally ->
         vm.loading = false
    else
      vm.loading = false

    vm

  activate()

SubmitWorkFeaturesController.$inject = ['$scope', 'SubmitWorkAPIService', 'API_URL']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkFeaturesController', SubmitWorkFeaturesController