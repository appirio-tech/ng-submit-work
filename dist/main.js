(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'duScroll'];

  angular.module('appirio-tech-ng-submit-work', dependencies);

}).call(this);

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

angular.module("appirio-tech-ng-submit-work").run(["$templateCache", function($templateCache) {$templateCache.put("views/submit-work.directive.html","<header></header><main ng-scroll-state=\"activeState\"><div id=\"starting-line-name\" class=\"starting-line\"></div><submit-work-name state=\"name\" name=\"vm.work.name\" save=\"vm.save()\" class=\"state-active state name\"></submit-work-name><div id=\"starting-line-type\" class=\"starting-line\"></div><submit-work-type state=\"type\" request-type=\"vm.work.requestType\" save=\"vm.save()\" class=\"state type\"></submit-work-type><div id=\"starting-line-brief\" class=\"starting-line\"></div><submit-work-brief state=\"brief\" work-id=\"vm.work.id\" summary=\"vm.work.summary\" save=\"vm.save()\" class=\"state brief\"></submit-work-brief><div id=\"starting-line-competitors\" class=\"starting-line\"></div><submit-work-competitors state=\"competitors\" competitor-apps=\"vm.work.competitorApps\" save=\"vm.save()\" class=\"state competitors\"></submit-work-competitors><div id=\"starting-line-users\" class=\"starting-line\"></div><submit-work-users state=\"users\" usage-description=\"vm.work.usageDescription\" save=\"vm.save()\" class=\"state users\"></submit-work-users><div id=\"starting-line-features\" class=\"starting-line\"></div><submit-work-features state=\"features\" features=\"vm.work.features\" save=\"vm.save()\" class=\"state features\"></submit-work-features><div id=\"starting-line-designs\" class=\"starting-line\"></div><submit-work-designs state=\"designs\" work-id=\"vm.work.id\" save=\"vm.save()\" class=\"state designs\"></submit-work-designs><div id=\"starting-line-estimate\" class=\"starting-line\"></div><submit-work-estimate state=\"estimate\" save=\"vm.save()\" estimate=\"vm.estimate\" accepted-terms=\"vm.acceptedTerms\" class=\"state estimate\"></submit-work-estimate><button type=\"button\" ng-click=\"vm.launch()\" ng-class=\"{ active: activeState == \'estimate\' }\" class=\"launch\">SUBMIT PROJECT</button></main><submit-work-nav active-state=\"activeState\" completed=\"completed\" name=\"vm.work.name\" request-type=\"vm.work.requestType\" estimate=\"vm.estimate\"></submit-work-nav>");
$templateCache.put("views/submit-work-aside.directive.html","<div class=\"fixed-wrapper\"><div class=\"project\"><div class=\"name\">{{ name }}</div><div class=\"type\">{{ requestType }}</div><div ng-show=\"estimate.low &gt; 0\" class=\"price\">${{ estimate.low == estimate.high ? estimate.low : estimate.low + \'-\' + estimate.high }}</div></div><nav role=\"navigation\"><ul id=\"submit-work-nav\"><li ng-class=\"{ completed: completed[\'aboutProject\']}\"><label><div class=\"checkmark-house\"><div class=\"icon checkmark smallest\"></div></div><p>About Project</p></label><ul><li><a state=\"name\" ng-click=\"activeState = \'name\'\" class=\"name current\">Project Name</a></li><li><a state=\"type\" ng-click=\"activeState = \'type\'\" class=\"type current\">Project Type</a></li><li><a state=\"brief\" ng-click=\"activeState = \'brief\'\" class=\"brief current\">Project Specs</a></li><li><a state=\"competitors\" ng-click=\"activeState = \'competitors\'\" class=\"competitors current\">Similar Apps</a></li></ul></li><li ng-class=\"{ completed: completed[\'users\']}\"><label><div class=\"checkmark-house\"><div class=\"icon checkmark smallest\"></div></div><p>App Users</p></label><ul><li><a state=\"users\" ng-click=\"activeState = \'users\'\" class=\"users current\">Your Users</a></li></ul></li><li ng-class=\"{ completed: completed[\'features\']}\"><label><div class=\"checkmark-house\"><div class=\"icon checkmark smallest\"></div></div><p>App Features</p></label><ul><li><a state=\"features\" ng-click=\"activeState = \'features\'\" class=\"features current\">Choose Your Features</a></li></ul></li><li ng-class=\"{ completed: completed[\'design\']}\"><label><div class=\"checkmark-house\"><div class=\"icon checkmark smallest\"></div></div><p>App design</p></label><ul><li><a state=\"designs\" ng-click=\"activeState = \'designs\'\" class=\"designs current\">Upload Design Files</a></li></ul></li><li ng-class=\"{ completed: completed[\'launch\']}\"><label><div class=\"checkmark-house\"><div class=\"icon checkmark smallest\"></div></div><p>Launch App</p></label><ul><li><a state=\"estimate\" ng-click=\"activeState = \'estimate\'\" class=\"estimate current\">Initial Estimate</a></li></ul></li></ul></nav></div>");
$templateCache.put("views/submit-work-brief.directive.html","<h2>About your project</h2><h3 ng-show=\"vm.showYesNo || vm.showBrief\">Do you have a project brief to upload?</h3><h3 ng-show=\"vm.showElevator\">Give us your elevator pitch—a brief explanation of your app.</h3><form name=\"questionForm\" ng-submit=\"vm.questionSubmit()\"><input type=\"hidden\" name=\"question\" required=\"true\" ng-model=\"vm.question\"/><button type=\"submit\" ng-show=\"vm.showYesNo\" ng-click=\"vm.question = 1\" class=\"yes\">YES</button><button type=\"submit\" ng-show=\"vm.showYesNo\" ng-click=\"vm.question = 0\" class=\"no\">NO</button><ul ng-show=\"questionForm.$dirty\" class=\"invalid-messages\"><li ng-show=\"questionForm.question.$error.required\">Please tell us if you have a brief to upload.</li></ul></form><form name=\"briefForm\" ng-show=\"vm.showBrief\"><ap-uploader config=\"vm.briefUploaderConfig\" uploading=\"vm.briefUploaderUploading\" has-errors=\"vm.briefUploaderHasErrors\"></ap-uploader><button type=\"button\" ng-click=\"vm.submitBrief()\" ng-hide=\"!vm.showBrief || vm.uploaderSingleStatus == \'started\' \" class=\"submit\">NEXT</button></form><form name=\"elevatorForm\" ng-show=\"vm.showElevator\" ng-submit=\"vm.submitElevator()\"><textarea name=\"elevator\" placeholder=\"I have an idea for a mobile app that lets people automatically monitor stocks, with automatic updates and alerts.\" ng-model=\"summary\" ng-model-options=\"{allowInvalid: true}\" required=\"required\" ng-minlength=\"200\"></textarea><div class=\"character-count\">{{ summary.length || \'&nbsp;\' }}</div><ul ng-show=\"elevatorForm.$dirty || elevatorForm.elevator.$dirty\" class=\"invalid-messages\"><li ng-show=\"elevatorForm.summary.$error.required\">This field is required.</li><li ng-show=\"elevatorForm.summary.$error.minlength\">Help our designers understand your needs, please enter at least 200 characters.</li></ul><button type=\"submit\" ng-show=\"elevatorForm.$valid\" class=\"submit\">NEXT</button></form><button ng-hide=\"vm.showYesNo\" ng-click=\"vm.toggleCancel()\" class=\"cancel\">Cancel</button>");
$templateCache.put("views/submit-work-competitors.directive.html","<h2>About your project</h2><h3>What existing apps would be similar to your new app?</h3><form name=\"competitorForm\" ng-submit=\"vm.submit($event)\"><fieldset><input id=\"project-competitors\" type=\"text\" placeholder=\"{{vm.placeholder || \'eTrade Mobile Trading App\'}}\" ng-model=\"vm.appName\" ng-enter=\"vm.add()\"/><button type=\"button\" ng-click=\"vm.add()\" class=\"add-competitor\">+</button></fieldset><h6 ng-show=\"competitorApps.length &gt; 0\">Your List of Similar Apps</h6><ul class=\"added-competitors\"><li ng-repeat=\"appName in competitorApps\"><div class=\"competitor\">{{appName}}</div><button type=\"button\" ng-click=\"competitorApps.splice($index, 1)\" class=\"remove-competitor\">x</button></li></ul><button type=\"submit\" ng-show=\"competitorForm.$valid\" class=\"submit\">NEXT</button></form>");
$templateCache.put("views/submit-work-designs.directive.html","<h2>Designing Your App</h2><h3 class=\"optional\">(optional)</h3><h3>Upload any files you may have that can help us understand your design preferences.</h3><form name=\"designForm\"><fieldset><ap-uploader config=\"vm.designsUploaderConfig\" uploading=\"vm.designsUploaderUploading\" has-errors=\"vm.designsUploaderHasErrors\"></ap-uploader></fieldset><button type=\"button\" ng-click=\"vm.submit()\" ng-show=\"vm.uploaderStatus != \'started\' \" class=\"submit\">NEXT</button></form>");
$templateCache.put("views/submit-work-estimate.directive.html","<h2>Your Estimate</h2><h3 ng-show=\"estimate.low &gt; 0\">${{ estimate.low == estimate.high ? estimate.low : estimate.low + \'-\' + estimate.high }}</h3><form name=\"estimateForm\"><p>This is our closest estimate for your project based on the information you’ve provided today. When you click \"Submit Project,\" we\'ll process your info and provide a formal project proposal.</p><input id=\"submit-work-accept-terms\" name=\"acceptedTerms\" type=\"checkbox\" ng-model=\"acceptedTerms\" required=\"required\" ng-change=\"vm.change()\"/><label for=\"submit-work-accept-terms\">Accept <a ng-click=\"vm.showTerms = true\" class=\"terms-link\">Terms and Conditions</a></label><ul ng-show=\"estimateForm.$dirty || estimateForm.acceptedTerms.$dirty\" class=\"invalid-messages\"><li ng-show=\"estimateForm.acceptedTerms.$error.required\">You must agree to our Terms and Conditions in order to use our services</li></ul></form><modal show=\"vm.showTerms\"><div class=\"terms\"><h3>Terms &amp; Conditions</h3><p>We will rule over all this land, and we will call it...This Land. It was supposed to confuse him, but it just made him peppy. You haven\'t seen my drawer of inappropriate starches? I would appreciate it if one person on this boat would not assume I\'m an evil, lecherous hump. We\'ll have to call it early quantum state phenomenon. Only way to fit 5000 species of mammal on the same boat.</p><p>A whole mess of sparrows turning on a dime, salmon trucking upstream. Well we could grind our enemies into talcum powder with a sledgehammer but, gosh, we did that last night. In every generation there is a chosen one. Say Skywalker, and I smack ya. It has nothing to do with me.</p></div></modal>");
$templateCache.put("views/submit-work-features.directive.html","<h2>What features does your app need?</h2><h3>Select from our list, or describe your own.</h3><form name=\"featureForm\" ng-submit=\"vm.submit()\"><ul class=\"features\"><li ng-repeat=\"feature in vm.features\"><input id=\"{{ \'submit-work-feature-\' + $index }}\" type=\"checkbox\" ng-model=\"feature.checked\" ng-change=\"vm.checked()\"/><div class=\"label-example\"><label for=\"{{ \'submit-work-feature-\' + $index }}\">{{ feature.name }}</label><button ng-if=\"!feature.custom\" type=\"button\" ng-click=\"vm.clickExample()\" title=\"View example\" class=\"clean\"></button><button ng-if=\"feature.custom\" type=\"button\" ng-click=\"vm.deleteFeature($index)\" class=\"x\">x</button></div><div class=\"desc\">{{ feature.description }}</div><textarea placeholder=\"explain briefly (optional)\" ng-show=\"feature.checked\" ng-model=\"feature.explanation\"></textarea></li><li><input id=\"submit-work-features-new\" type=\"checkbox\" ng-model=\"vm.newFeature\"/><div class=\"label-example\"><label for=\"submit-work-features-new\">Additional Features</label></div><div class=\"desc\">Tell us about other features you need that are not listed here.</div></li></ul><div ng-show=\"vm.newFeature\" class=\"new-feature\"><div class=\"title\"><input type=\"text\" ng-model=\"vm.newFeatureName\" placeholder=\"Name\" ng-enter=\"vm.add()\"/></div><div class=\"explanation-n-add\"><textarea type=\"text\" ng-model=\"vm.newFeatureExplanation\" ng-enter=\"vm.add()\" placeholder=\"Explanation\"></textarea><button type=\"button\" ng-click=\"vm.add()\">+</button></div></div><button type=\"submit\" ng-show=\"featureForm.$valid\" class=\"submit\">NEXT</button></form><div ng-modal=\"showExample\" class=\"example layout-modal\"><button type=\"button\" ng-click=\"showExample = false\" class=\"clean close\"></button><h2>Email Login:</h2><h3>allows users to login with email and username</h3><img src=\"/submit-work/images/phone.png\"/></div>");
$templateCache.put("views/submit-work-name.directive.html","<h2>About your project</h2><h3>Name your project</h3><form name=\"nameForm\" ng-submit=\"vm.submit()\"><input name=\"name\" type=\"text\" placeholder=\"Ex. My Stock Monitor App\" required=\"required\" ng-model=\"name\" ng-minlength=\"3\" ng-pattern=\"/^[0-9a-zA-Z].*$/\"/><ul ng-show=\"nameForm.$dirty || nameForm.name.$dirty\" class=\"invalid-messages\"><li ng-show=\"nameForm.name.$error.required\">This field is required.</li><li ng-show=\"nameForm.name.$error.minlength\">The project name must be at least 3 characters long.</li><li ng-show=\"nameForm.name.$error.pattern\">The project name must start with a letter or a number.</li></ul><button type=\"submit\" ng-show=\"nameForm.$valid\" class=\"success\">NEXT</button></form>");
$templateCache.put("views/submit-work-type.directive.html","<h2>About your project</h2><h3>What type of project do you need?</h3><form name=\"typeForm\" ng-submit=\"vm.submit()\"><input name=\"type\" type=\"hidden\" required=\"required\" ng-model=\"requestType\"/><ul class=\"project-types\"><li><label for=\"project-type-design\">DESIGN</label><button id=\"project-type-design\" type=\"button\" ng-class=\"{\'selected\': requestType == \'design\'}\" ng-click=\"vm.setType($event, \'design\')\" ng-enter=\"vm.submit()\"><div class=\"starting-at\">starting at</div><div class=\"price\">$2,000</div><div class=\"duration\">about 1 week</div></button><div class=\"description\">I need a design for my app.</div></li><li><label for=\"project-type-code\">CODE</label><button id=\"project-type-code\" type=\"button\" ng-class=\"{\'selected\': requestType == \'code\'}\" ng-click=\"vm.setType($event, \'code\')\" ng-enter=\"vm.submit()\"><div class=\"starting-at\">starting at</div><div class=\"price\">$5,000</div><div class=\"duration\">about 2 weeks</div></button><div class=\"description\">I have a design and need an app created from it.</div></li><li><label for=\"project-type-design-code\">DESIGN &amp; CODE</label><button id=\"project-type-design-code\" type=\"button\" ng-class=\"{\'selected\': requestType == \'both\'}\" ng-click=\"vm.setType($event, \'both\')\" ng-enter=\"vm.submit()\"><div class=\"starting-at\">starting at</div><div class=\"price\">$10,000</div><div class=\"duration\">about 3 weeks</div></button><div class=\"description\">I have an idea for an app and need it designed and built.</div></li></ul><ul ng-show=\"typeForm.$dirty\" class=\"invalid-messages\"><li ng-show=\"typeForm.type.$error.required\">Please tell us the type of your project.</li></ul><button type=\"submit\" ng-show=\"typeForm.$valid\" class=\"submit\">NEXT</button></form>");
$templateCache.put("views/submit-work-users.directive.html","<h2>Your Users</h2><h3>Who do you want to use your app? How will they interact with it?</h3><form name=\"usersForm\" ng-submit=\"vm.submit()\"><textarea name=\"usageDescription\" placeholder=\"My users will be people who want to get automatic stock  prices while they’re working.\" ng-model=\"usageDescription\" maxlength=\"300\" required=\"required\"></textarea><ul ng-show=\"usersForm.$dirty || usersForm.usageDescription.$dirty\" class=\"invalid-messages\"><li ng-show=\"usersForm.usageDescription.$error.required\">This field is required.</li></ul><button type=\"submit\" ng-show=\"usersForm.$valid\" class=\"submit\">NEXT</button></form>");}]);
(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submit-work.directive.html',
      controller: 'SubmitWorkController as vm',
      scope: {
        workId: '@workId'
      }
    };
  };

  angular.module('appirio-tech-ng-submit-work').directive('submitWork', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function($rootScope, $document) {
    var link;
    link = function(scope, element, attrs) {
      var setClass, setFixed;
      setClass = function(state) {
        element.find('.state-active').removeClass('state-active');
        return element.find('[state="' + state + '"]').addClass('state-active');
      };
      scope.$watch('activeState', setClass, true);
      setFixed = function() {
        if ($document.scrollTop() >= 100) {
          return element.addClass('fixed');
        } else {
          return element.removeClass('fixed');
        }
      };
      $document.bind('scroll', setFixed);
      return setFixed();
    };
    return {
      restrict: 'E',
      templateUrl: 'views/submit-work-aside.directive.html',
      link: link,
      controller: 'SubmitWorkNavController as vm',
      scope: {
        activeState: '=',
        completed: '=',
        name: '=',
        requestType: '=',
        estimate: '='
      }
    };
  };

  directive.$inject = ['$rootScope', '$document'];

  angular.module('appirio-tech-ng-submit-work').directive('submitWorkNav', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submit-work-name.directive.html',
      controller: 'SubmitWorkNameController as vm',
      scope: {
        name: '=',
        save: '&'
      }
    };
  };

  angular.module('appirio-tech-ng-submit-work').directive('submitWorkName', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submit-work-type.directive.html',
      controller: 'SubmitWorkTypeController as vm',
      scope: {
        requestType: '=',
        save: '&'
      }
    };
  };

  angular.module('appirio-tech-ng-submit-work').directive('submitWorkType', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submit-work-brief.directive.html',
      controller: 'SubmitWorkBriefController as vm',
      scope: {
        workId: '=',
        summary: '=',
        save: '&'
      }
    };
  };

  angular.module('appirio-tech-ng-submit-work').directive('submitWorkBrief', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submit-work-competitors.directive.html',
      controller: 'SubmitWorkCompetitorsController as vm',
      scope: {
        competitorApps: '=',
        save: '&'
      }
    };
  };

  angular.module('appirio-tech-ng-submit-work').directive('submitWorkCompetitors', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submit-work-users.directive.html',
      controller: 'SubmitWorkUsersController as vm',
      scope: {
        usageDescription: '=',
        save: '&'
      }
    };
  };

  angular.module('appirio-tech-ng-submit-work').directive('submitWorkUsers', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submit-work-features.directive.html',
      controller: 'SubmitWorkFeaturesController as vm',
      scope: {
        features: '=',
        save: '&'
      }
    };
  };

  angular.module('appirio-tech-ng-submit-work').directive('submitWorkFeatures', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submit-work-designs.directive.html',
      controller: 'SubmitWorkDesignsController as vm',
      scope: {
        workId: '=',
        save: '&'
      }
    };
  };

  angular.module('appirio-tech-ng-submit-work').directive('submitWorkDesigns', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submit-work-estimate.directive.html',
      controller: 'SubmitWorkEstimateController as vm',
      scope: {
        save: '&',
        estimate: '=',
        acceptedTerms: '='
      }
    };
  };

  angular.module('appirio-tech-ng-submit-work').directive('submitWorkEstimate', directive);

}).call(this);

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

(function() {
  'use strict';
  var SubmitWorkController;

  SubmitWorkController = function($scope, SubmitWorkService, NavService, $state, SubmitWorkAPIService) {
    var activate, currentFeatures, currentRequestType, refreshEstimate, setActiveState, setCompleted, vm, watchActiveState, watchCompleted;
    vm = this;
    $scope.activeState = NavService.activeState;
    $scope.completed = NavService.completed;
    vm.work = {
      name: null,
      modelType: 'app-project',
      requestType: null,
      usageDescription: null,
      summary: null,
      competitorApps: [],
      features: []
    };
    vm.estimate = SubmitWorkService.calculateEstimate();
    vm.acceptedTerms = false;
    watchActiveState = function() {
      return NavService.activeState;
    };
    setActiveState = function(activeState) {
      return $scope.activeState = activeState;
    };
    watchCompleted = function() {
      return NavService.completed;
    };
    setCompleted = function(completed) {
      return $scope.completed = completed;
    };
    vm.launch = function() {
      var activateState, i, len, options, ref, ref1, state;
      ref = NavService.states;
      for (i = 0, len = ref.length; i < len; i++) {
        state = ref[i];
        if (!(((ref1 = state.form) != null ? ref1.$valid : void 0) && !state.uploading && !state.hasErrors)) {
          state.form.$setDirty();
          if (!activateState) {
            activateState = state;
          }
        }
      }
      if (activateState) {
        return NavService.setActiveState(activateState);
      } else {
        NavService.reset();
        options = {
          saved: true
        };
        return vm.save(function() {
          return $state.go('view-work-multiple', options);
        });
      }
    };
    vm.save = function(onSuccess) {
      var params, resource;
      if (onSuccess == null) {
        onSuccess = null;
      }
      if (!vm.work.id) {
        resource = SubmitWorkAPIService.save(vm.work);
        resource.$promise.then(function(data) {
          vm.work.id = data.result.content;
          return typeof onSuccess === "function" ? onSuccess(data) : void 0;
        });
        resource.$promise["catch"](function(data) {});
        return resource.$promise["finally"](function(data) {});
      } else {
        params = {
          id: vm.work.id
        };
        resource = SubmitWorkAPIService.put(params, vm.work);
        resource.$promise.then(function(data) {
          return typeof onSuccess === "function" ? onSuccess(data) : void 0;
        });
        resource.$promise["catch"](function(data) {});
        return resource.$promise["finally"](function(data) {});
      }
    };
    currentFeatures = function() {
      return vm.work.features;
    };
    currentRequestType = function() {
      return vm.work.requestType;
    };
    refreshEstimate = function() {
      return vm.estimate = SubmitWorkService.calculateEstimate(vm.work.requestType, vm.work.features, vm.work.costEstimate);
    };
    activate = function() {
      var params, ref, resource;
      $scope.$watch(watchActiveState, setActiveState, true);
      $scope.$watch(watchCompleted, setCompleted, true);
      $scope.$watch(currentFeatures, refreshEstimate);
      $scope.$watch(currentRequestType, refreshEstimate);
      if ((ref = $scope.workId) != null ? ref.length : void 0) {
        params = {
          id: $scope.workId
        };
        resource = SubmitWorkAPIService.get(params);
        resource.$promise.then(function(data) {
          return vm.work = data.result.content;
        });
        resource.$promise["catch"](function(data) {});
        resource.$promise["finally"](function(data) {});
      }
      return vm;
    };
    return activate();
  };

  SubmitWorkController.$inject = ['$scope', 'SubmitWorkService', 'NavService', '$state', 'SubmitWorkAPIService'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkController', SubmitWorkController);

}).call(this);

(function() {
  'use strict';
  var controller;

  controller = function($scope, NavService) {
    var activate, vm;
    vm = this;
    activate = function() {
      return vm;
    };
    return activate();
  };

  controller.$inject = ['$scope', 'NavService'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkNavController', controller);

}).call(this);

(function() {
  'use strict';
  var controller;

  controller = function($scope, NavService) {
    var activate, vm;
    vm = this;
    $scope.$watch('nameForm', function(nameForm) {
      if (nameForm) {
        return NavService.findState('name').form = nameForm;
      }
    });
    vm.submit = function() {
      if ($scope.nameForm.$valid) {
        $scope.save();
        NavService.findState('name').visited = true;
        return NavService.setNextState('name');
      }
    };
    activate = function() {
      return vm;
    };
    return activate();
  };

  controller.$inject = ['$scope', 'NavService'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkNameController', controller);

}).call(this);

(function() {
  'use strict';
  var controller;

  controller = function($scope, NavService) {
    var activate, vm;
    vm = this;
    vm.setType = function(e, type) {
      e.target.focus();
      return $scope.requestType = type;
    };
    vm.submit = function() {
      if ($scope.typeForm.$valid) {
        $scope.save();
        return NavService.setNextState('type');
      }
    };
    activate = function() {
      $scope.$watch('typeForm', function(typeForm) {
        if (typeForm) {
          return NavService.findState('type').form = typeForm;
        }
      });
      return vm;
    };
    return activate();
  };

  controller.$inject = ['$scope', 'NavService'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkTypeController', controller);

}).call(this);

(function() {
  'use strict';
  var controller;

  controller = function($scope, $state, NavService, API_URL) {
    var activate, configureUploader, vm;
    vm = this;
    vm.briefFilename = null;
    vm.question = null;
    vm.showYesNo = true;
    vm.showBrief = false;
    vm.showElevator = false;
    vm.briefUploaderUploading = null;
    vm.briefUploaderHasErrors = null;
    configureUploader = function() {
      var assetType, queryUrl;
      assetType = 'brief';
      queryUrl = API_URL + '/work-files/assets?filter=workId%3D' + $scope.workId + '%26assetType%3D' + assetType;
      return vm.briefUploaderConfig = {
        name: 'briefUploader' + $scope.workId,
        allowMultiple: false,
        queryUrl: queryUrl,
        urlPresigner: API_URL + '/work-files/uploadurl',
        fileEndpoint: API_URL + '/work-files/:fileId',
        saveParams: {
          workId: $scope.workId,
          assetType: assetType
        }
      };
    };
    vm.toggleYes = function() {
      vm.showYesNo = false;
      vm.showBrief = true;
      vm.showElevator = false;
      return NavService.findState('brief').form = $scope.briefForm;
    };
    vm.toggleNo = function() {
      vm.showYesNo = false;
      vm.showBrief = false;
      vm.showElevator = true;
      return NavService.findState('brief').form = $scope.elevatorForm;
    };
    vm.toggleCancel = function() {
      vm.question = null;
      vm.showYesNo = true;
      vm.showBrief = false;
      vm.showElevator = false;
      return NavService.findState('brief').form = $scope.questionForm;
    };
    vm.submitElevator = function() {
      if ($scope.elevatorForm.$valid) {
        $scope.save();
        return NavService.setNextState('brief');
      }
    };
    vm.submitBrief = function() {
      if (!vm.briefUploaderUploading && !vm.briefUploaderHasErrors) {
        $scope.save();
        return NavService.setNextState('brief');
      }
    };
    vm.questionSubmit = function() {
      if (vm.question === 1) {
        vm.toggleYes();
      }
      if (vm.question === 0) {
        return vm.toggleNo();
      }
    };
    activate = function() {
      var ref;
      configureUploader();
      $scope.$watch('workId', function() {
        return configureUploader();
      });
      $scope.$watch('vm.briefUploaderUploading', function(newValue) {
        return NavService.findState('brief').uploading = newValue;
      });
      $scope.$watch('vm.briefUploaderHasErrors', function(newValue) {
        return NavService.findState('brief').hasErrors = newValue;
      });
      $scope.$watch('questionForm', function(questionForm) {
        if (questionForm) {
          return NavService.findState('brief').form = $scope.questionForm;
        }
      });
      if ((ref = $scope.summary) != null ? ref.length : void 0) {
        return vm.toggleNo();
      }
    };
    return activate();
  };

  controller.$inject = ['$scope', '$state', 'NavService', 'API_URL'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkBriefController', controller);

}).call(this);

(function() {
  'use strict';
  var controller;

  controller = function($scope, NavService) {
    var activate, vm;
    vm = this;
    vm.appName = '';
    vm.add = function() {
      var appName, isBlank, isDuplicate;
      appName = vm.appName.trim();
      isBlank = appName.length === 0;
      isDuplicate = $scope.competitorApps.indexOf(appName) > -1;
      if (!isBlank && !isDuplicate) {
        $scope.competitorApps.push(appName);
        vm.appName = '';
        return vm.placeholder = ' ';
      }
    };
    vm.submit = function() {
      if ($scope.competitorForm.$valid) {
        $scope.save();
        return NavService.setNextState('competitors');
      }
    };
    activate = function() {
      $scope.$watch('competitorForm', function(competitorForm) {
        if (competitorForm) {
          return NavService.findState('competitors').form = competitorForm;
        }
      });
      return vm;
    };
    return activate();
  };

  controller.$inject = ['$scope', 'NavService'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkCompetitorsController', controller);

}).call(this);

(function() {
  'use strict';
  var controller;

  controller = function($scope, NavService) {
    var activate, vm;
    vm = this;
    vm.submit = function() {
      if ($scope.usersForm.$valid) {
        $scope.save();
        return NavService.setNextState('users');
      }
    };
    activate = function() {
      $scope.$watch('usersForm', function(usersForm) {
        if (usersForm) {
          return NavService.findState('users').form = usersForm;
        }
      });
      return vm;
    };
    return activate();
  };

  controller.$inject = ['$scope', 'NavService'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkUsersController', controller);

}).call(this);

(function() {
  'use strict';
  var controller, defaultFeatures;

  defaultFeatures = [
    {
      name: 'Login',
      description: 'Users can login / register for your app',
      checked: false
    }, {
      name: 'Social',
      description: 'Users can see data from social networks (FB, Twitter etc.) in your app',
      checked: false
    }, {
      name: 'Profiles',
      description: 'Users can create profiles with personal info',
      checked: false
    }, {
      name: 'Map',
      description: 'A map with a user\'s GPS location that helps them get to places',
      checked: false
    }, {
      name: 'Forms',
      description: 'Users send specific information to you via forms ',
      checked: false
    }, {
      name: 'Listing',
      description: 'Display list of products, images, items that the user can browse or search through',
      checked: false
    }
  ];

  controller = function($scope, NavService) {
    var activate, isDefaultFeature, syncWorkFeatures, vm;
    vm = this;
    vm.newFeatureName = '';
    vm.newFeatureExplanation = '';
    vm.newFeature = false;
    vm.showExample = false;
    vm.add = null;
    vm.deleteFeature = null;
    vm.clickExample = function() {
      return $scope.showExample = true;
    };
    vm.submit = function() {
      if ($scope.featureForm.$valid) {
        $scope.save();
        return NavService.setNextState('features');
      }
    };
    vm.add = function() {
      var isNotBlank;
      isNotBlank = vm.newFeatureName.trim().length > 0 && vm.newFeatureExplanation.trim().length > 0;
      if (isNotBlank) {
        $scope.features.push({
          name: vm.newFeatureName,
          explanation: vm.newFeatureExplanation,
          description: '',
          custom: true
        });
        syncWorkFeatures();
        vm.newFeatureName = '';
        vm.newFeatureExplanation = '';
        return vm.newFeature = false;
      }
    };
    vm.checked = function() {
      var defaultFeature, feature, j, len, ref, results;
      $scope.features = [];
      ref = vm.features;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        feature = ref[j];
        if (feature.checked) {
          defaultFeature = isDefaultFeature(feature.name);
          results.push($scope.features.push({
            name: feature.name,
            explanation: feature.explanation,
            custom: !!defaultFeature
          }));
        } else {
          results.push(void 0);
        }
      }
      return results;
    };
    syncWorkFeatures = function() {
      var defaultFeature, feature, j, len, ref, results;
      vm.features = angular.extend([], defaultFeatures);
      ref = $scope.features;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        feature = ref[j];
        defaultFeature = isDefaultFeature(feature.name);
        if (defaultFeature) {
          defaultFeature.checked = true;
          results.push(defaultFeature.explanation = feature.explanation);
        } else {
          results.push(vm.features.push({
            name: feature.name,
            description: feature.description,
            explanation: feature.explanation,
            checked: true
          }));
        }
      }
      return results;
    };
    isDefaultFeature = function(name) {
      var defaultFeature, j, len;
      for (j = 0, len = defaultFeatures.length; j < len; j++) {
        defaultFeature = defaultFeatures[j];
        if (defaultFeature.name === name) {
          return defaultFeature;
        }
      }
    };
    vm.deleteFeature = function(i) {
      return $scope.features.splice(i, 1);
    };
    activate = function() {
      $scope.$watch('featureForm', function(featureForm) {
        if (featureForm) {
          return NavService.findState('features').form = featureForm;
        }
      });
      $scope.$watch('features', function() {
        return syncWorkFeatures();
      });
      return vm;
    };
    return activate();
  };

  controller.$inject = ['$scope', 'NavService'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkFeaturesController', controller);

}).call(this);

(function() {
  'use strict';
  var controller;

  controller = function($scope, $state, NavService, API_URL) {
    var activate, configureUploader, vm;
    vm = this;
    vm.designsUploaderUploading = null;
    vm.designsUploaderHasErrors = null;
    configureUploader = function() {
      var assetType, queryUrl;
      assetType = 'specs';
      queryUrl = API_URL + '/work-files/assets?filter=workId%3D' + $scope.workId + '%26assetType%3D' + assetType;
      return vm.designsUploaderConfig = {
        name: 'designsUploader' + $scope.workId,
        allowMultiple: true,
        queryUrl: queryUrl,
        urlPresigner: API_URL + '/work-files/uploadurl',
        fileEndpoint: API_URL + '/work-files/:fileId',
        saveParams: {
          workId: $scope.workId,
          assetType: assetType
        }
      };
    };
    vm.submit = function() {
      if (!vm.designsUploaderUploading && !vm.designsUploaderHasErrors) {
        $scope.save();
        return NavService.setNextState('designs');
      }
    };
    activate = function() {
      configureUploader();
      $scope.$watch('workId', function(newValue) {
        return configureUploader();
      });
      $scope.$watch('vm.designsUploaderUploading', function(newValue) {
        return NavService.findState('designs').uploading = newValue;
      });
      $scope.$watch('vm.designsUploaderHasErrors', function(newValue) {
        return NavService.findState('designs').hasErrors = newValue;
      });
      $scope.$watch('designForm', function(designForm) {
        if (designForm) {
          return NavService.findState('designs').form = designForm;
        }
      });
      return vm;
    };
    return activate();
  };

  controller.$inject = ['$scope', '$state', 'NavService', 'API_URL'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkDesignsController', controller);

}).call(this);

(function() {
  'use strict';
  var controller;

  controller = function($scope, SubmitWorkService, NavService) {
    var activate, getActiveState, hideTerms, vm;
    vm = this;
    vm.getEstimate = SubmitWorkService.getEstimate;
    vm.showTerms = false;
    vm.change = function() {
      return NavService.setActiveState('estimate');
    };
    getActiveState = function() {
      return NavService.activeState;
    };
    hideTerms = function(activeState) {
      if (activeState !== 'estimate') {
        return vm.showTerms = false;
      }
    };
    activate = function() {
      $scope.$watch('estimateForm', function(estimateForm) {
        if (estimateForm) {
          return NavService.findState('estimate').form = estimateForm;
        }
      });
      $scope.$watch(getActiveState, hideTerms, true);
      return vm;
    };
    return activate();
  };

  controller.$inject = ['$scope', 'SubmitWorkService', 'NavService'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkEstimateController', controller);

}).call(this);

(function() {
  'use strict';
  var srv, transformResponse;

  transformResponse = function(response) {
    var parsed, ref;
    parsed = JSON.parse(response);
    return (parsed != null ? (ref = parsed.result) != null ? ref.content : void 0 : void 0) || [];
  };

  srv = function($resource, API_URL) {
    var methods, params, url;
    url = API_URL + '/work/:id';
    params = {
      id: '@id'
    };
    methods = {
      put: {
        method: 'PUT'
      }
    };
    return $resource(url, {}, methods);
  };

  srv.$inject = ['$resource', 'API_URL'];

  angular.module('appirio-tech-ng-submit-work').factory('SubmitWorkAPIService', srv);

}).call(this);

(function() {
  'use strict';
  var service;

  service = function() {
    var calculateEstimate;
    calculateEstimate = function(requestType, features, costEstimate) {
      var estimate, reduce;
      if (requestType == null) {
        requestType = null;
      }
      if (features == null) {
        features = null;
      }
      if (costEstimate == null) {
        costEstimate = null;
      }
      estimate = {
        low: 0,
        high: 0
      };
      reduce = function(x, y) {
        x.low += 800;
        x.high += 1200;
        return x;
      };
      if (requestType && features) {
        estimate.low = 2000;
        estimate.high = 2000;
        estimate = features.reduce(reduce, estimate);
        if ((costEstimate != null ? costEstimate.low : void 0) > estimate.low) {
          estimate = costEstimate;
        }
      }
      return estimate;
    };
    return {
      calculateEstimate: calculateEstimate
    };
  };

  service.$inject = [];

  angular.module('appirio-tech-ng-submit-work').factory('SubmitWorkService', service);

}).call(this);

(function () {
  'use strict';

  angular
    .module('appirio-tech-ng-submit-work')
    .factory('NavService', NavService);

  NavService.$inject = ['SubmitWorkService'];
  /* @ngInject */
  function NavService(SubmitWorkService) {

    var service = {

      // variables
      completed      : {},
      states         : [],
      activeState    : '',

      // functions
      setActiveState : null,
      findState      : null,
      setNextState   : null,
      reset          : null

    };

    service.completed = {
      aboutProject : false,
      users        : false,
      features     : false,
      design       : false,
      launch       : false
    };

    // for resetting
    var defaultCompleted = angular.copy(service.completed);

    service.states = [
      { 'key': 'name' },
      { 'key': 'type' },
      { 'key': 'brief' },
      { 'key': 'competitors' },
      { 'key': 'users' },
      { 'key': 'features' },
      { 'key': 'designs' },
      { 'key': 'estimate' }
    ];


    function setCompleted () {
      var aboutProjectStates = ['name', 'type', 'brief', 'competitors'];
      var userState          = service.findState('users');
      var featureState       = service.findState('features');
      var designState        = service.findState('designs');
      var estimateState      = service.findState('estimate');

      service.completed.aboutProject = true;

      angular.forEach(aboutProjectStates, function (aboutProjectState, i) {
        var state = service.findState(aboutProjectState);

        service.completed.aboutProject = service.completed.aboutProject && state && state.form && state.form.$valid && state.visited;
      });
      service.completed.aboutProject = service.completed.aboutProject && userState.visited;
      service.completed.users        = userState && userState.form && userState.form.$valid && featureState.visited;
      service.completed.features     = featureState && featureState.form && featureState.form.$valid && designState.visited;
      service.completed.design       = designState && designState.form && designState.form.$valid && estimateState.visited;
      service.completed.launch       = estimateState && estimateState.form && estimateState.form.$valid;
    }

    function getActiveStateIndex () {
      var index = 0;

      angular.forEach(service.states, function(state, i) {
        if (state.key == service.activeState) {
          index = i;
        }
      });

      return index;
    }

    service.setActiveState = function(key) {
      if (typeof key != 'string') {
        key = key.key;
      }

      service.activeState = key;

      service.findState(key).visited = true;

      setCompleted();

      // SubmitWorkService.save();
    };

    service.findState = function(key) {
      var found;

      angular.forEach(service.states, function(state, i) {
        if (state.key == key) {
          found = state;
        }
      });

      return found;
    };

    service.getStateIndex = function(key) {
      var i;
      for (i = 0; i < service.states.length; i++) {
        if (service.states[i].key == key) {
          return i;
        }
      }
      return -1;
    }

    service.setNextState = function(current) {
      var activeIndex;
      if (current) {
        activeIndex = service.getStateIndex(current);
      } else {
        activeIndex = getActiveStateIndex();
      }
      var nextState = service.states[activeIndex + 1];

      service.setActiveState(nextState);

      return service.activeState;
    };

    service.reset = function() {
      service.setActiveState('name');
      service.states.forEach(function(state) {
        if (state.form) {
        state.form.$setPristine();
        state.form.$setUntouched();
        }
      });
      service.completed = defaultCompleted;
      defaultCompleted = angular.copy(defaultCompleted);
    };

    return service;

  }
})();
