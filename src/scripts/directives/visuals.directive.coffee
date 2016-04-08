'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/submit-work-visuals.directive.jade')()
  controller  : 'SubmitWorkVisualController as vm'
  scope       :
    workId : '@'
    store: '='
    permissions: '='

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkVisuals', directive
