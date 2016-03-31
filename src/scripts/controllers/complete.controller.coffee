'use strict'

SubmitWorkCompleteController = ($scope, $rootScope, $state, SubmitWorkService) ->
  vm = this
  vm.show = true
  vm.workId = $scope.workId
  vm.appName = $rootScope.currentAppName

  onChange = ->
    work = SubmitWorkService.get()
    vm.isUpsell = true

  activate = ->
    $scope.$watch 'vm.show', (newValue) ->
      $state.go 'view-work-multiple' if newValue == false

    destroyWorkListener = $rootScope.$on "SubmitWorkService.work:changed", ->
      onChange()

    $scope.$on '$destroy', ->
      destroyWorkListener()

    SubmitWorkService.fetch(vm.workId)

    vm

  activate()

SubmitWorkCompleteController.$inject = ['$scope', '$rootScope', '$state', 'SubmitWorkService']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkCompleteController', SubmitWorkCompleteController