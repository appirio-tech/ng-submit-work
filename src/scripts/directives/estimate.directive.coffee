'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/submit-work-estimate.directive.html'
  controller  : 'SubmitWorkEstimateController as vm'
  scope       : true

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkEstimate', directive
