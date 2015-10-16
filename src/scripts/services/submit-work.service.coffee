'use strict'

SubmitWorkService = ($rootScope, OptimistModel, SubmitWorkAPIService, SubmitWorkCreationAPIService) ->
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

  createWork = ->
    work = new OptimistModel
      data: workTemplate
      updateCallback: emitUpdates
      propsToIgnore:
        $promise: true
        $resolved: true

  work = createWork()

  get = ->
    work.get()

  create = (updates) ->
    interceptResponse = (res) ->
      currentWorkId = res.id

      work.set
        updates:
          id: res.id
        updateValues: true

      res

    apiCall = (model) ->
      SubmitWorkCreationAPIService.post({}, model).$promise.then(interceptResponse)

    work.update
      updates: updates
      apiCall: apiCall

  fetch = (workId) ->
    if workId != currentWorkId
      work = createWork()
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

SubmitWorkService.$inject = ['$rootScope', 'OptimistModel', 'SubmitWorkAPIService', 'SubmitWorkCreationAPIService']

angular.module('appirio-tech-ng-submit-work').factory 'SubmitWorkService', SubmitWorkService