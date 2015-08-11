'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/submit-work-users.directive.html'
  controller  : 'SubmitWorkTypeController as vm'

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkUsers', directive
