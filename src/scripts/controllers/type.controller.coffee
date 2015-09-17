'use strict'

SubmitWorkTypeController = ($scope, $rootScope, Optimist, SubmitWorkService) ->
  vm                  = this
  vm.loading          = true
  vm.showSuccessModal = false
  vm.workId           = $scope.workId

  config =
    name: null

  config.requestTypes = [
    design: 'Design'
    id: '1235'
    selected: false
  ,
    designDevelopment: 'Development'
    id: '1234'
    selected: false
  ]

  config.devices = [
    name: 'iPhone5c'
    id: '1234'
    selected: false
  ,
    name: 'iPhone5s'
    id: '1235'
    selected: false
  ]

  config.orientations = [
    name: 'Landscape'
    id: '1234'
    selected: false
  ,
    name: 'Portrait'
    id: '1235'
    selected: false
  ]

  config.operatingSystems = [
    name: 'iOS7'
    id: '1234'
    selected: false
  ,
    name: 'iOS8'
    id: '1235'
    selected: false
  ]

  vm.save = ->
    workValid = typeValid()
    updates = getUpdates()
    if workValid
      SubmitWorkService.save(updates).then ->
        vm.showSuccessModal = true

  typeValid = ->
    updates = getUpdates()
    isValid = true
    for type, value of updates
      isValid = false unless value.length

    isValid

  getUpdates = ->
    updates =
      requestType:     vm.work.requestType
      name: vm.work.name
      summary: vm.work.summary
      devices:          []
      orientations:     []
      operatingSystems: []

    vm.type.devices.forEach (device) ->
     if device.selected
       updates.devices.push
        id: device.id

    vm.type.orientations.forEach (orientation) ->
      if orientation.selected
       updates.orientations.push
        id: orientation.id

    vm.type.operatingSystems.forEach (operatingSystem) ->
      if operatingSystem.selected
       updates.operatingSystems.push
        id: operatingSystem.id

    updates

  onChange = ->
    if SubmitWorkService.work
      # TODO: remove mock data
      SubmitWorkService.work.devices = [id:'1234']
      SubmitWorkService.work.orientations = [id:'1235']
      SubmitWorkService.work.operatingSystems = [id:'1235']

      vm.work =
        name: SubmitWorkService.work.name
        requestType: SubmitWorkService.work.requestType
        summary    : SubmitWorkService.work.summary
        devices: []
        orientations: []
        operatingSystems: []
    else
      vm.work =
        name: null
        requestType: null
        summary    : null
        devices: []
        orientations: []
        operatingSystems: []

    vm.loading = false

    unless vm.type
      vm.type = config
      # set already selected choices to selected on vm
      vm.work.devices.forEach (device) ->
        vm.type.devices.forEach (vmDevice) ->
          if device.id == vmDevice.id
            vmDevice.selected = true

      vm.work.orientations.forEach (orientation) ->
        vm.type.orientations.forEach (vmOrientation) ->
          if orientation.id == vmOrientation.id
            vmOrientation.selected = true

      vm.work.operatingSystems.forEach (os) ->
        vm.type.operatingSystems.forEach (vmOs) ->
          if os.id == vmOs.id
            vmOs.selected = true

    updates = getUpdates()

  activate = ->
    destroyWorkListener = $rootScope.$on "SubmitWorkService.work:changed", ->
      onChange()

    $scope.$on '$destroy', ->
      destroyWorkListener()

    if vm.workId
      SubmitWorkService.fetch(vm.workId)
    else
      onChange()

    vm

  activate()

SubmitWorkTypeController.$inject = ['$scope', '$rootScope', 'Optimist', 'SubmitWorkService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkTypeController', SubmitWorkTypeController