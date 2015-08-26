'use strict'

TypeController = ($scope, WorkAPIService) ->
  vm = this
  vm.work = null
  vm.loading = true
  vm.workId = $scope.workId

  vm.toggleType = (type) ->
    if vm.work.requestType != null && vm.work.requestType != type && vm.work.requestType != 'Both'
      vm.work.requestType = 'Both'
    else if vm.work.requestType == null
      vm.work.requestType = type
    else if vm.work.requestType == type
      vm.work.requestType = null
    else if vm.work.requestType == 'Both'
      if type == 'Design'
        vm.work.requestType = 'Code'
      else
        vm.work.requestType = 'Design'

  vm.save = ->
    if vm.workId
      params =
        id: vm.workId

      resource = WorkAPIService.put params, vm.work
      resource.$promise.then (response) ->
        console.log('proj saved', response)
      resource.$promise.catch (response) ->
        # TODO: add error handling

     else
      resource = WorkAPIService.post vm.work
      resource.$promise.then (response) ->
        console.log('proj created', response)
      resource.$promise.catch (response) ->

  vm.createProject = ->
    if vm.work.name && vm.work.requestType && vm.work.summary
      vm.work.status = 'Submitted'
      vm.save()

  activate = ->

    params =
      id      : vm.workId

    resource = WorkAPIService.get params

    resource.$promise.then (response) ->
      console.log('res', response)
      vm.work = response

     resource.$promise.catch (response) ->
       # TODO: add error handling

     resource.$promise.finally ->
       vm.loading = false

    vm

  activate()

TypeController.$inject = ['$scope', 'WorkAPIService']

angular.module('appirio-tech-ng-submit-work').controller 'TypeController', TypeController