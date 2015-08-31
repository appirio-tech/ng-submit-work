'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/submit-work-visuals.directive.html'
  controller: 'VisualsController as vm'
  scope       : true

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkVisuals', directive
