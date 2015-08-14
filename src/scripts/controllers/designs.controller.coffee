'use strict'

controller = ($scope, $state, NavService, API_URL) ->
  vm                          = this
  vm.designsUploaderUploading = null
  vm.designsUploaderHasErrors = null

  configureUploader = () ->
    assetType = 'specs'

    queryUrl = API_URL + '/work-files/assets?filter=workId%3D' + $scope.workId + '%26assetType%3D' + assetType

    vm.designsUploaderConfig =
      name         : 'designsUploader' + $scope.workId
      allowMultiple: true
      queryUrl     : queryUrl
      urlPresigner : API_URL + '/work-files/uploadurl'
      fileEndpoint : API_URL + '/work-files/:fileId'
      saveParams:
        workId   : $scope.workId
        assetType: assetType

  vm.submit = ->
    if !vm.designsUploaderUploading && !vm.designsUploaderHasErrors
      $scope.save()
      NavService.setNextState 'designs'

  activate = ->
    # Configure uploader initially so the view can render
    configureUploader()

    # Update the uploader configuration once we have a work id
    $scope.$watch 'workId', (newValue) ->
      configureUploader()

    $scope.$watch 'vm.designsUploaderUploading', (newValue) ->
      NavService.findState('designs').uploading = newValue

    $scope.$watch 'vm.designsUploaderHasErrors', (newValue) ->
      NavService.findState('designs').hasErrors = newValue

    $scope.$watch 'designForm', (designForm) ->
      NavService.findState('designs').form = designForm if designForm

    vm

  activate()

controller.$inject = ['$scope', '$state', 'NavService', 'API_URL']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkDesignsController', controller


