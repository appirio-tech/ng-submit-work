angular.module("app.constants", [])

.constant("apiUrl", "https://api.topcoder-dev.com/v3/")

.constant("API_URL", "http://api.topcoder.com/v3")

.constant("API_URL_V2", "https://api.topcoder-dev.com/v2")

.constant("AVATAR_URL", "http://www.topcoder.com")

.constant("SUBMISSION_URL", "https://studio.topcoder.com")

.constant("AUTH0_CLIENT_ID", "abc123")

.constant("AUTH0_DOMAIN", "topcoder-dev.auth0.com")

.constant("AUTH0_TOKEN_NAME", "userJWTToken")

.constant("AUTH0_REFRESH_TOKEN_NAME", "userRefreshJWTToken")

;
(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-submit-work', 'appirio-tech-ng-ui-components'];

  angular.module('example', dependencies);

}).call(this);

angular.module("example").run(["$templateCache", function($templateCache) {$templateCache.put("views/submit-work.html","<submit-work work-id=\"123\"></submit-work>");}]);
(function() {
  'use strict';
  var config;

  config = function($stateProvider) {
    var key, results, state, states;
    states = {};
    states['submit-work'] = {
      url: '/',
      title: 'submit-work',
      templateUrl: 'views/submit-work.html'
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
