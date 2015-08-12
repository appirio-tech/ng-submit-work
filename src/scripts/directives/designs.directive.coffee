'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/submit-work-designs.directive.html'
  controller : 'SubmitWorkDesignsController as vm'
  scope      : true

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkDesigns', directive
