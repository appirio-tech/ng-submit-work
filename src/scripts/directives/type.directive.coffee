'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/submit-work-type.directive.html'
  controller  : 'SubmitWorkTypeController as vm'
  scope       :
    workId: '@'
    permissions: '='

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkType', directive
