'use strict'

transformResponse = (response) ->
  parsed = JSON.parse response

  parsed?.result?.content || []

srv = ($resource, API_URL) ->
  url = API_URL + '/work/:id'

  params =
    id: '@id'

  methods =
    put:
      method: 'PUT'

  $resource url, {}, methods

srv.$inject = ['$resource', 'API_URL']

angular.module('appirio-tech-ng-submit-work').factory 'SubmitWorkAPIService', srv
