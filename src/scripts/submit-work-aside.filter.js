(function() {
  'use strict';

  angular
    .module('appirio-tech-ng-submit-work')
    .filter('requestType', RequestTypeFilter);

  RequestTypeFilter.$inject = [];

  function RequestTypeFilter() {
    return function(input) {
      if (!input) {
        return '';
      }

      if (input === 'both') {
        return 'Design & Code';
      }

      return input.charAt(0).toUpperCase() + input.substr(1) + " Only";
    };
  }
})();
