'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/submit-work-complete.directive.html'
  controller  : 'SubmitWorkCompleteController as vm'
  scope       :
    workId : '@workId'

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkComplete', directive
