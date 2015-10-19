'use strict'

SubmitWorkTypeController = ($scope, $rootScope, $state, $document, SubmitWorkService, RequirementService) ->
  vm                  = this
  vm.loading          = false
  vm.showSuccessModal = false
  vm.nameError        = false
  vm.devicesError     = false
  vm.orientationError = false
  vm.projectTypeError = false
  vm.briefError       = false

  # TODO: move route directing out of here
  if $scope.workId
    localStorageKey = "recentSubmitWorkSection-#{$scope.workId}"
    recent = localStorage[localStorageKey] || 'features'

    $state.go "submit-work-#{recent}", { id: $scope.workId }

  vm.name         = ""
  vm.devices      = angular.copy RequirementService.devices
  vm.orientations = angular.copy RequirementService.orientations
  vm.projectTypes = angular.copy RequirementService.projectTypes
  vm.brief        = ""

  vm.showOrientation = ->
    showOrientation = true

    selected = vm.devices.filter (device) ->
      device.selected

    selectedName = selected[0]?.name

    if selected.length == 0 || (selected.length == 1 && selectedName == 'iWatch')
      showOrientation = false


    showOrientation

  vm.validateSection = (nextId, models, scrollActivated) ->
    nextSection = angular.element document.getElementById nextId
    foundErrors = false

    if Array.isArray models
      foundModelErrors = false

      models.forEach (model) ->
        modelError = "#{model}Error"
        selected = vm[model].filter (individualModel) ->
          individualModel.selected

        if selected.length == 0
          vm[modelError] = true
          foundModelErrors = true
        else
          vm[modelError] = false

      if foundModelErrors
        foundErrors = true
      else
        foundErrors = false

    else
      model = models
      modelError = "#{model}Error"
      if vm[model]?.length
        vm[modelError] = false
        foundErrors = false
      else
        vm[modelError] = true
        foundErrors = true

    if scrollActivated
      unless foundErrors
        $document.scrollToElementAnimated nextSection

  vm.validateAllSections = ->
    vm.validateSection('platform-details', 'name')
    vm.validateSection('type-details', ['devices', 'orientations'])
    vm.validateSection('brief-details', 'projectType')
    vm.validateSection('brief-details', 'brief')

    foundErrors = false
    errorElement = null

    if vm.briefError
      foundErrors = true
      errorElement = angular.element document.getElementById 'brief-details'
      $document.scrollToElementAnimated errorElement

    if vm.projectTypeError
      foundErrors = true
      errorElement = angular.element document.getElementById 'type-details'
      $document.scrollToElementAnimated errorElement

    if vm.devicesError || vm.orientationError
      foundErrors = true
      errorElement = angular.element document.getElementById 'platform-details'
      $document.scrollToElementAnimated errorElement

    if vm.nameError
      foundErrors = true
      errorElement = angular.element document.getElementById 'app-name'
      $document.scrollTopAnimated(0)

    unless foundErrors
      vm.create()

  vm.create = ->
    updates = getUpdates()

    if isValid(updates)
      vm.loading = true

      promise = SubmitWorkService.create(updates)

      promise.then ->
        work = SubmitWorkService.get()

        $state.go 'submit-work-features', { id: work.id }

  isValid = (updates) ->
    valid = true

    unless updates.projectType == 'DESIGN' || updates.projectType == 'DESIGN_AND_CODE'
      valid = false

    unless updates.name.length > 0
      valid = false

    unless updates.brief.length > 0
      valid = false

    unless updates.deviceIds.length > 0
      valid = false

    unless updates.orientationIds.length > 0
      valid = false

    valid

  getUpdates = ->
    isSelected = (item) ->
      item.selected

    getId = (item) ->
      item.id

    updates =
      projectType   : vm.projectType.trim()
      name          : vm.name.trim()
      brief         : vm.brief.trim()
      deviceIds     : vm.devices.filter(isSelected).map(getId)
      orientationIds: vm.orientations.filter(isSelected).map(getId)

  vm

SubmitWorkTypeController.$inject = ['$scope', '$rootScope', '$state', '$document', 'SubmitWorkService', 'RequirementService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkTypeController', SubmitWorkTypeController