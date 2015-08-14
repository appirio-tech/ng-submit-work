'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/submit-work-name.directive.html'
  controller : 'SubmitWorkNameController as vm'
  scope:
    name: '='
    save: '&'

angular.module('appirio-tech-ng-submit-work').directive 'submitWorkName', directive
