'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/submit-work-users.directive.html'
  controller  : 'SubmitWorkUsersController as vm'
  scope       :
    usageDescription: '='
    save: '&'

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkUsers', directive
