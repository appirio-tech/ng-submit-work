'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/submit-work-visuals.directive.html'
  controller  : 'SubmitWorkVisualController as vm'
  scope       :
    workId : '@'
    store: '='
    permissions: '='

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkVisuals', directive
