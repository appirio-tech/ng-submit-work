'use strict'

SubmitWorkTypeController = ($scope, $rootScope, $state, Optimist, SubmitWorkService) ->
  vm                  = this
  vm.loading          = true
  vm.showSuccessModal = false
  vm.workId           = $scope.workId

  config =
    name: null

  config.requestTypes = [
    name: 'Design'
    id: '1235'
    selected: false
  ,
    name: 'Design & Development'
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

  vm.saveEmail = ->
    email = vm.work.email
    update =
      email: email

    if email
      SubmitWorkService.save(update).then ->
        $state.go 'submit-work-features'

  typeValid = ->
    updates = getUpdates()
    isValid = true
    for type, value of updates
      if Array.isArray value
        isValid = false unless value.length
      else
        isValid = value

    isValid

  getUpdates = ->
    updates =
      requestType: vm.work.requestType
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
      SubmitWorkService.work.email = null
      SubmitWorkService.work.devices = [id:'1234']
      SubmitWorkService.work.orientations = [id:'1235']
      SubmitWorkService.work.operatingSystems = [id:'1235']

      vm.work =
        name: SubmitWorkService.work.name
        requestType: SubmitWorkService.work.requestType
        summary    : SubmitWorkService.work.summary
        email: SubmitWorkService.work.email
        devices: SubmitWorkService.work.devices
        orientations: SubmitWorkService.work.orientations
        operatingSystems: SubmitWorkService.work.operatingSystems
    else
      vm.work =
        name: null
        requestType: null
        summary    : null
        email: null
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

SubmitWorkTypeController.$inject = ['$scope', '$rootScope', '$state', 'Optimist', 'SubmitWorkService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkTypeController', SubmitWorkTypeController