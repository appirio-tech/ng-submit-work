'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/submit-work-designs.directive.html'
  controller : 'SubmitWorkDesignsController as vm'
  scope      :
    workId: '='

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkDesigns', directive
