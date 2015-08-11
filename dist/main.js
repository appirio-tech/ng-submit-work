(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants'];

  angular.module('appirio-tech-ng-submissions', dependencies);

}).call(this);

angular.module("appirio-tech-ng-submissions").run(["$templateCache", function($templateCache) {$templateCache.put("views/submissions.directive.html","<div>hello world</div>");}]);
(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submissions.directive.html'
    };
  };

  angular.module('appirio-tech-ng-submissions').directive('submissions', directive);

}).call(this);
