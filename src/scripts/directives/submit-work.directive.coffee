'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/submit-work.directive.html'
  controller  : 'SubmitWorkController as vm'
  scope       : true

angular.module('appirio-tech-ng-submit-work').directive 'submitWork', directive
