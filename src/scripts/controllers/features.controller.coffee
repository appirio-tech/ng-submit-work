'use strict'

SubmitWorkFeaturesController = ($scope, $rootScope, SubmitWorkService, SubmitWorkAPIService, API_URL) ->
  vm                           = this
  vm.workId                    = $scope.workId
  vm.loading                   = true
  vm.showFeaturesModal         = false
  vm.showUploadModal           = false
  vm.showDefineFeaturesForm    = false
  vm.activeFeature             = null
  vm.featuresUploaderUploading = null
  vm.featuresUploaderHasErrors = null
  vm.features                  = []

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

  vm.activateFeature = (feature) ->
    vm.activeFeature = feature

  vm.applyFeature = ->
    vm.features.forEach (feature) ->
      if feature.name == vm.activeFeature.name
        feature.selected = true

    vm.activeFeature = null
    onChange()

  vm.removeFeature = ->
    vm.features.forEach (feature, index) ->
      if feature.name == vm.activeFeature.name
        vm.features.splice(index, 1)

    vm.activeFeature = null
    onChange()

  vm.addCustomFeature = ->
    customFeatureValid = vm.customFeature.name && vm.customFeature.description

    if customFeatureValid
      vm.customFeature.selected = true
      vm.features.push vm.customFeature
      vm.hideCustomFeatures()
      onChange()

  vm.save = ->
    uploaderValid = !vm.featuresUploaderUploading && !vm.featuresUploaderHasErrors

    updates = getUpdates()

    hasFeatures = updates.selectedFeatures.length || updates.customFeatures.length

    if uploaderValid && hasFeatures
      SubmitWorkService.save(updates)

  getUpdates = ->
    updates =
      selectedFeatures: []
      customFeatures: []
    vm.features.forEach (feature) ->
      if feature.id
        if feature.selected
          updates.selectedFeatures.push
            id: feature.id
      else
        if feature.selected
          updates.customFeatures.push feature
    updates

  configureUploader = ->
    domain = 'https://api.topcoder.com'
    workId = vm.workId
    category = 'work'
    assetType = 'specs'

    vm.featuresUploaderConfig =
      name: 'uploader' + vm.workId
      allowMultiple: true
      query:
        url: domain + '/v3/work-files/assets'
        params:
          filter: 'id=' + workId + '&assetType=' + assetType + '&category=' + category
      presign:
        url: domain + '/v3/work-files/uploadurl'
        params:
          id: workId
          assetType: assetType
          category: category
      createRecord:
        url: domain + '/v3/work-files'
        params:
          id: workId
          assetType: assetType
          category: category
      removeRecord:
        url: domain + '/v3/work-files/:fileId'
        params:
          filter: 'category=' + category

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
      # add any custom features to vm
      SubmitWorkService.work.features.forEach (feature) ->
        if !feature.id
          feature.selected = true
          vm.features.push feature
      # set already selected features to selected on vm
      SubmitWorkService.work.features.forEach (feature) ->
        vm.features.forEach (vmFeature) ->
          if feature.id == vmFeature.id
            vmFeature.selected = true

    updates = getUpdates()
    vm.selectedFeaturesCount = updates.selectedFeatures.length + updates.customFeatures.length

    vm.work = SubmitWorkService.work

  activate = ->
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