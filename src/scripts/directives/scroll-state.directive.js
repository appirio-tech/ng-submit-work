(function () {
  'use strict';

  angular.module('appirio-tech-ng-submit-work').directive('ngScrollState', ScrollStateDirective);

  ScrollStateDirective.$inject = ['$document', '$rootScope'];

  function ScrollStateDirective($document, $rootScope) {
    var link = function (scope, element, attrs) {
      var stateElements      = $('.state', element[0]);
      var previousScrollTop  = $document.scrollTop();
      var isAutoScrolling    = false;
      var isManualScrolling  = false;

      function setActiveStateElement () {
        var activeStateElement = stateElements.eq(0);

        stateElements.each(function (i, state) {
          var startingLine = $('#starting-line-' + stateElements.eq(i).attr('state'));
          var hitThreshold = startingLine.offset().top < $document.scrollTop() + 1;

          if (hitThreshold) {
            activeStateElement = stateElements.eq(i);
          }
        });

        stateElements.removeClass('state-active');

        activeStateElement.addClass('state-active');

        return activeStateElement;
      }

      var manualScrolling = function (e) {
        var activeState = setActiveStateElement().attr('state');

        if (scope.activeState != activeState) {
          isManualScrolling = true;
          scope.activeState = activeState;
          scope.$apply();
        }
      };

      var autoScrolling = function (state) {
        if (isManualScrolling) {
          isManualScrolling = false;
        }
        else if (state) {
          var stateElement = $('#starting-line-' + state);
          $document.scrollToElementAnimated(stateElement, -100);
        }
      };

      scope.$watch('activeState', autoScrolling);

      $document.bind('scroll', manualScrolling);
    };

    return {
      restrict   : 'A',
      scope: {
        activeState : "=ngScrollState"
      },
      link       : link
    };
  };
})();
