'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/submit-work.directive.html'

angular.module('appirio-tech-ng-submit-work').directive 'submitWork', directive
