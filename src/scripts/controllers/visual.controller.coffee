'use strict'

SubmitWorkVisualController = ($scope, $rootScope, $state, SubmitWorkService, Optimist, API_URL) ->
  vm                          = this
  vm.workId                   = $scope.workId
  vm.loading                  = true
  vm.visualsUploaderUploading = null
  vm.visualsUploaderHasErrors = null
  vm.showPaths                = true
  vm.showChooseStylesModal    = false
  vm.showUploadStylesModal    = false
  vm.showUrlStylesModal       = false
  vm.activeStyleModal         = null
  vm.nextButtonDisabled       = false
  vm.backButtonDisabled       = false
  vm.styleModals              = ['fonts', 'colors', 'icons']

  config = {}
  config.fonts = [
    name: 'Serif'
    description: 'Classic design, good legiblity for large and small text.'
    id: '123'
    selected: false
  ,
    name: 'Sans Serif'
    id: '456'
    description: 'Modern design, good for headers and body text.'
    selected: false
  ]

  config.colors = [
    name: 'Palette 1'
    description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    id: '1234'
    selected: false
  ,
    name: 'Palette 2'
    description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    id: '1235'
    selected: false

  ,
    name: 'Palette 3'
    description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    id: '1236'
    selected: false

  ,
    name: 'Palette 4'
    description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    id: '1237'
    selected: false
  ]

  config.icons = [
    name: 'Flat Colors'
    description: 'Lorem ipsum dolor sit amet'
    id: '1234'
    selected: false

  ,
    name: 'Thin Line'
    description: 'Lorem ipsum dolor sit amet'
    id: '1235'
    selected: false

  ,
    name: 'Solid Line'
    description: 'Lorem ipsum dolor sit amet'
    id: '1236'
    selected: false
  ]

  vm.showChooseStyles = ->
    vm.showPaths = false
    vm.showChooseStylesModal = true
    vm.backButtonDisabled = true
    vm.activateModal('fonts')

  vm.showUploadStyles = ->
    vm.showUploadStylesModal = true

  vm.showUrlStyles = ->
    vm.showUrlStylesModal = true

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

  vm.save = ->
    visualsValid = visualDesignValid()
    updates = getUpdates()
    if visualsValid
      SubmitWorkService.save(updates).then ->
        $state.go("submit-work-development")

  visualDesignValid = ->
    updates = getUpdates()
    uploaderValid = !vm.visualsUploaderUploading && !vm.visualsUploaderHasErrors
    # TODO: add updates.colors check
    hasVisualChoices = updates.font && updates.icons
    # check if visuals are selected or entered via url
    hasVisuals = hasVisualChoices || updates.url
    hasVisuals

  getUpdates = ->
    updates =
      font:  vm.work.font
      colors: vm.work.colors
      icons:  vm.work.icons
      url:    null

    if vm.work.url
      updates.url = vm.visualDesign.url

    updates

  vm.navigateDevelopment = ->
    visualsValid = visualsValid()
    if visualsValid
      $state.go("submit-work-development")

  updateButtons = ->
    currentIndex = vm.styleModals.indexOf vm.activeStyleModal
    isFirst = currentIndex == 0
    isLast = currentIndex == vm.styleModals.length - 1
    if isFirst
      vm.backButtonDisabled = true
    else if isLast
      vm.nextButtonDisabled = true
      vm.showFinishDesignButton = true
    else
      vm.nextButtonDisabled = false
      vm.backButtonDisabled = false
      vm.showFinishDesignButton = false


  configureUploader = ->
    assetType = 'specs'
    queryUrl = API_URL + '/v3/work-files/assets?filter=workId%3D' + vm.workId + '%26assetType%3D' + assetType
    vm.visualsUploaderConfig =
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

    # TODO: Remove mock data once visualDesign is in payload
    SubmitWorkService.work.visualDesign        = {}
    SubmitWorkService.work.visualDesign.url    = null
    SubmitWorkService.work.visualDesign.font  =
      id: '123'
    SubmitWorkService.work.visualDesign.colors =
      id: '1236'
    SubmitWorkService.work.visualDesign.icons  =
      id: '1234'
    # initialize vm
    unless vm.visualDesign
      vm.visualDesign        = config
      vm.visualDesign.fonts  = config.fonts
      vm.visualDesign.colors = config.colors
      vm.visualDesign.icons  = config.icons

    vm.work = {}
    vm.work.icons = SubmitWorkService.work.visualDesign.icons
    vm.work.colors = SubmitWorkService.work.visualDesign.colors
    vm.work.font = SubmitWorkService.work.visualDesign.font
    vm.work.url = null


  activate = ->
    destroyWorkListener = $rootScope.$on "SubmitWorkService.work:changed", ->
      onChange()

    $scope.$on '$destroy', ->
      destroyWorkListener()

    SubmitWorkService.fetch(vm.workId)
    configureUploader()

    vm

  activate()

SubmitWorkVisualController.$inject = ['$scope', '$rootScope', '$state', 'SubmitWorkService', 'Optimist', 'API_URL']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkVisualController', SubmitWorkVisualController