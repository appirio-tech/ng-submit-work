'use strict'

SubmitWorkDevelopmentSpecsController = ($scope, $rootScope, SubmitWorkService, API_URL) ->
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
    developmentValid = workValid vm.work.development
    uploaderValid = !vm.developmentUploaderUploading && !vm.developmentUploaderHasErrors
    updates = vm.work.development

    if developmentValid && uploaderValid
      SubmitWorkService.save(updates)

  workValid = (work) ->
    isValid = true
    for property, value of work
      if value == null
        isValid = false
    isValid

  configureUploader = ->
    assetType = 'specs'
    queryUrl = API_URL + '/v3/work-files/assets?filter=workId%3D' + vm.workId + '%26assetType%3D' + assetType
    vm.developmentUploaderConfig =
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

    # TODO: Remove mock data once development is in payload
    SubmitWorkService.work.development =
      offlineAccessRequired: null
      hasPersonalInformation: null
      securityLevel: null
      thirdPartyIntegrations : null

    vm.work = SubmitWorkService.work


  activate = ->
    destroyWorkListener = $rootScope.$on "SubmitWorkService.work:changed", ->
      onChange()

    $scope.$on '$destroy', ->
      destroyWorkListener()

    SubmitWorkService.fetch(vm.workId)
    configureUploader()

    vm

  activate()

SubmitWorkDevelopmentSpecsController.$inject = ['$scope', '$rootScope', 'SubmitWorkService', 'API_URL']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkDevelopmentSpecsController', SubmitWorkDevelopmentSpecsController