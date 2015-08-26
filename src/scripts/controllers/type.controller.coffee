'use strict'

TypeController = ($scope, WorkAPIService) ->
  vm = this
  vm.work = null
  vm.loading = true
  vm.workId = $scope.workId

  activate = ->
    # vm.work = {};

    params =
      id      : vm.workId

    resource = WorkAPIService.get params

    resource.$promise.then (response) ->
      vm.work = response.result.content
      console.log('work', vm.work)

     resource.$promise.catch (response) ->
       # TODO: add error handling

     resource.$promise.finally ->
       vm.loading = false

    vm

  activate()

TypeController.$inject = ['$scope', 'WorkAPIService']

angular.module('appirio-tech-submissions').controller 'TypeController', TypeController