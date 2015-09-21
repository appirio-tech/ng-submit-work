'use strict'
mockWork = {}
srv = ($rootScope, Optimist, SubmitWorkAPIService) ->
  # Used for caching
  currentWorkId = null

  submitWorkService =
    work: {}

  emitUpdates = ->
    $rootScope.$emit 'SubmitWorkService.work:changed'

  submitWorkService.fetch = (workId) ->
    if workId != currentWorkId
      submitWorkService.work = {}
      currentWorkId = workId

    params =
      id: currentWorkId
    apiCall = () ->
      SubmitWorkAPIService.get(params).$promise

    Optimist.fetchOne
      model: submitWorkService.work
      apiCall: apiCall
      updateCallback: emitUpdates

  submitWorkService.save = (updates) ->
    apiCall = (model) ->
      params =
        id: currentWorkId

      SubmitWorkAPIService.put(params, model).$promise

    Optimist.update
      model: submitWorkService.work
      updates: updates
      apiCall: apiCall
      updateCallback: emitUpdates


  submitWorkService

srv.$inject = ['$rootScope', 'Optimist', 'SubmitWorkAPIService']

angular.module('appirio-tech-ng-submit-work').factory 'SubmitWorkService', srv