'use strict'

FeaturesController = ($scope, SubmitWorkAPIService) ->
  vm      = this
  vm.work =
    name       : null
    requestType: null
    summary    : null
    features   : []

  vm.loading          = true
  vm.showSuccessModal = false
  vm.workId           = $scope.workId

  vm.toggleType = (type) ->
    if vm.work.requestType != null && vm.work.requestType != type && vm.work.requestType != 'Both'
      vm.work.requestType = 'Both'
    else if vm.work.requestType == null
      vm.work.requestType = type
    else if vm.work.requestType == type
      vm.work.requestType = null
    else if vm.work.requestType == 'Both'
      if type == 'Design'
        vm.work.requestType = 'Code'
      else
        vm.work.requestType = 'Design'

  vm.save = (onSuccess) ->
    if vm.workId
      params =
        id: vm.workId

      resource = SubmitWorkAPIService.put params, vm.work
      resource.$promise.then (response) ->
        onSuccess? response
      resource.$promise.catch (response) ->
        # TODO: add error handling

     else
      resource = SubmitWorkAPIService.post vm.work
      resource.$promise.then (response) ->
        onSuccess? response
      resource.$promise.catch (response) ->

  vm.createProject = ->
    if vm.work.name && vm.work.requestType && vm.work.summary
      vm.work.status = 'Submitted'
      vm.save (response) ->
        vm.showSuccessModal = true

  activate = ->

    if vm.workId
      params =
        id      : vm.workId

      resource = SubmitWorkAPIService.get params

      resource.$promise.then (response) ->
        vm.work = response

       resource.$promise.catch (response) ->
         # TODO: add error handling

       resource.$promise.finally ->
         vm.loading = false

    vm

  activate()

FeaturesController.$inject = ['$scope', 'SubmitWorkAPIService']

angular.module('appirio-tech-ng-submit-work').controller 'FeaturesController', FeaturesController