'use strict'

directive = ($rootScope, $document) ->
  link = (scope, element, attrs) ->
    setClass = (state) ->
      element.find('.state-active').removeClass('state-active')
      element.find('[state="' + state + '"]').addClass('state-active')

    scope.$watch 'activeState', setClass, true

    setFixed = () ->
      if $document.scrollTop() >= 100
        element.addClass 'fixed'
      else
        element.removeClass 'fixed'

    $document.bind 'scroll', setFixed

    setFixed()

  restrict   : 'E'
  templateUrl: 'views/submit-work-aside.directive.html'
  link       : link
  controller : 'SubmitWorkNavController as vm'
  scope:
    activeState : '='
    completed   : '='
    name        : '='
    requestType : '='
    estimate    : '='

directive.$inject = ['$rootScope', '$document']

angular.module('appirio-tech-ng-submit-work').directive('submitWorkNav', directive)

