'use strict'

service = ->
  calculateEstimate = (requestType = null, features = null, costEstimate = null) ->
    estimate =
      low: 0
      high: 0

    reduce = (x, y) ->
      x.low += 800
      x.high += 1200
      x

    if requestType && features
      estimate.low  = 2000
      estimate.high = 2000
      estimate = features.reduce reduce, estimate
      estimate = costEstimate if costEstimate?.low > estimate.low

    estimate

  calculateEstimate: calculateEstimate

service.$inject = []

angular.module('appirio-tech-ng-submit-work').factory 'SubmitWorkService', service