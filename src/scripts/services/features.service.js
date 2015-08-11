(function () {
  'use strict';

  angular
    .module('appirio-tech-ng-submit-work')
    .factory('FeatureService', FeatureService);

  FeatureService.$inject = ['$q'];
  /* @ngInject */
  function FeatureService($q) {

    var service = {
      getFeatures:   null,
      resetFeatures: null
    };

    var features = [
      {
        id: 'login',
        name: 'Login',
        explanation: '',
        description: 'Users can login / register for your app',
        custom: false,
        selected: false
      },
      {
        id: 'social-login',
        name: 'Social',
        explanation: '',
        description: 'Users can see data from social networks (FB, Twitter etc.) in your app',
        custom: false,
        selected: false
      },
      {
        id: 'profiles',
        name: 'Profiles',
        explanation: '',
        description: 'Users can create profiles with personal info',
        custom: false,
        selected: false
      },
      {
        id: 'map',
        name: 'Map',
        explanation: '',
        description: 'A map with a user\'s GPS location that helps them get to places',
        custom: false,
        selected: false
      },
      {
        id: 'forms',
        name: 'Forms',
        explanation: '',
        description: 'Users send specific information to you via forms ',
        custom: false,
        selected: false
      },
      {
        id: 'listing',
        name: 'Listing',
        explanation: '',
        description: 'Display list of products, images, items that the user can browse or search through',
        custom: false,
        selected: false
      }
    ];
    var defaultFeatures = angular.copy(features);

    service.getFeatures = function() {
      var deferred = $q.defer();

      _getFeatures(deferred);

      return deferred.promise;
    };

    service.resetFeatures = function() {
      features = angular.copy(defaultFeatures);
    };

    function _getFeatures(deferred) {
      deferred.resolve(angular.copy(features));
    }

    return service;

  }
})();
