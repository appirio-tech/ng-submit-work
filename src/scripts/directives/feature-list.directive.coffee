'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/feature-list.directive.jade')()
  controller  : 'FeaturelistController as vm'
  scope       :
    activateFeature  : '&'
    activeFeature: '='
    headerText: '@'
    icon      : '@'
    features  : '='

angular.module('appirio-tech-ng-submit-work').directive 'featureList', directive
