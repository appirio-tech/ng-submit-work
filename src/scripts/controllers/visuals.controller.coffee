'use strict'

VisualsController = ($scope) ->
  vm = this
  vm.work =
    name       : null
    requestType: null
    summary    : null
    features   : []
    featuresDetails : null
    visualDesign : {}

  vm.loading = true
  vm.workId = $scope.workId

  vm.selectFont = (font) ->
    vm.work.visualDesign.font = font

  mockify = (work)->
    work.visualDesign =
      font: false
      color: false
      icon: false

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

    vm

  activate()

VisualsController.$inject = ['$scope']

angular.module('appirio-tech-ng-submit-work').controller 'VisualsController', VisualsController