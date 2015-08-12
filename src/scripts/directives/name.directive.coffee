'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/submit-work-name.directive.html'
  controller : 'SubmitWorkNameController as vm'
  scope      : true

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkName', directive
