'use strict'

directive = ($document) ->
  restrict    : 'A'
  link : (scope, element, attrs) ->
    elementId = attrs.scrollElement
    scrollElement = angular.element document.getElementById(elementId)

    element.on 'click', ->
      $document.scrollToElementAnimated scrollElement

directive.$inject = ['$document']

angular.module('appirio-tech-ng-submit-work').directive 'scrollElement', directive