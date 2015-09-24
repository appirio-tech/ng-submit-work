'use strict'

SubmitWorkVisualController = ($scope, $rootScope, $state, SubmitWorkService, Optimist, API_URL, RequirementService) ->
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
    updates = getUpdates()

    SubmitWorkService.save(updates).then ->
      $state.go("submit-work-development")

  getUpdates = ->
    isSelected = (item) ->
      item.selected

    getId = (item) ->
      item.id

    updates =
      fontIds:  if vm.font then [ vm.font ] else null
      colorSwatchIds: vm.colors.filter(isSelected).map(getId)
      iconsetIds:  if vm.icon then [ vm.icon ] else null
      designUrls: if vm.url then [ vm.url ] else null

    updates

  vm.navigateDevelopment = ->
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
    work = SubmitWorkService.get()

    if work.o.pending
      vm.loading = true
      return false

    vm.loading = false
    vm.font    = vm.font || work.fontIds?[0]
    vm.icon    = vm.icon || work.iconsetIds?[0]
    vm.url     = vm.url || work.urlIds?[0]

    vm.fonts   = angular.copy RequirementService.fonts
    vm.colors  = angular.copy RequirementService.colors
    vm.icons   = angular.copy RequirementService.icons

    vm.colors.forEach (color) ->
      if work.colorSwatchIds?.indexOf(color.id) >= 0
        color.selected = true

  activate = ->
    destroyWorkListener = $rootScope.$on "SubmitWorkService.work:changed", ->
      onChange()

    $scope.$on '$destroy', ->
      destroyWorkListener()

    SubmitWorkService.fetch(vm.workId)
    configureUploader()

    vm

  activate()

SubmitWorkVisualController.$inject = ['$scope', '$rootScope', '$state', 'SubmitWorkService', 'Optimist', 'API_URL', 'RequirementService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkVisualController', SubmitWorkVisualController