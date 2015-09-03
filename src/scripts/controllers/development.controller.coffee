'use strict'

SubmitWorkDevelopmentController = ($scope, SubmitWorkAPIService) ->
  vm      = this
  vm.loading = true
  vm.workId = $scope.workId

  vm.work =
    name       : null
    requestType: null
    summary    : null
    features   : []
    featuresDetails : null
    visualDesign: {}

  vm.securityLevels =
    none: 'none'
    minimal: 'minimal'
    complete: 'complete'

  vm.appPurposes =
    enterprise: 'enterprise'
    appStore: 'appStore'

  vm.thirdPartyIntegrations = [
    name: 'Google'
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elite'
    id: '1234'
  ,
    name: 'Yahoo'
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elite'
    id: '1235'
  ,
    name: 'Paypal'
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elite'
    id: '1236'
  ]

  vm.save = (onSuccess) ->
    if vm.workId
      params =
        id: vm.workId

      resource = SubmitWorkAPIService.put params, vm.work
      resource.$promise.then (response) ->
        onSuccess? response
      resource.$promise.catch (response) ->
        # TODO: add error handling

  vm.submitDevelopment = ->
    # TODO: replace with proper status
    vm.work.status = 'developmentAdded'
    vm.save (response) ->
      # TODO: navigate to "development" view

  mockify = (work) ->
    work.development =
      appPurpose: null
      offlineAccess:
        required: null
        comments: null
      hasPersonalInformation: null
      securityLevel: null
      thirdPartyIntegrations : []

  activate = ->
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

SubmitWorkDevelopmentController.$inject = ['$scope', 'SubmitWorkAPIService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkDevelopmentController', SubmitWorkDevelopmentController