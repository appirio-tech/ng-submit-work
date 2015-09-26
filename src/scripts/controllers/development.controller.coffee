'use strict'

SubmitWorkDevelopmentController = ($scope, $rootScope, SubmitWorkService, API_URL) ->
  vm                              = this
  vm.loading                      = true
  vm.workId                       = $scope.workId
  vm.showUploadModal              = false
  vm.showSpecsModal               = false
  vm.uploaderUploading = false
  vm.uploaderHasErrors = false

  vm.securityLevels =
    none: 'none'
    minimal: 'minimal'
    complete: 'complete'

  vm.showUpload = ->
    vm.showUploadModal = true

  vm.showSpecs = ->
    vm.showSpecsModal = true

  vm.save = ->
    uploaderValid = !vm.uploaderUploading && !vm.uploaderHasErrors
    updates = vm.work

    for name, prop of updates
      unless prop
        prop = null

    if uploaderValid
      updates.status = 'SUBMITTED'
      SubmitWorkService.save(updates).then ->
        $state.go('view-work-multiple')

  configureUploader = ->
    domain = API_URL
    workId = vm.workId
    category = 'work'
    assetType = 'specs'

    vm.uploaderConfig =
      name: 'uploader' + vm.workId
      allowMultiple: true
      query:
        url: domain + '/v3/work-files/assets'
        params:
          filter: 'id=' + workId + '&assetType=' + assetType + '&category=' + category
      presign:
        url: domain + '/v3/work-files/uploadurl'
        params:
          id: workId
          assetType: assetType
          category: category
      createRecord:
        url: domain + '/v3/work-files'
        params:
          id: workId
          assetType: assetType
          category: category
      removeRecord:
        url: domain + '/v3/work-files/:fileId'
        params:
          filter: 'category=' + category


  onChange = ->
    work = SubmitWorkService.get()

    if work.o.pending
      vm.loading = true
      return false

    vm.loading = false

    vm.work = {}
    vm.work.offlineAccess = work.offlineAccess
    vm.work.usesPersonalInformation = work.usesPersonalInformation
    vm.work.securityLevel = work.securityLevel
    vm.work.numberOfApiIntegrations = work.numberOfApiIntegrations

  activate = ->
    destroyWorkListener = $rootScope.$on "SubmitWorkService.work:changed", ->
      onChange()

    $scope.$on '$destroy', ->
      destroyWorkListener()

    SubmitWorkService.fetch(vm.workId)
    configureUploader()

  activate()

  vm

SubmitWorkDevelopmentController.$inject = ['$scope', '$rootScope', 'SubmitWorkService', 'API_URL']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkDevelopmentController', SubmitWorkDevelopmentController