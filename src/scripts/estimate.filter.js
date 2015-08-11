(function() {
  'use strict';

  angular
    .module('appirio-tech-ng-submit-work')
    .filter('estimate', EstimateFilter);

  EstimateFilter.$inject = [];

  function EstimateFilter() {
    return function(input) {
      if (!input || input.low === 0) {
        return '';
      }
      if (input.low === input.high) {
        return '$' + input.low;
      } else {
        return "$" + input.low + ' - ' + '$' + input.high;
      }
    };
  }
})();
