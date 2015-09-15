'use strict'

SubmitWorkFeaturesController = ($scope, $rootScope, SubmitWorkService, SubmitWorkAPIService, API_URL) ->
  vm      = this
  vm.workId           = $scope.workId
  vm.loading          = true
  vm.showFeaturesModal = false
  vm.showUploadModal = false
  vm.showDefineFeaturesForm = false
  vm.activeFeature = null
  vm.featuresUploaderUploading = null
  vm.featuresUploaderHasErrors = null
  vm.features = []

  # TODO: replace palceholder features & descriptions
  config = {}

  config.defaultFeatures = [
    id: '123',
    name: 'Login',
    description: 'Users can login / register for your app',
    notes: null,
    custom: null,
    selected: false
  ,
    id: '124',
    name: 'Onboarding',
    description: 'Users can see data from social networks (FB, Twitter etc.) in your app',
    notes: null,
    custom: null,
    selected: false
  ,
    id: '125',
    name: 'Registration',
    description: 'Users can create profiles with personal info',
    notes: null,
    custom: null,
    selected: false
  ,
    id: '126',
    name: 'Location',
    description: 'A map with a user\'s GPS location that helps them get to places',
    notes: null,
    custom: null,
    selected: false
  ];

  vm.showFeatures = ->
    vm.showFeaturesModal = true

  vm.showUpload = ->
    vm.showUploadModal = true

  vm.toggleDefineFeatures = ->
    vm.showDefineFeaturesForm = !vm.showDefineFeaturesForm

  vm.hideCustomFeatures= ->
    vm.showDefineFeaturesForm = false
    onChange()

  vm.activateFeature = (feature) ->
    vm.activeFeature = feature

  vm.applyFeature = ->
    vm.features.forEach (feature) ->
      if feature.name == vm.activeFeature.name
        feature.selected = true

    vm.activeFeature = null

  vm.addCustomFeature = ->
    customFeatureValid = vm.customFeature.name && vm.customFeature.description

    if customFeatureValid
      vm.features.push vm.customFeature
      vm.hideCustomFeatures()
      onChange()

  vm.save = ->
    uploaderValid = !vm.featuresUploaderUploading && !vm.featuresUploaderHasErrors

    updates =
      selectedFeatures: []
      customFeatures: []

    vm.features.forEach (feature) ->
      if feature.id
        if feature.selected
          updates.selectedFeatures.push
            id: feature.id
      else
        updates.customFeatures.push feature

    hasFeatures = updates.selectedFeatures.length || updates.customFeatures.length

    if uploaderValid && hasFeatures
      SubmitWorkService.save(updates)

  configureUploader = ->
    assetType = 'specs'
    queryUrl = API_URL + '/v3/work-files/assets?filter=workId%3D' + vm.workId + '%26assetType%3D' + assetType
    vm.featuresUploaderConfig =
      name: 'uploader' + vm.workId
      allowMultiple: true
      queryUrl: queryUrl
      urlPresigner: API_URL + '/v3/work-files/uploadurl'
      fileEndpoint: API_URL + '/v3/work-files/:fileId'
      saveParams:
        workId: vm.workId
        assetType: assetType

  onChange = ->
    if SubmitWorkService.work.o.hasPending
      return false

    vm.loading = false

    vm.customFeature =
      name: null
      description: null
      custom: true

    unless vm.features.length
      config.defaultFeatures.forEach (feature) ->
        vm.features.push feature

      SubmitWorkService.work.features.forEach (feature) ->
        vm.features.push feature

    vm.work = SubmitWorkService.work


  activate = ->
    # initialize custom feature modal inputs
    destroyWorkListener = $rootScope.$on "SubmitWorkService.work:changed", ->
      onChange()

    $scope.$on '$destroy', ->
      destroyWorkListener()

    SubmitWorkService.fetch(vm.workId)
    configureUploader()

    vm

  activate()

SubmitWorkFeaturesController.$inject = ['$scope', '$rootScope', 'SubmitWorkService', 'SubmitWorkAPIService', 'API_URL']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkFeaturesController', SubmitWorkFeaturesController