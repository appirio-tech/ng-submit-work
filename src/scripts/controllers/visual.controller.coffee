'use strict'

SubmitWorkVisualController = ($scope, SubmitWorkAPIService) ->
  vm      = this
  vm.loading = true
  vm.workId = $scope.workId

  vm.work =
    name       : null
    requestType: null
    summary    : null
    features   : []
    featuresDetails : null

  vm.visualDesign = {}
  vm.visualDesign.fonts = [
      name: 'Serif'
      description: 'a small line attached to the end of a stroke'
      id: '1234'
    ,
      name: 'Sans Serif'
      description: 'does not have the small `serifs`'
      id: '1235'
    ,
      name: 'Slap Serif'
      description: 'does not have the small `serifs`'
      id: '1236'
    ,
      name: 'Script'
      description: 'does not have the small `serifs`'
      id: '1237'
    ,
      name: 'Grunge'
      description: 'does not have the small `serifs`'
      id: '1238'
  ]

  vm.visualDesign.colors = [
      name: 'Palette 1'
      description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      id: '1234'
    ,
      name: 'Palette 2'
      description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      id: '1235'
    ,
      name: 'Palette 3'
      description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      id: '1236'
    ,
      name: 'Palette 4'
      description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      id: '1237'
    ,
      name: 'Palette 5'
      description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      id: '1238'
  ]

  vm.visualDesign.icons = [
      name: 'Google'
      description: 'Lorem ipsum dolor sit amet'
      id: '1234'
    ,
      name: 'Anamorphic'
      description: 'Lorem ipsum dolor sit amet'
      id: '1235'
    ,
      name: 'iOS Style'
      description: 'Lorem ipsum dolor sit amet'
      id: '1236'
    ,
      name: 'Android'
      description: 'Lorem ipsum dolor sit amet'
      id: '1237'
    ,
      name: 'Windows 8'
      description: 'Lorem ipsum dolor sit amet'
      id: '1238'
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

  vm.submitVisuals = ->
    workFonts = vm.work.visualDesign.fonts
    workColors = vm.work.visualDesign.colors
    workIcons = vm.work.visualDesign.icons

    if workFonts.length && workColors.length && workIcons.length
      # TODO: replace with proper status
      vm.work.status = 'visualsAdded'
      vm.save (response) ->
        # TODO: navigate to "development" view

  mockify = (work) ->
    work.visualDesign = {}
    work.visualDesign.fonts = []
    work.visualDesign.colors = []
    work.visualDesign.icons = []

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

SubmitWorkVisualController.$inject = ['$scope', 'SubmitWorkAPIService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkVisualController', SubmitWorkVisualController