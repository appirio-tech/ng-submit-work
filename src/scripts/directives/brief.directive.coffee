'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/submit-work-brief.directive.html'
  controller : 'SubmitWorkBriefController as vm'
  scope:
    workId : '='
    summary: '='

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkBrief', directive
