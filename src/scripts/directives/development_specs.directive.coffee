'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/submit-work-development-specs.directive.html'
  controller  : 'SubmitWorkDevelopmentSpecsController as vm'
  scope       :
    workId : '@workId'

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkDevelopmentSpecs', directive
