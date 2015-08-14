'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/submit-work-features.directive.html'
  controller : 'SubmitWorkFeaturesController as vm'
  scope:
    features: '='
    save: '&'

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkFeatures', directive
