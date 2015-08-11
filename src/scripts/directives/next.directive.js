(function () {
  'use strict';

  angular.module('appirio-tech-ng-submit-work').directive('nextState', NextDirective);

  NextDirective.$inject = ['$rootScope', '$document', 'SubmitWorkService'];

  function NextDirective($rootScope, $document, SubmitWorkService) {
    var link = function (scope, element, attrs) {
      scope.scrollTo = function() {
        if (scope.vm.validate && !scope.vm.validate().valid) {
          return;
        }

        SubmitWorkService.save();
        var stateElement =
              angular.element('[ng-scroll-state="submit-work"] [state="' + scope.state + '"]');
        $document.scrollToElementAnimated(stateElement, 150);
      };
    };

    return {
      restrict   : 'E',
      templateUrl: 'submit-work/next/next-state.html',
      link       : link,
      scope: {
        state: '=state',
        vm: '='
      }
    };
  };
})();
