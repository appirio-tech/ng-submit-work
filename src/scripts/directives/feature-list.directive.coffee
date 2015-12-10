'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/feature-list.directive.html'
  controller  : 'FeaturelistController as vm'
  scope       :
    activateFeature  : '&'
    activeFeature: '='
    headerText: '@'
    icon      : '@'
    features  : '='

angular.module('appirio-tech-ng-submit-work').directive 'featureList', directive