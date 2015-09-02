'use strict'

directive = ->
  restrict    : 'E'
  templateUrl : 'views/submit-work-type.directive.html'
  controller: 'TypeController as vm'
  scope       :
    workId: '@workId'

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkType', directive
