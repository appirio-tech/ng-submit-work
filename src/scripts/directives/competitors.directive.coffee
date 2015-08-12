'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/submit-work-competitors.directive.html'
  controller : 'SubmitWorkCompetitorsController as vm'
  scope      : true

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkCompetitors', directive
