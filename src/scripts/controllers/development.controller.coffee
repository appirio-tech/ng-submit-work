'use strict'

SubmitWorkDevelopmentController = ($scope, $rootScope, $state, SubmitWorkService, SubmitWorkUploaderService) ->
  if $scope.workId
    localStorageKey               = "recentSubmitWorkSection-#{$scope.workId}"
    localStorage[localStorageKey] = 'development'

  vm                   = this
  vm.loading           = true
  vm.workId            = $scope.workId
  vm.showUploadModal   = false
  vm.showSpecsModal    = false
  vm.uploaderUploading = false
  vm.uploaderHasErrors = false
  vm.projectType       = null

  vm.securityLevels =
    none: 'none'
    minimal: 'minimal'
    complete: 'complete'

  vm.showUpload = ->
    vm.showUploadModal = true

  vm.showSpecs = ->
    vm.showSpecsModal = true

  vm.save = (kickoff) ->
    uploaderValid = !vm.uploaderUploading && !vm.uploaderHasErrors
    updates = vm.work

    for name, prop of updates
      unless prop
        prop = null

    if uploaderValid
      updates.status = if kickoff then 'Submitted' else 'Incomplete'

      SubmitWorkService.save(updates).then ->
        $state.go 'submit-work-complete', { id: vm.workId }

  configureUploader = ->
    vm.uploaderConfig = SubmitWorkUploaderService.generateConfig vm.workId, 'development'

  onChange = ->
    work = SubmitWorkService.get()

    if work.o.pending
      vm.loading = true
      return false

    vm.loading = false

    vm.work =
      offlineAccess: work.offlineAccess
      usesPersonalInformation: work.usesPersonalInformation
      securityLevel: work.securityLevel
      numberOfApiIntegrations: work.numberOfApiIntegrations

    $rootScope.currentAppName = work.name
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