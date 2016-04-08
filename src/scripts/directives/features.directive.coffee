'use strict'

directive = ->
  restrict   : 'E'
  template   : require('../../views/submit-work-features.directive.jade')()
  controller : 'SubmitWorkFeaturesController as vm'
  scope       :
    workId: '@'
    store: '='
    permissions: '='

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkFeatures', directive
