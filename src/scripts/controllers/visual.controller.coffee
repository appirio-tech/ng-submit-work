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

  vm.visualDesign =
    fonts: [
      name: 'Serif'
      description: 'a small line attached to the end of a stroke'
      selected : false
    ,
      name: 'Sans Serif'
      description: 'does not have the small `serifs`'
      selected: false
    ,
      name: 'Slap Serif'
      description: 'does not have the small `serifs`'
      selected: false
    ,
      name: 'Script'
      description: 'does not have the small `serifs`'
      selected: false
    ,
      name: 'Grunge'
      description: 'does not have the small `serifs`'
      selected: false
    ] ,

    colors: [
      name: 'Palette 1'
      description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      selected: false
    ,
      name: 'Palette 2'
      description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      selected: false
    ,
      name: 'Palette 3'
      description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      selected: false
    ,
      name: 'Palette 4'
      description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      selected: false
    ,
      name: 'Palette 5'
      description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      selected: false
    ] ,

    icons: [
      name: 'Google'
      description: 'Lorem ipsum dolor sit amet'
      selected: false
    ,
      name: 'Anamorphic'
      description: 'Lorem ipsum dolor sit amet'
      selected: false
    ,
      name: 'iOS Style'
      description: 'Lorem ipsum dolor sit amet'
      selected: false
    ,
      name: 'Android'
      description: 'Lorem ipsum dolor sit amet'
      selected: false
    ,
      name: 'Windows 8'
      description: 'Lorem ipsum dolor sit amet'
      selected: false
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

    vm.visualDesign.fonts.forEach (font) ->
      if font.selected
        workFonts.push
          name: font.name
          description: font.description

    vm.visualDesign.colors.forEach (color) ->
      if color.selected
        workColors.push
          name: color.name
          description: color.description

    vm.visualDesign.icons.forEach (icon) ->
      if icon.selected
        workIcons.push
          name: icon.name
          description: icon.description

    if workFonts.length && workColors.length && workIcons.length
      # TODO: replace with proper status
      vm.work.status = 'visualsAdded'
      vm.save (response) ->
        # TODO: navigate to "development" view

  mockify = (work) ->
    work.visualDesign =
      fonts: []
      colors: []
      icons: []

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