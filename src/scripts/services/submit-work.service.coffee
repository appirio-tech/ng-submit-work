'use strict'

SubmitWorkService = ($rootScope, Optimist, SubmitWorkAPIService) ->
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
    work = new Optimist.Model
      data: workTemplate
      updateCallback: emitUpdates
      propsToIgnore: ['$promise', '$resolved']

  work = createWork()

  get = ->
    work.get()

  create = (updates) ->
    interceptResponse = (res) ->
      currentWorkId = res.id

      work.updateLocal
        updates:
          id: res.id

      res

    apiCall = (model) ->
      SubmitWorkAPIService.post({}, model).$promise.then(interceptResponse)

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

SubmitWorkService.$inject = ['$rootScope', 'Optimist', 'SubmitWorkAPIService']

angular.module('appirio-tech-ng-submit-work').factory 'SubmitWorkService', SubmitWorkService