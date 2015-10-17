'use strict'

SubmitWorkFeaturesController = ($scope, $rootScope, SubmitWorkService, SubmitWorkAPIService, SubmitWorkUploaderService, RequirementService) ->
  if $scope.workId
    localStorageKey               = "recentSubmitWorkSection-#{$scope.workId}"
    localStorage[localStorageKey] = 'features'

  vm                        = this
  vm.workId                 = $scope.workId
  vm.loading                = true
  vm.featureNameError       = false
  vm.showFeaturesModal      = false
  vm.showUploadModal        = false
  vm.showDefineFeaturesForm = false
  vm.activeFeature          = null
  vm.uploaderUploading      = null
  vm.uploaderHasErrors      = null
  vm.features               = []

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

  vm.hideCustomFeatures = ->
    vm.showDefineFeaturesForm = false

  vm.activateFeature = (feature) ->
    vm.activeFeature = feature

  vm.applyFeature = ->
    vm.features.forEach (feature) ->
      if feature.id == vm.activeFeature.id
        vm.updatedFeatures.push feature

    vm.activeFeature = null
    onChange()

  vm.removeFeature = ->
    vm.updatedFeatures.forEach (feature, index) ->
      if feature.title == vm.activeFeature.title
        vm.updatedFeatures.splice(index, 1)

    vm.activeFeature = null
    onChange()

  vm.addCustomFeature = ->
    customFeatureValid = vm.customFeature.title && vm.customFeature.description
    vm.featureTitleError = false

    vm.features.forEach (feature) ->
      if vm.customFeature.title.toLowerCase() == feature.title.toLowerCase()
        customFeatureValid = false
        vm.featureTitleError = true

    if customFeatureValid
      vm.updatedFeatures.push vm.customFeature
      vm.hideCustomFeatures()
      onChange()

  vm.save = ->
    uploaderValid = !vm.uploaderUploading && !vm.uploaderHasErrors
    updates       = getUpdates()

    if uploaderValid
      SubmitWorkService.save(updates).then ->
        vm.showFeaturesModal = false

  getUpdates = ->
    updates =
      features: []

    vm.updatedFeatures.forEach (feature) ->
      updates.features.push
        id: feature.id
        title: feature.title
        description: feature.description
        notes: feature.notes
        custom: feature.custom
        fileIds: feature.fileIds

    updates

  configureUploader = ->
    vm.uploaderConfig = SubmitWorkUploaderService.generateConfig vm.workId, 'features'

  onChange = ->
    work = SubmitWorkService.get()

    if work._pending
      vm.loading = true
      return false

    vm.loading = false
    vm.customFeature         = angular.copy config.customFeatureTemplate
    vm.selectedFeaturesCount = 0
    vm.features              = angular.copy RequirementService.features

    unless vm.updatedFeatures
      vm.updatedFeatures = work.features

    vm.updatedFeatures.forEach (feature) ->
      if feature.custom
        feature.selected = true
        vm.features.push feature
        vm.selectedFeaturesCount++
      else
        vm.features.forEach (vmFeature) ->
          if feature.id == vmFeature.id
            vmFeature.selected = true
            vm.selectedFeaturesCount++

    vm.projectType = work.projectType
    vm.section = 1
    vm.numberOfSections = if work.projectType == 'DESIGN_AND_CODE' then 3 else 2

  activate = ->
    destroyWorkListener = $rootScope.$on "SubmitWorkService.work:changed", ->
      onChange()

    $scope.$on '$destroy', ->
      destroyWorkListener()

    SubmitWorkService.fetch(vm.workId)
    configureUploader()

  activate()

  vm

SubmitWorkFeaturesController.$inject = ['$scope', '$rootScope', 'SubmitWorkService', 'SubmitWorkAPIService', 'SubmitWorkUploaderService', 'RequirementService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkFeaturesController', SubmitWorkFeaturesController