'use strict'

SubmitWorkFeaturesController = ($scope, $rootScope, SubmitWorkService, SubmitWorkAPIService, API_URL, RequirementService) ->
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

  unsaved = {}

  config =
    customFeatureTemplate:
      id: null
      title: null
      description: null
      notes: null
      custom: true
      fileIds: []

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
      if feature.id == vm.activeFeature.id
        unsaved.features.push feature

    vm.activeFeature = null
    onChange()

  vm.removeFeature = ->
    unsaved.features.forEach (feature, index) ->
      if feature.title == vm.activeFeature.title
        unsaved.features.splice(index, 1)

    vm.activeFeature = null
    onChange()

  vm.addCustomFeature = ->
    customFeatureValid = vm.customFeature.title && vm.customFeature.description

    if customFeatureValid
      unsaved.features.push vm.customFeature
      vm.hideCustomFeatures()
      onChange()

  vm.save = ->
    uploaderValid = !vm.featuresUploaderUploading && !vm.featuresUploaderHasErrors
    updates       = getUpdates()
    hasFeatures   = updates.features.length

    if uploaderValid && hasFeatures
      console.log updates
      SubmitWorkService.save(updates).then ->
        vm.showFeaturesModal = false

  getUpdates = ->
    updates =
      features: []

    unsaved.features.forEach (feature) ->
      updates.features.push
        id: feature.id
        title: feature.title
        description: feature.description
        notes: feature.notes
        custom: feature.custom
        fileIds: feature.fileIds

    updates

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
    work = SubmitWorkService.get()

    if work.o.pending
      vm.loading = true
      return false

    vm.loading = false
    vm.customFeature         = angular.copy config.customFeatureTemplate
    vm.selectedFeaturesCount = 0
    vm.features              = angular.copy RequirementService.features

    unless unsaved.features
      unsaved.features = work.features

    unsaved.features.forEach (feature) ->
      if feature.custom
        feature.selected = true
        vm.features.push feature
        vm.selectedFeaturesCount++
      else
        vm.features.forEach (vmFeature) ->
          if feature.id == vmFeature.id
            vmFeature.selected = true
            vm.selectedFeaturesCount++

  activate = ->
    destroyWorkListener = $rootScope.$on "SubmitWorkService.work:changed", ->
      onChange()

    $scope.$on '$destroy', ->
      destroyWorkListener()

    SubmitWorkService.fetch(vm.workId)
    configureUploader()

  activate()

  vm

SubmitWorkFeaturesController.$inject = ['$scope', '$rootScope', 'SubmitWorkService', 'SubmitWorkAPIService', 'API_URL', 'RequirementService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkFeaturesController', SubmitWorkFeaturesController