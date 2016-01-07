'use strict'

SubmitWorkVisualController = ($scope, $rootScope, $state, $document, SubmitWorkService, SubmitWorkUploaderService, RequirementService) ->
  if $scope.workId
    localStorageKey               = "recentSubmitWorkSection-#{$scope.workId}"
    localStorage[localStorageKey] = 'visuals'

  vm                       = this
  vm.workId                = $scope.workId
  vm.loading               = true
  vm.uploaderUploading     = null
  vm.uploaderHasErrors     = null
  vm.uploaderHasFiles      = null
  vm.showPaths             = true
  vm.showChooseStylesModal = false
  vm.showUploadStylesModal = false
  vm.showUrlStylesModal    = false
  vm.activeStyleModal      = null
  vm.nextButtonDisabled    = false
  vm.backButtonDisabled    = false
  vm.specsDefined          = false
  vm.urlAdded              = false
  vm.styleModals           = ['fonts', 'colors', 'icons', 'notes']
  vm.urlRegEx              = /^(http(s?):\/\/)?(www\.)?[a-zA-Z0-9\.\-\_]+(\.[a-zA-Z]{2,3})+(\/[a-zA-Z0-9\_\-\s\.\/\?\%\#\&\=]*)?$/
  vm.serif                 = 'SERIF'
  vm.sansSerif             = 'SANS_SERIF'

  vm.scrollTo = (id) ->
    element = angular.element document.getElementById id
    $document.scrollToElementAnimated element

  vm.showChooseStyles = ->
    vm.showPaths = false
    vm.showChooseStylesModal = true
    vm.backButtonDisabled = true
    vm.activateModal('fonts')

  vm.hideChooseStyles = ->
    vm.showPaths = true
    vm.showChooseStylesModal = false

  vm.hideUrlStyles = ->
    vm.showUrlStylesModal = false

  vm.showUploadStyles = ->
    vm.showUploadStylesModal = true

  vm.hideUploadStyles = ->
    unless vm.uploaderUploading
      vm.showUploadStylesModal = false

  vm.showUrlStyles = ->
    vm.showUrlStylesModal = true

  vm.hideUrlStyles = ->
    vm.showUrlStylesModal = false

  vm.activateModal = (modal) ->
    vm.activeStyleModal = modal
    updateButtons()

  vm.viewNext = ->
    currentIndex = vm.styleModals.indexOf vm.activeStyleModal
    isValid = currentIndex < vm.styleModals.length - 1
    if isValid
      nextModal = vm.styleModals[currentIndex + 1]
      vm.activateModal(nextModal)

  vm.viewPrevious = ->
    currentIndex = vm.styleModals.indexOf vm.activeStyleModal
    isValid = currentIndex > 0
    if isValid
      previousModal = vm.styleModals[currentIndex - 1]
      vm.activateModal(previousModal)

  vm.toggleSelection = (model, value) ->
    if vm[model] == value
      vm[model] = null
    else
      vm[model] = value

  vm.toggleColorSelection = (model, value) ->
    model.selected = !model.selected

  vm.save = (done = false, kickoff = false) ->
    updates        = getUpdates()
    updates.status = if kickoff then 'SUBMITTED' else 'INCOMPLETE'

    SubmitWorkService.save(updates).then ->
      if done && kickoff
        $state.go 'submit-work-complete', { id: vm.workId }
      else if done
        $state.go 'view-work-multiple'
      else if vm.showChooseStylesModal
        vm.hideChooseStyles()
      else if vm.showUrlStylesModal
        unless $scope.urlForm.addressInput.$error.pattern
          vm.hideUrlStyles()

  transformToUrl = (address) ->
    if address.substr(0, 4) != 'http'
      "http://#{address}"
    else
      address

  getUpdates = ->
    getId = (item) ->
      item.id

    updates =
      fontIds:  if vm.font then [ vm.font ] else null
      colorSwatchIds: vm.colors.filter(isSelected).map(getId)
      iconsetIds:  if vm.icon then [ vm.icon ] else null
      designUrls: if vm.url then [ transformToUrl(vm.url) ] else null
      designNotes: if vm.designNotes then vm.designNotes else null

    updates

  vm.navigateDevelopment = ->
      $state.go "submit-work-development", { id: vm.workId }

  isSelected = (item) ->
    item.selected

  updateButtons = ->
    currentIndex = vm.styleModals.indexOf vm.activeStyleModal
    isFirst = currentIndex == 0
    isLast = currentIndex == vm.styleModals.length - 1
    if isFirst
      vm.nextButtonDisabled = false
      vm.showFinishDesignButton = false
      vm.backButtonDisabled = true
    else if isLast
      vm.nextButtonDisabled = true
      vm.backButtonDisabled = false
      vm.showFinishDesignButton = true
    else
      vm.nextButtonDisabled = false
      vm.backButtonDisabled = false
      vm.showFinishDesignButton = false

  configureUploader = ->
    vm.uploaderConfig = SubmitWorkUploaderService.generateConfig vm.workId, 'visuals'

  onChange = ->
    work = SubmitWorkService.get()

    if work._pending
      vm.loading = true
      return false

    vm.loading     = false
    vm.font        = vm.font || work.fontIds?[0]
    vm.icon        = vm.icon || work.iconsetIds?[0]
    vm.url         = vm.url || work.designUrls?[0]
    vm.designNotes = vm.designNotes || work.designNotes

    vm.fonts   = angular.copy RequirementService.fonts
    vm.colors  = angular.copy RequirementService.colors
    vm.icons   = angular.copy RequirementService.icons

    vm.colors.forEach (color) ->
      if work.colorSwatchIds?.indexOf(color.id) >= 0
        color.selected = true

    if vm.font? || vm.icon? || vm.colors.filter(isSelected).length > 0
      vm.specsDefined = true
    else
      vm.specsDefined = false

    if vm.url?
      vm.urlAdded = true
    else
      vm.urlAdded = false

    vm.projectType = work.projectType
    vm.section = 2
    vm.numberOfSections = if work.projectType == 'DESIGN_AND_CODE' then 3 else 2

  activate = ->
    $scope.$watch 'vm.showChooseStylesModal', (newValue, oldValue) ->
      if oldValue && !newValue
        vm.save()

    $scope.$watch 'vm.showUrlStylesModal', (newValue, oldValue) ->
      if oldValue && !newValue
        vm.save()

    $scope.$watch 'vm.showUploadStylesModal', (newValue, oldValue) ->
      if oldValue && !newValue
        if vm.uploaderUploading
          vm.showUploadStylesModal = true

    destroyWorkListener = $rootScope.$on "SubmitWorkService.work:changed", ->
      onChange()

    $scope.$on '$destroy', ->
      destroyWorkListener()

    SubmitWorkService.fetch(vm.workId)
    configureUploader()

    vm

  activate()

SubmitWorkVisualController.$inject = ['$scope', '$rootScope', '$state', '$document', 'SubmitWorkService', 'SubmitWorkUploaderService', 'RequirementService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkVisualController', SubmitWorkVisualController