'use strict'

SubmitWorkTypeController = ($scope, $rootScope, $state, SubmitWorkService, RequirementService) ->

  vm                  = this
  vm.loading          = false
  vm.showSuccessModal = false

  vm.name         = ""
  vm.devices      = angular.copy RequirementService.devices
  vm.orientations = angular.copy RequirementService.orientations
  vm.projectTypes = angular.copy RequirementService.projectTypes
  vm.brief        = ""

  vm.create = ->
    updates = getUpdates()

    if isValid(updates)
      vm.loading = true
      SubmitWorkService.create(updates).then ->
        $state.go("submit-work-features")


  isValid = (updates) ->
    updates = getUpdates()
    valid   = true

    for type, value of updates
      if Array.isArray value
        valid = false unless value.length
      else
        valid = value

    valid

  getUpdates = ->
    isSelected = (item) ->
      item.selected

    getId = (item) ->
      item.id

    updates =
      projectType   : vm.projectType
      name          : vm.name
      brief         : vm.brief
      deviceIds     : vm.devices.filter(isSelected).map(getId)
      orientationIds: vm.orientations.filter(isSelected).map(getId)

  vm

SubmitWorkTypeController.$inject = ['$scope', '$rootScope', '$state', 'SubmitWorkService', 'RequirementService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkTypeController', SubmitWorkTypeController