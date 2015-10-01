'use strict'

SubmitWorkTypeController = ($scope, $rootScope, $state, SubmitWorkService, RequirementService) ->
  vm                  = this
  vm.loading          = false
  vm.showSuccessModal = false

  # TODO: move route directing out of here
  if $scope.workId
    localStorageKey = "recentSubmitWorkSection-#{$scope.workId}"
    recent = localStorage[localStorageKey] || 'features'

    # $state.go "submit-work-#{recent}", { id: $scope.workId }

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
        $rootScope.submitWorkAppName = updates.name
        $state.go("submit-work-features")


  isValid = (updates) ->
    valid = true

    unless updates.projectType == 'DESIGN' || updates.projectType == 'DESIGN_AND_CODE'
      valid = false

    unless updates.name.length > 0
      valid = false

    unless updates.brief.length > 0
      valid = false

    unless updates.deviceIds.length > 0
      valid = false

    unless updates.orientationIds.length > 0
      valid = false

    valid

  getUpdates = ->
    isSelected = (item) ->
      item.selected

    getId = (item) ->
      item.id

    updates =
      projectType   : vm.projectType.trim()
      name          : vm.name.trim()
      brief         : vm.brief.trim()
      deviceIds     : vm.devices.filter(isSelected).map(getId)
      orientationIds: vm.orientations.filter(isSelected).map(getId)

  vm

SubmitWorkTypeController.$inject = ['$scope', '$rootScope', '$state', 'SubmitWorkService', 'RequirementService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkTypeController', SubmitWorkTypeController