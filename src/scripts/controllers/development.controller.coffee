'use strict'

SubmitWorkDevelopmentController = ($scope, $rootScope, SubmitWorkService, API_URL) ->
  vm                              = this
  vm.loading                      = true
  vm.workId                       = $scope.workId
  vm.showUploadModal              = false
  vm.showSpecsModal               = false
  vm.developmentUploaderUploading = false
  vm.developmentUploaderHasErrors = false

  vm.securityLevels =
    none: 'none'
    minimal: 'minimal'
    complete: 'complete'

  vm.showUpload = ->
    vm.showUploadModal = true

  vm.showSpecs = ->
    vm.showSpecsModal = true

  vm.save = ->
    developmentValid = workValid vm.work
    uploaderValid = !vm.developmentUploaderUploading && !vm.developmentUploaderHasErrors
    updates = vm.work

    if developmentValid && uploaderValid
      SubmitWorkService.save(updates)

  workValid = (work) ->
    isValid = true
    for property, value of work
      if value == null
        isValid = false
    isValid

  configureUploader = ->
    domain = 'https://api.topcoder.com'
    workId = vm.workId
    category = 'work'
    assetType = 'specs'

    vm.developmentUploaderConfig =
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
    if SubmitWorkService.work.o.hasPending
      return false

    vm.loading = false

    # TODO: Remove mock data once development is in payload
    SubmitWorkService.work.offlineAccessRequired = false
    SubmitWorkService.work.hasPersonalInformation = true
    SubmitWorkService.work.securityLevel = 'minimal'
    SubmitWorkService.work.thirdPartyIntegrations = null

    vm.work = {}
    vm.work.offlineAccessRequired = SubmitWorkService.work.offlineAccessRequired
    vm.work.hasPersonalInformation = SubmitWorkService.work.hasPersonalInformation
    vm.work.securityLevel = SubmitWorkService.work.securityLevel
    vm.work.thirdPartyIntegrations = SubmitWorkService.work.thirdPartyIntegrations



  activate = ->
    destroyWorkListener = $rootScope.$on "SubmitWorkService.work:changed", ->
      onChange()

    $scope.$on '$destroy', ->
      destroyWorkListener()

    SubmitWorkService.fetch(vm.workId)
    configureUploader()
    # TODO: remove once work is fetched
    onChange()

    vm

  activate()

SubmitWorkDevelopmentController.$inject = ['$scope', '$rootScope', 'SubmitWorkService', 'API_URL']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkDevelopmentController', SubmitWorkDevelopmentController