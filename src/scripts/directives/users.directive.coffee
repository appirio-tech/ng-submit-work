'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/submit-work-users.directive.html'
  controller  : 'SubmitWorkUsersController as vm'
  scope       : true

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkUsers', directive
