'use strict'

SubmitWorkDevelopmentController = ($scope, $rootScope, $state, SubmitWorkService, SubmitWorkUploaderService) ->
  if $scope.workId
    localStorageKey               = "recentSubmitWorkSection-#{$scope.workId}"
    localStorage[localStorageKey] = 'development'

  vm                        = this
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
  vm.developmentModals      = ['offlineAccess', 'personalInformation', 'security', 'thirdPartyIntegrations']

  vm.securityLevels =
    none    : 'none'
    minimal : 'minimal'
    complete: 'complete'

  vm.uploadSpecs = ->
    vm.showUploadSpecs = true

  vm.hideUploadSpecs = ->
    vm.showUploadSpecs = false

  vm.showDefineSpecs = ->
    vm.showDefineSpecsModal = true
    vm.activateModal('offlineAccess')

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

  vm.makeSelection = (model, value) ->
    vm.work[model] = value

  vm.save = (done = false, kickoff = false) ->
    uploaderValid = !vm.uploaderUploading && !vm.uploaderHasErrors
    updates = vm.work
    updates.status = if kickoff then 'SUBMITTED' else 'INCOMPLETE'

    for name, prop of updates
      unless prop
        prop = null

    SubmitWorkService.save(updates).then ->
      if done && kickoff && uploaderValid
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
      offlineAccess:           true
      usesPersonalInformation: true
      securityLevel:           true
      numberOfApiIntegrations: true

    for key, value of updates
      if specKeys[key] && value?
        someCompleted = true

    someCompleted

  configureUploader = ->
    vm.uploaderConfig = SubmitWorkUploaderService.generateConfig vm.workId, 'development'

  onChange = ->
    work = SubmitWorkService.get()

    if work._pending
      vm.loading = true
      return false

    vm.loading = false

    vm.work =
      offlineAccess: work.offlineAccess
      usesPersonalInformation: work.usesPersonalInformation
      securityLevel: work.securityLevel
      numberOfApiIntegrations: work.numberOfApiIntegrations

    vm.specsDefined = someSpecsSelected(vm.work)
    vm.projectType = work.projectType
    vm.section = 3
    vm.numberOfSections = 3

  activate = ->
    destroyWorkListener = $rootScope.$on "SubmitWorkService.work:changed", ->
      onChange()

    $scope.$on '$destroy', ->
      destroyWorkListener()

    SubmitWorkService.fetch(vm.workId)
    configureUploader()

  activate()

  vm

SubmitWorkDevelopmentController.$inject = ['$scope', '$rootScope', '$state', 'SubmitWorkService', 'SubmitWorkUploaderService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkDevelopmentController', SubmitWorkDevelopmentController