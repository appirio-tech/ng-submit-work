'use strict'

Service = () ->

###########
# Helpers #
###########

noop = ->
  # noop

wrapWithMeta = (model, meta) ->
  metaTemplate =
    pending: false
    error: null
    propsUpdated: {}
    propsPending: {}
    propsErrored: {}

  metaToApply = meta || metaTemplate

  unless model.o
    model.o = metaToApply

stripMeta = (model) ->
  meta = model.o

  if model.o
    delete model.o

  meta

Service.prototype.fetchOne = (options) ->
  model                = options.model || {}
  updates              = options.updates || []
  apiCall              = options.apiCall || noop
  updateCallback       = options.updateCallback || noop
  handleResponse       = options.handleResponse != false
  clearErrorsOnSuccess = options.clearErrorsOnSuccess != false

  wrapWithMeta(model)

  model.o.pending = true

  # This callback should be non-blocking and update your app state
  updateCallback(model)

  # Should return a promise for a server update
  request = apiCall()

  request.then (response) ->
    now                 = new Date()
    model.o.lastUpdated = now.toISOString()

    if clearErrorsOnSuccess
      model.o.error = null

    for name, prop of response
      if response.propertyIsEnumerable(name)
        model[name] = prop

    if model.$promise
      delete model.$promise

    if model.$resolved
      delete model.$resolved

    response

  request.catch (err) ->
    model.o.error = err

  request.finally () ->
    model.o.pending = false
    updateCallback(model)

Service.prototype.updateLocal = (options) ->
  model                = options.model || {}
  updates              = options.updates || []
  updateCallback       = options.updateCallback || noop

  wrapWithMeta(model)

  for name, prop of updates
    model[name] = prop

  updateCallback(model)

Service.prototype.restore = (options) ->
  # TODO: Fill out this function

Service.prototype.update = (options) ->
  Service.prototype.updateLocal(options)
  Service.prototype.save(options)

Service.prototype.save = (options) ->
  model                = options.model || {}
  updates              = options.updates
  apiCall              = options.apiCall || noop
  updateCallback       = options.updateCallback || noop
  handleResponse       = options.handleResponse != false
  clearErrorsOnSuccess = options.clearErrorsOnSuccess != false
  rollbackOnFailure    = options.rollbackOnFailure || false

  meta    = stripMeta(model)
  request = apiCall(angular.copy model)
  wrapWithMeta(model, meta)

  for name, prop of updates
    model.o.propsPending[name] = true

  # This callback should be non-blocking and update your app state
  updateCallback(model)

  request.then (response) ->
    now                 = new Date()
    model.o.lastUpdated = now.toISOString()

    if clearErrorsOnSuccess
      model.o.propsErrored = {}

    if handleResponse
      for name, prop of updates
        model[name] = response[name]

  request.catch (err) ->
    if rollbackOnFailure
      Service.prototype.restore(options)

    for name, prop of updates
      model[name] = prop
      model.o.errors[name] = err

  request.finally () ->
    for name, prop of updates
      delete model.o.pending[name]

    updateCallback(model)


Service.$inject = ['$rootScope']

angular.module('appirio-tech-ng-submit-work').service 'Optimist', Service