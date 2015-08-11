(function () {
  'use strict';

  angular.module('appirio-tech-ng-submit-work').directive('ngSubmitWorkAside', AsideDirective);

  AsideDirective.$inject = ['$rootScope', '$document'];

  function AsideDirective($rootScope, $document) {
    var link = function (scope, element, attrs) {

      scope.$watch('activeState', function (state) {
        element.find('.state-active').removeClass('state-active');
        element.find('[state="' + state + '"]').addClass('state-active');
      }, true);

      var setFixed = function () {
        // Need to refactor to avoid constant
        if ($document.scrollTop() >= 100) {
          element.addClass('fixed');
        }
        else {
          element.removeClass('fixed');
        }
      };

      $document.bind('scroll', setFixed);

      setFixed();

      $rootScope.$on('submit-work-show-example', function (rootScope, example) {
        element.find('.example.' +  example).show();
      });

      $rootScope.$on('submit-work-hide-example', function (rootScope, example) {
        element.find('.example').hide();
      });
    };

    return {
      restrict   : 'A',
      scope: {
        activeState : '=ngActiveState',
        work        : '=ngSubmitWorkAside',
        completed   : '=ngCompleted',
        asideService: '=asideService'
      },
      templateUrl: 'views/submit-work-aside.directive.html',
      link       : link
    };
  };
})();
