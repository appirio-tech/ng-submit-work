'use strict'

service = (FeatureService) ->
  getFeatures = (existingFeatures = []) ->
    features         = FeatureService.getFeatures()
    selectedFeatures = {}
    customFeatures   = []

    for existingFeature in existingFeatures
      selectedFeatures[existingFeature.name] = existingFeature

      if existingFeature.custom
        existingFeature.selected = true

        customFeatures.push existingFeature

    for feature in features
      if selectedFeatures[feature.name]
        feature.selected    = true
        feature.explanation = selectedFeatures[feature.name].explanation

    features.concat customFeatures

  calculateEstimate = ->

  getFeatures: getFeatures
  calculateEstimate: calculateEstimate

service.$inject = ['FeatureService']

angular.module('appirio-tech-ng-submit-work').factory 'SubmitWorkService2', service