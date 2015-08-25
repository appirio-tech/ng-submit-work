'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/submit-work-type.directive.html'
  scope       : true

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkType', directive
