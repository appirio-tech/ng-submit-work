angular.module("app.constants", [])

.constant("API_URL", "https://api.topcoder.com")

.constant("AVATAR_URL", "https://www.topcoder.com")

.constant("SUBMISSION_URL", "https://studio.topcoder.com")

.constant("AUTH0_CLIENT_ID", "abc123")

.constant("AUTH0_DOMAIN", "topcoder.auth0.com")

.constant("AUTH0_TOKEN_NAME", "userJWTToken")

.constant("AUTH0_REFRESH_TOKEN_NAME", "userRefreshJWTToken")

;
(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-submit-work', 'appirio-tech-ng-ui-components', 'appirio-tech-ng-work-layout', 'ap-file-upload'];

  angular.module('example', dependencies);

}).call(this);

(function() {
  'use strict';
  var config;

  config = function($stateProvider) {
    var key, results, state, states;
    states = {};
    states['submit-work'] = {
      url: '/',
      title: 'submit work type',
      controller: 'TypeController as vm',
      templateUrl: 'views/submit-work-type.html'
    };
    states['submit-work-features'] = {
      url: '/submit-work/features',
      title: 'submit work features',
      templateUrl: 'views/submit-work-features.html'
    };
    states['submit-work-visuals'] = {
      url: '/submit-work/visuals',
      title: 'submit work visuals',
      templateUrl: 'views/submit-work-visuals.html'
    };
    states['submit-work-development'] = {
      url: '/submit-work/development',
      title: 'submit work development',
      templateUrl: 'views/submit-work-development.html'
    };
    states['submit-work-complete'] = {
      url: '/submit-work/complete',
      title: 'submit work complete',
      templateUrl: 'views/submit-work-complete.example.html'
    };
    results = [];
    for (key in states) {
      state = states[key];
      results.push($stateProvider.state(key, state));
    }
    return results;
  };

  config.$inject = ['$stateProvider'];

  angular.module('example').config(config).run();

}).call(this);

(function() {
  'use strict';
  var TypeController;

  TypeController = function() {
    var activate, vm;
    vm = this;
    activate = function() {
      vm.appName = 'Big Boss App';
      return vm;
    };
    return activate();
  };

  angular.module('appirio-tech-ng-work-layout').controller('TypeController', TypeController);

}).call(this);
