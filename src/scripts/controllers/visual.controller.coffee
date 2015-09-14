'use strict'

SubmitWorkVisualController = ($scope, $state, SubmitWorkAPIService, API_URL) ->
  vm      = this
  vm.workId = $scope.workId
  vm.loading = true
  vm.visualsUploaderUploading = null
  vm.visualsUploaderHasErrors = null
  vm.showPaths = true
  vm.showChooseStylesModal = false
  vm.showUploadStylesModal = false
  vm.showUrlStylesModal = false
  vm.activeStyleModal = null
  vm.nextButtonDisabled = false
  vm.backButtonDisabled = false
  vm.styleModals = ['fonts', 'colors', 'icons']

  vm.work =
    name       : null
    requestType: null
    summary    : null
    features   : []
    featuresDetails : null

  vm.visualDesign = {}
  vm.visualDesign.fonts =
    serif: 'serif',
    sansSerif: 'sans serif'

  vm.visualDesign.colors = [
    name: 'Palette 1'
    description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    id: '1234'
  ,
    name: 'Palette 2'
    description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    id: '1235'
  ,
    name: 'Palette 3'
    description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    id: '1236'
  ,
    name: 'Palette 4'
    description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    id: '1237'
  ]

  vm.visualDesign.icons = [
    name: 'Flat Colors'
    description: 'Lorem ipsum dolor sit amet'
    id: '1234'
  ,
    name: 'Thin Line'
    description: 'Lorem ipsum dolor sit amet'
    id: '1235'
  ,
    name: 'Solid Line'
    description: 'Lorem ipsum dolor sit amet'
    id: '1236'
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

  vm.save = (onSuccess) ->
    if vm.workId
      params =
        id: vm.workId

      resource = SubmitWorkAPIService.put params, vm.work
      resource.$promise.then (response) ->
        onSuccess? response
      resource.$promise.catch (response) ->
        # TODO: add error handling

  vm.submitVisuals = ->
    fontValid = vm.work.visualDesign.font
    # TODO: Add colors functionality
    iconsValid = vm.work.visualDesign.icons.length
    uploaderValid = !vm.visualsUploaderUploading && !vm.visualsUploaderHasErrors
    chooseStylesValid = fontValid && iconsValid && uploaderValid
    urlValid = vm.work.visualDesign.url

    if chooseStylesValid || urlValid
      # TODO: replace with proper status
      vm.work.status = 'visualsAdded'
      vm.save (response) ->
        $state.go("submit-work-development")

  vm.navigateDevelopment = ->
    uploaderValid = !vm.visualsUploaderUploading && !vm.visualsUploaderHasErrors
    chooseStylesValid = vm.work.visualDesign.icons.length && vm.work.visualDesign.font
    urlValid = vm.work.visualDesign.url
    if chooseStylesValid || urlValid
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

  mockify = (work) ->
    work.visualDesign = {}
    work.visualDesign.url = null
    work.visualDesign.font = null
    work.visualDesign.colors = []
    work.visualDesign.icons = []

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

  activate = ->
    configureUploader()
    if vm.workId
      params =
        id: vm.workId

      resource = SubmitWorkAPIService.get params

      resource.$promise.then (response) ->
        vm.work = response
        #TODO: remove once all properties are in payload
        mockify vm.work

       resource.$promise.catch (response) ->
         # TODO: add error handling

       resource.$promise.finally ->
         vm.loading = false
    else
      vm.loading = false

    vm

  activate()

SubmitWorkVisualController.$inject = ['$scope', '$state', 'SubmitWorkAPIService', 'API_URL']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkVisualController', SubmitWorkVisualController