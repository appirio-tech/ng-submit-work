'use strict'

controller = ($scope, $state, SubmitWorkService, NavService, API_URL) ->
  vm                        = this
  vm.briefFilename          = null
  vm.question               = null
  vm.showYesNo              = true
  vm.showBrief              = false
  vm.showElevator           = false
  vm.briefUploaderUploading = null
  vm.briefUploaderHasErrors = null

  configureUploader = ->
    assetType = 'brief'
    queryUrl  = API_URL + '/work-files/assets?filter=workId%3D' + $scope.workId + '%26assetType%3D' + assetType

    vm.briefUploaderConfig =
      name         : 'briefUploader' + $scope.workId
      allowMultiple: false
      queryUrl     : queryUrl
      urlPresigner : API_URL + '/work-files/uploadurl'
      fileEndpoint : API_URL + '/work-files/:fileId'
      saveParams:
        workId   : $scope.workId
        assetType: assetType

  vm.toggleYes = ->
    vm.showYesNo    = false
    vm.showBrief    = true
    vm.showElevator = false
    NavService.findState('brief').form = $scope.briefForm

  vm.toggleNo = ->
    vm.showYesNo    = false
    vm.showBrief    = false
    vm.showElevator = true
    NavService.findState('brief').form = $scope.elevatorForm

  vm.toggleCancel = ->
    vm.question     = null
    vm.showYesNo    = true
    vm.showBrief    = false
    vm.showElevator = false
    NavService.findState('brief').form = $scope.questionForm

  vm.submitElevator = ->
    NavService.setNextState('brief') if $scope.elevatorForm.$valid

  vm.submitBrief = ->
    if !vm.briefUploaderUploading && !vm.briefUploaderHasErrors
      NavService.setNextState 'brief'

  vm.questionSubmit = ->
    vm.toggleYes() if vm.question == 1
    vm.toggleNo() if vm.question == 0


  activate = ->
    # Configure uploader initially so the view can render
    configureUploader()

    # Update the uploader configuration once we have a work id
    $scope.$watch 'workId', ->
      configureUploader()

    $scope.$watch 'vm.briefUploaderUploading', (newValue) ->
      NavService.findState('brief').uploading = newValue

    $scope.$watch 'vm.briefUploaderHasErrors', (newValue) ->
      NavService.findState('brief').hasErrors = newValue

    $scope.$watch 'questionForm', (questionForm) ->
      NavService.findState('brief').form = $scope.questionForm if questionForm

    vm.toggleNo() if $scope.summary?.length

  activate()

controller.$inject = ['$scope', '$state', 'SubmitWorkService', 'NavService', 'API_URL']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkBriefController', controller

