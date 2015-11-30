'use strict'

SubmitWorkFeaturesController = ($scope, $rootScope, SubmitWorkService, SubmitWorkAPIService, SubmitWorkUploaderService, RequirementService) ->
  if $scope.workId
    localStorageKey               = "recentSubmitWorkSection-#{$scope.workId}"
    localStorage[localStorageKey] = 'features'

  vm                        = this
  vm.workId                 = $scope.workId
  vm.loading                = true
  vm.featureTitleError      = false
  vm.showFeaturesModal      = false
  vm.showUploadModal        = false
  vm.showDefineFeaturesForm = false
  vm.featuresDefined        = false
  vm.urlAdded               = false
  vm.addingCustomFeature    = false
  vm.activeFeature          = null
  vm.uploaderUploading      = null
  vm.uploaderHasErrors      = null
  vm.uploaderHasFiles       = null
  vm.features               = []

  config =
    customFeatureTemplate:
      category: 'Custom Features'
      id: null
      title: null
      description: null
      notes: null
      custom: true
      fileIds: []

  vm.categoriesList = [
    category: 'Custom Features'
    icon    : '/images/custom-features.svg'
  ,
    category: 'Login & Registration'
    icon    : '/images/login-reg.svg'
  ,
    category: 'General Building Blocks'
    icon    : '/images/general-building-blocks.svg'
  ,
    category: 'Ecommerce'
    icon    : '/images/ecommerce.svg'
  ,
    category: 'Social'
    icon    : '/images/social.svg'
  ]

  vm.filterByCategory = (list, category) ->
    featureList = list?.filter (feature) ->
      feature.category == category

    featureList

  vm.activeFeatureChangedNotes = (activeFeature) ->
    changedNotes = false

    vm.updatedFeatures?.forEach (feature) ->
      if feature.id == activeFeature?.id && feature.notes != activeFeature?.notes
        changedNotes = true

    changedNotes

  vm.showFeatures = ->
    vm.showFeaturesModal = true

  vm.showUpload = ->
    vm.showUploadModal = true

  vm.toggleDefineFeatures = ->
    vm.activeFeature = null
    vm.addingCustomFeature = true
    vm.showDefineFeaturesForm = !vm.showDefineFeaturesForm

  vm.hideCustomFeatures = ->
    vm.showDefineFeaturesForm = false

  vm.activateFeature = (feature) ->
    vm.showDefineFeaturesForm = false
    vm.addingCustomFeature = false
    vm.activePreview = feature.title
    vm.activeFeature = feature

  vm.saveNotes = ->
    vm.updatedFeatures.forEach (updatedFeature) ->
      if updatedFeature.id == vm.activeFeature.id
        updatedFeature.notes = vm.activeFeature.notes

  vm.applyFeature = ->
    vm.activeFeature.selected = true

    vm.features.forEach (feature) ->
      if feature.id == vm.activeFeature.id
        vm.updatedFeatures.push feature

    onChange()

  vm.removeFeature = ->
    vm.updatedFeatures.forEach (feature, index) ->
      if feature.title == vm.activeFeature.title
        vm.updatedFeatures.splice(index, 1)

    vm.activeFeature = null
    onChange()

  vm.customNameUnique = ->
    vm.featureTitleError = false
    unique = true

    vm.features.forEach (feature) ->
      if vm.customFeature.title?.toLowerCase() == feature.title.toLowerCase()
        vm.featureTitleError = true
        unique = false

    unique

  vm.addCustomFeature = ->
    customFeatureValid = vm.customFeature.title && vm.customFeature.description && vm.customNameUnique()

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

    vm.updatedFeatures?.forEach (feature) ->
      updates.features.push
        category: feature.category
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
    vm.appName = work.name
    vm.customFeature         = angular.copy config.customFeatureTemplate
    vm.featureTitleError     = false
    vm.selectedFeaturesCount = 0
    vm.features              = angular.copy RequirementService.features

    unless vm.updatedFeatures
      vm.updatedFeatures = work.features

    vm.updatedFeatures.forEach (feature) ->
      if feature.custom
        feature.selected = true
        feature.category = 'Custom Features'
        vm.features.push feature
        vm.selectedFeaturesCount++
      else
        vm.features.forEach (vmFeature) ->
          if feature.id == vmFeature.id
            vmFeature.selected = true
            vmFeature.notes = feature.notes
            vm.selectedFeaturesCount++

    vm.featuresDefined = vm.selectedFeaturesCount > 0
    vm.projectType = work.projectType
    vm.section = 1
    vm.numberOfSections = if work.projectType == 'DESIGN_AND_CODE' then 3 else 2

  activate = ->
    $scope.$watch 'vm.showFeaturesModal', (newValue, oldValue) ->
      if oldValue && !newValue
        vm.save()

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