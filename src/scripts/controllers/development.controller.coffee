'use strict'

{ setFileUploader } = require 'appirio-tech-client-app-layer'

SubmitWorkDevelopmentController = ($scope, $rootScope, $state, SubmitWorkService) ->
  if $scope.workId
    localStorageKey               = "recentSubmitWorkSection-#{$scope.workId}"
    localStorage[localStorageKey] = 'development'

  vm                        = this
  vm.store                  = $scope.store
  vm.loading                = true
  vm.workId                 = $scope.workId
  vm.showUploadSpecs        = false
  vm.showDefineSpecsModal   = false
  vm.uploaderUploading      = false
  vm.uploaderHasErrors      = false
  vm.uploaderHasFiles       = false
  vm.specsDefined           = false
  vm.activeDevelopmentModal = null
  vm.projectType            = null
  vm.currentApiIntegration  = null
  permissions               = $scope.permissions || ['ALL']
  vm.readOnly               = permissions.indexOf('UPDATE') == -1 && permissions.indexOf('ALL') == -1
  vm.dragAndDrop            = true
  vm.developmentModals      = ['buildMethod', 'offlineAccess', 'personalInformation', 'security', 'thirdPartyIntegrations']

  vm.securityLevels =
    none    : 'none'
    minimal : 'minimal'
    complete: 'complete'

  vm.buildMethods =
    native: 'native'
    html5: 'html5'
    hybrid: 'hybrid'

  vm.uploadSpecs = ->
    vm.showUploadSpecs = true

  vm.hideUploadSpecs = ->
    unless vm.uploaderUploading
      vm.showUploadSpecs = false

  vm.showDefineSpecs = ->
    vm.showDefineSpecsModal = true
    vm.activateModal('buildMethod')

  vm.hideDefineSpecs = ->
    vm.showDefineSpecsModal = false

  vm.activateModal = (modal) ->
    vm.activeDevelopmentModal = modal
    updateButtons()

  vm.viewNext = ->
    currentIndex = vm.developmentModals.indexOf vm.activeDevelopmentModal
    isValid = currentIndex < vm.developmentModals.length - 1
    if isValid
      nextModal = vm.developmentModals[currentIndex + 1]
      vm.activateModal(nextModal)

  vm.viewPrevious = ->
    currentIndex = vm.developmentModals.indexOf vm.activeDevelopmentModal
    isValid = currentIndex > 0
    if isValid
      previousModal = vm.developmentModals[currentIndex - 1]
      vm.activateModal(previousModal)

  vm.toggleSelection = (model, value) ->
    if vm.work[model] == value
      vm.work[model] = null
    else
      vm.work[model] = value

  vm.addCurrentApiIntegration = ->
    if vm.currentApiIntegration
      vm.work.apiIntegrations.push vm.currentApiIntegration
      vm.currentApiIntegration = null

  vm.removeApiIntegration = (index) ->
    vm.work.apiIntegrations.splice(index, 1)

  vm.save = (done = false, kickoff = false, upsell=false) ->
    uploaderValid = !vm.uploaderUploading && !vm.uploaderHasErrors
    updates = vm.work

    if kickoff
      unless vm.isUpsell
        updates.status = 'SUBMITTED'
    else
      unless vm.isUpsell
        updates.status = 'INCOMPLETE'

    for name, prop of updates
      if Array.isArray prop
        prop = null unless prop.length > 0
      else
        prop = null unless prop

    SubmitWorkService.save(updates).then ->
      if done && kickoff && !upsell && uploaderValid
        $state.go 'submit-work-complete', { id: vm.workId }
      else if done && kickoff && upsell && uploaderValid
        SubmitWorkService.upsell().then ->
          $state.go 'submit-work-complete', { id: vm.workId }
      else if done
        $state.go 'view-work-multiple'
      else
        vm.hideDefineSpecs()

  updateButtons = ->
    currentIndex = vm.developmentModals.indexOf vm.activeDevelopmentModal
    isFirst = currentIndex == 0
    isLast = currentIndex == vm.developmentModals.length - 1
    if isFirst
      vm.nextButtonDisabled = false
      vm.backButtonDisabled = true
      vm.showFinishDevelopmentButton = false
    else if isLast
      vm.nextButtonDisabled = true
      vm.backButtonDisabled = false
      vm.showFinishDevelopmentButton = true
    else
      vm.backButtonDisabled = false
      vm.nextButtonDisabled = false
      vm.showFinishDevelopmentButton = false

  someSpecsSelected = (updates) ->
    someCompleted = false

    specKeys =
      buildMethod:             true
      offlineAccess:           true
      usesPersonalInformation: true
      securityLevel:           true
      apiIntegrations:         true

    for key, value of updates
      if Array.isArray value
        if specKeys[key] && value.length > 0
          someCompleted = true
      else
        if specKeys[key] && value?
          someCompleted = true

    someCompleted

  configureUploader = ->
    uploaderOptions =
      id            : vm.workId
      category      : 'work'
      assetType     : 'development'
      enableCaptions: false

    vm.store.dispatch setFileUploader uploaderOptions

  onChange = ->
    work = SubmitWorkService.get()

    if work._pending
      vm.loading = true
      return false

    vm.loading = false

    vm.work =
      buildMethod:             work.buildMethod
      offlineAccess:           work.offlineAccess
      usesPersonalInformation: work.usesPersonalInformation
      securityLevel:           work.securityLevel
      apiIntegrations:         work.apiIntegrations || []

    vm.specsDefined = someSpecsSelected(vm.work)
    vm.projectType = work.projectType
    vm.section = 3
    vm.numberOfSections = 3
    vm.isUpsell = (vm.projectType == 'DESIGN') && (work.status == 'COMPLETE')

  activate = ->
    $scope.$watch 'vm.showDefineSpecsModal', (newValue, oldValue) ->
      if oldValue && !newValue
        vm.save()

    $scope.$watch 'vm.showUploadSpecs', (newValue, oldValue) ->
      if oldValue && !newValue
        if vm.uploaderUploading
          vm.showUploadSpecs = true

    destroyWorkListener = $rootScope.$on "SubmitWorkService.work:changed", ->
      onChange()

    $scope.$on '$destroy', ->
      destroyWorkListener()

    SubmitWorkService.fetch(vm.workId)
    configureUploader()

  activate()

  vm

SubmitWorkDevelopmentController.$inject = ['$scope', '$rootScope', '$state', 'SubmitWorkService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkDevelopmentController', SubmitWorkDevelopmentController