'use strict'

Service = ->

###########
# Helpers #
###########

noop = ->
  # noop

enumProps = ->
  props = 
    value: {}
    configurable: true
    writable: true
    enumerable: false

###############
# Collections #
###############

Service.prototype.fetch = (options) ->
  collection           = options.collection
  apiCall              = options.apiCall || noop
  updateCallback       = options.updateCallback || noop
  replaceCollection    = options.replaceCollection != false
  clearErrorsOnSuccess = options.clearErrorsOnSuccess != false

  # Should return a promise for a server update
  request = apiCall()

  # Update/add metadata to the collection
  unless collection.o?
    Object.defineProperty collection, 'o', enumProps()

  collection.o.pending = true

  # This callback should be non-blocking and update your app state
  updateCallback(collection)

  request.then (response) ->
    now                      = new Date()
    collection.o.lastUpdated = now.toISOString()

    if replaceCollection
      collection.length = 0

      for i in [0...response.length] by 1
        collection.push response[i]

  request.catch (err) ->
    collection.o.error = err

  request.finally () ->
    collection.o.pending = false
    updateCallback(collection)

Service.prototype.addToCollection = (options) ->
  collection           = options.collection
  item                 = options.item
  apiCall              = options.apiCall || noop
  updateCallback       = options.updateCallback || noop
  handleResponse       = options.handleResponse != false
  clearErrorsOnSuccess = options.clearErrorsOnSuccess != false

  # Should return a promise for a server update
  request = apiCall(item)

  # Update/add metadata to the item
  unless item.o?
    Object.defineProperty item, 'o', enumProps()

  item.o.pending = true
  item.o.confirmed = false

  # Add our provisional item to the collection
  collection.push item

  # This callback should be non-blocking and update your app state
  updateCallback(collection)

  request.then (response) ->
    now                = new Date()
    item.o.lastUpdated = now.toISOString()
    item.o.confirmed   = true

    if handleResponse
      for name, prop of response
        item[name] = response[name]

  request.catch (err) ->
    item.o.error = err

  request.finally () ->
    item.o.pending = false
    updateCallback(collection)

##########
# Models #
##########

Service.prototype.fetchOne = (options) ->
  model                = options.model || {}
  updates              = options.updates || []
  apiCall              = options.apiCall || noop
  updateCallback       = options.updateCallback || noop
  handleResponse       = options.handleResponse != false
  clearErrorsOnSuccess = options.clearErrorsOnSuccess != false

  # Should return a promise for a server update
  request = apiCall()

  # Restore/add metadata to the model
  unless model.o?
    Object.defineProperty model, 'o', enumProps()

  model.o.hasPending = true

  # This callback should be non-blocking and update your app state
  updateCallback(model)

  request.then (response) ->
    now                 = new Date()
    model.o.lastUpdated = now.toISOString()

    if clearErrorsOnSuccess
      model.o.errors = {}

    if handleResponse
      for name, prop of response
        model[name] = response[name]

  request.catch (err) ->
    model.o.error = err

  request.finally () ->
    model.o.hasPending = false
    updateCallback(model)

Service.prototype.update = (options) ->
  model                = options.model || {}
  updates              = options.updates || []
  apiCall              = options.apiCall || noop
  updateCallback       = options.updateCallback || noop
  handleResponse       = options.handleResponse != false
  clearErrorsOnSuccess = options.clearErrorsOnSuccess != false

  # Backup the properties we want to update
  backup = {}

  for name, prop of updates
    backup[name] = model[name]
    model[name] = prop

  # Strip metadata from our model
  if model.o
    o = model.o
    delete model.o

  # Should return a promise for a server update
  request = apiCall(model)

  # Restore/add metadata to the model
  Object.defineProperty model, 'o', enumProps()

  if o
    model.o = o
  else
    model.o = {}

  model.o.pending = {}
  model.o.errors = {}

  for name, prop of updates
    model.o.pending[name] = true

  # This callback should be non-blocking and update your app state
  updateCallback(model)

  request.then (response) ->
    now                 = new Date()
    model.o.lastUpdated = now.toISOString()

    if clearErrorsOnSuccess
      model.o.errors = {}

    if handleResponse
      for name, prop of updates
        model[name] = response[name]

  request.catch (err) ->
    for name, prop of backup
      model[name] = prop
      model.o.errors[name] = err

  request.finally () ->
    model.o.pending.rankedSubmissions = false
    updateCallback(model)


Service.$inject = ['$rootScope']

angular.module('appirio-tech-ng-submit-work').service 'Optimist', Service