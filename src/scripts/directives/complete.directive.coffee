'use strict'

directive = ->
  restrict    : 'E'
  template    : require('../../views/submit-work-complete.directive.jade')()
  controller  : 'SubmitWorkCompleteController as vm'
  scope       :
    workId : '@workId'

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkComplete', directive
