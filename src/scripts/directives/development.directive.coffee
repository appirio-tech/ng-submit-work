'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/submit-work-development.directive.html'
  controller  : 'SubmitWorkDevelopmentController as vm'
  scope       : true

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkDevelopment', directive
