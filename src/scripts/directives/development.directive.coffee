'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/submit-work-development.directive.jade')()
  controller  : 'SubmitWorkDevelopmentController as vm'
  scope       :
    workId : '@workId'
    store: '='
    permissions: '='

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkDevelopment', directive
