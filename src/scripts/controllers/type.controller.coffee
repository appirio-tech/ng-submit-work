'use strict'

SubmitWorkTypeController = ($scope, $document, SubmitWorkAPIService) ->
  vm      = this
  vm.work =
    name       : null
    requestType: null
    summary    : null
    features   : []

  vm.requestTypes =
    code: 'code'
    design: 'design'
  vm.loading          = true
  vm.showSuccessModal = false
  vm.workId           = $scope.workId

  isValid = ->
    vm.work.name && vm.work.requestTypes.length && vm.work.summary

  vm.save = (onSuccess) ->
    if isValid()
      if vm.workId
        params =
          id: vm.workId

        resource = SubmitWorkAPIService.put params, vm.work

        resource.$promise.then (response) ->
          onSuccess? response

        resource.$promise.catch (response) ->
      else
        vm.work.status = 'Submitted'
        resource       = SubmitWorkAPIService.post vm.work

        resource.$promise.then (response) ->
          vm.showSuccessModal = true

          onSuccess? response

        resource.$promise.catch (response) ->

        onSuccess? response

      resource.$promise.catch (response) ->

  vm.scrollToElement = (elementId) ->
    element = angular.element document.getElementById(elementId)
    $document.scrollToElementAnimated element

  mockify = (work) ->
    work.requestTypes = []
    work.devices =
      iPhone5c: false
      iPhone5s: false

    work.orientation =
      landscape: false
      portrait: false

    work.os =
      iOS7: false
      iOS8: false


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

SubmitWorkTypeController.$inject = ['$scope', '$document', 'SubmitWorkAPIService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkTypeController', SubmitWorkTypeController