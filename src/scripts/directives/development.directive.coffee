'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/submit-work-development.directive.html'
  controller  : 'SubmitWorkDevelopmentController as vm'
  scope       :
    workId : '@workId'

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkDevelopment', directive
