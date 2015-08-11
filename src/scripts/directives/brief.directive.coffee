'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/submit-work-brief.directive.html'
  controller  : 'SubmitWorkBriefController as vm'

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkBrief', directive
