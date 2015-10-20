'use strict'

SubmitWorkService = ($rootScope, OptimistModel, SubmitWorkAPIService) ->
  currentWorkId = null
  work          = null

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

  resetWork = ->
    work = new OptimistModel
      data: workTemplate
      updateCallback: emitUpdates
      propsToIgnore:
        $promise: true
        $resolved: true

  get = ->
    work.get()

  create = (updates) ->
    resetWork()

    interceptResponse = (res) ->
      currentWorkId = res.id

      work.set
        updates:
          id: res.id
        updateValues: true

      res

    apiCall = (model) ->
      SubmitWorkAPIService.post({}, model).$promise.then(interceptResponse)

    work.update
      updates: updates
      apiCall: apiCall

  fetch = (workId) ->
    if workId != currentWorkId
      resetWork()
      currentWorkId = workId

    apiCall = () ->
      params =
        id: currentWorkId

      SubmitWorkAPIService.get(params).$promise

    work.fetch
      apiCall: apiCall

  save = (updates) ->
    apiCall = (model) ->
      params =
        id: currentWorkId

      SubmitWorkAPIService.put(params, model).$promise

    work.update
      updates: updates
      apiCall: apiCall

  get    : get
  create : create
  fetch  : fetch
  save   : save

SubmitWorkService.$inject = ['$rootScope', 'OptimistModel', 'SubmitWorkAPIService']

angular.module('appirio-tech-ng-submit-work').factory 'SubmitWorkService', SubmitWorkService