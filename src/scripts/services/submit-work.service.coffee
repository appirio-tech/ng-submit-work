'use strict'

srv = ($rootScope, Optimist, SubmitWorkAPIService) ->

  service = {}
  work = {}
  # Used for caching
  currentWorkId = null

  workTemplate =
    modelType: 'app-project'
    id: null
    name: null
    projectType: null
    deviceIds: []
    orientationIds: []
    brief: null
    features: []
    fontIds: []
    colorSwatchIds: []
    iconsetIds: []
    designUrls: []
    offlineAccess: null
    offlineAccessComment: null
    usesPersonalInformation: null
    securityLevel: null
    numberOfApiIntegrations: null

  emitUpdates = ->
    $rootScope.$emit 'SubmitWorkService.work:changed'

  service.get = ->
    angular.copy work

  service.create = (updates) ->
    id   = null
    work = angular.copy workTemplate

    interceptResponse = (res) ->
      id = res.id

    apiCall = (model) ->
      SubmitWorkAPIService.post({}, model).$promise.then(interceptResponse)

    updateCallback = (model) ->
      currentWorkId = id
      model.id = id
      emitUpdates()

    Optimist.update
      model: work
      updates: updates
      apiCall: apiCall
      updateCallback: updateCallback
      handleResponse: false

  service.fetch = (workId) ->
    if workId != currentWorkId
      work = angular.copy workTemplate
      currentWorkId = workId

    params =
      id: currentWorkId

    apiCall = () ->
      SubmitWorkAPIService.get(params).$promise

    Optimist.fetchOne
      model: work
      apiCall: apiCall
      updateCallback: emitUpdates

  service.save = (updates) ->
    apiCall = (model) ->
      params =
        id: currentWorkId

      SubmitWorkAPIService.put(params, model).$promise

    Optimist.update
      model: work
      updates: updates
      apiCall: apiCall
      updateCallback: emitUpdates

  service

srv.$inject = ['$rootScope', 'Optimist', 'SubmitWorkAPIService']

angular.module('appirio-tech-ng-submit-work').factory 'SubmitWorkService', srv