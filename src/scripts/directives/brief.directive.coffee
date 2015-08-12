'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/submit-work-brief.directive.html'
  controller : 'SubmitWorkBriefController as vm'
  scope      : true

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkBrief', directive
