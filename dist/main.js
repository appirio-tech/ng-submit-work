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

angular.module("appirio-tech-ng-submit-work").run(["$templateCache", function($templateCache) {$templateCache.put("views/submit-work.directive.html","<header></header><main ng-scroll-state=\"activeState\"><div id=\"starting-line-name\" class=\"starting-line\"></div><submit-work-name state=\"name\" class=\"state-active state name\"></submit-work-name><div id=\"starting-line-type\" class=\"starting-line\"></div><submit-work-type state=\"type\" class=\"state type\"></submit-work-type><div id=\"starting-line-brief\" class=\"starting-line\"></div><submit-work-brief state=\"brief\" class=\"state brief\"></submit-work-brief><div id=\"starting-line-competitors\" class=\"starting-line\"></div><submit-work-competitors state=\"competitors\" class=\"state competitors\"></submit-work-competitors><div id=\"starting-line-users\" class=\"starting-line\"></div><submit-work-users state=\"users\" class=\"state users\"></submit-work-users><div id=\"starting-line-features\" class=\"starting-line\"></div><submit-work-features state=\"features\" class=\"state features\"></submit-work-features><div id=\"starting-line-designs\" class=\"starting-line\"></div><submit-work-designs state=\"designs\" class=\"state designs\"></submit-work-designs><div id=\"starting-line-estimate\" class=\"starting-line\"></div><submit-work-estimate state=\"estimate\" class=\"state estimate\"></submit-work-estimate><button type=\"button\" ng-click=\"launch()\" ng-class=\"{ active: activeState == \'estimate\' }\" class=\"launch\">SUBMIT PROJECT</button></main><aside id=\"submit-work-aside\" ng-submit-work-aside=\"work\" ng-active-state=\"activeState\" ng-completed=\"completed\" aside-service=\"asideService\"></aside>");
$templateCache.put("views/submit-work-aside.directive.html","<div class=\"fixed-wrapper\"><div class=\"project\"><div class=\"name\">{{ work.name }}</div><div class=\"type\">{{ work.requestType }}</div><div class=\"price\">{{asideService.getEstimate() | estimate}}</div></div><nav role=\"navigation\"><ul id=\"submit-work-nav\"><li ng-class=\"{ completed: completed[\'aboutProject\']}\"><label><div class=\"checkmark-house\"><div class=\"icon checkmark smallest\"></div></div><p>About Project</p></label><ul><li><a state=\"name\" ng-click=\"activeState = \'name\'\" class=\"name current\">Project Name</a></li><li><a state=\"type\" ng-click=\"activeState = \'type\'\" class=\"type current\">Project Type</a></li><li><a state=\"brief\" ng-click=\"activeState = \'brief\'\" class=\"brief current\">Project Specs</a></li><li><a state=\"competitors\" ng-click=\"activeState = \'competitors\'\" class=\"competitors current\">Similar Apps</a></li></ul></li><li ng-class=\"{ completed: completed[\'users\']}\"><label><div class=\"checkmark-house\"><div class=\"icon checkmark smallest\"></div></div><p>App Users</p></label><ul><li><a state=\"users\" ng-click=\"activeState = \'users\'\" class=\"users current\">Your Users</a></li></ul></li><li ng-class=\"{ completed: completed[\'features\']}\"><label><div class=\"checkmark-house\"><div class=\"icon checkmark smallest\"></div></div><p>App Features</p></label><ul><li><a state=\"features\" ng-click=\"activeState = \'features\'\" class=\"features current\">Choose Your Features</a></li></ul></li><li ng-class=\"{ completed: completed[\'design\']}\"><label><div class=\"checkmark-house\"><div class=\"icon checkmark smallest\"></div></div><p>App design</p></label><ul><li><a state=\"designs\" ng-click=\"activeState = \'designs\'\" class=\"designs current\">Upload Design Files</a></li></ul></li><li ng-class=\"{ completed: completed[\'launch\']}\"><label><div class=\"checkmark-house\"><div class=\"icon checkmark smallest\"></div></div><p>Launch App</p></label><ul><li><a state=\"estimate\" ng-click=\"activeState = \'estimate\'\" class=\"estimate current\">Initial Estimate</a></li></ul></li></ul></nav></div>");
$templateCache.put("views/submit-work-brief.directive.html","<h2>About your project</h2><h3 ng-show=\"vm.showYesNo || vm.showBrief\">Do you have a project brief to upload?</h3><h3 ng-show=\"vm.showElevator\">Give us your elevator pitch—a brief explanation of your app.</h3><form name=\"questionForm\" ng-submit=\"vm.questionSubmit()\"><input type=\"hidden\" name=\"question\" required=\"true\" ng-model=\"vm.question\"/><button type=\"submit\" ng-show=\"vm.showYesNo\" ng-click=\"vm.question = 1\" class=\"yes\">YES</button><button type=\"submit\" ng-show=\"vm.showYesNo\" ng-click=\"vm.question = 0\" class=\"no\">NO</button><ul ng-show=\"questionForm.$dirty\" class=\"invalid-messages\"><li ng-show=\"questionForm.question.$error.required\">Please tell us if you have a brief to upload.</li></ul></form><form name=\"briefForm\" ng-show=\"vm.showBrief\"><ap-uploader config=\"vm.briefUploaderConfig\" uploading=\"vm.briefUploaderUploading\" has-errors=\"vm.briefUploaderHasErrors\"></ap-uploader><button type=\"button\" ng-click=\"vm.submitBrief()\" ng-hide=\"!vm.showBrief || vm.uploaderSingleStatus == \'started\' \" class=\"submit\">NEXT</button></form><form name=\"elevatorForm\" ng-show=\"vm.showElevator\" ng-submit=\"vm.submitElevator()\"><textarea name=\"elevator\" placeholder=\"I have an idea for a mobile app that lets people automatically monitor stocks, with automatic updates and alerts.\" ng-model=\"vm.work.summary\" ng-model-options=\"{allowInvalid: true}\" required=\"required\" ng-minlength=\"200\"></textarea><div class=\"character-count\">{{ vm.work.summary.length || \'&nbsp;\' }}</div><ul ng-show=\"elevatorForm.$dirty || elevatorForm.elevator.$dirty\" class=\"invalid-messages\"><li ng-show=\"elevatorForm.summary.$error.required\">This field is required.</li><li ng-show=\"elevatorForm.summary.$error.minlength\">Help our designers understand your needs, please enter at least 200 characters.</li></ul><button type=\"submit\" ng-show=\"elevatorForm.$valid\" class=\"submit\">NEXT</button></form><button ng-hide=\"vm.showYesNo\" ng-click=\"vm.toggleCancel()\" class=\"cancel\">Cancel</button>");
$templateCache.put("views/submit-work-competitors.directive.html","<h2>About your project</h2><h3>What existing apps would be similar to your new app?</h3><form name=\"competitorForm\" ng-submit=\"vm.submit($event)\"><fieldset><input id=\"project-competitors\" type=\"text\" placeholder=\"{{vm.placeholder || \'eTrade Mobile Trading App\'}}\" ng-model=\"vm.appName\" ng-enter=\"vm.add()\"/><button type=\"button\" ng-click=\"vm.add()\" class=\"add-competitor\">+</button></fieldset><h6 ng-show=\"vm.work.competitorApps.length &gt; 0\">Your List of Similar Apps</h6><ul class=\"added-competitors\"><li ng-repeat=\"appName in vm.work.competitorApps\"><div class=\"competitor\">{{appName}}</div><button type=\"button\" ng-click=\"vm.work.competitorApps.splice($index, 1)\" class=\"remove-competitor\">x</button></li></ul><button type=\"submit\" ng-show=\"competitorForm.$valid\" class=\"submit\">NEXT</button></form>");
$templateCache.put("views/submit-work-designs.directive.html","<h2>Designing Your App</h2><h3 class=\"optional\">(optional)</h3><h3>Upload any files you may have that can help us understand your design preferences.</h3><form name=\"designForm\"><fieldset><ap-uploader config=\"vm.designsUploaderConfig\" uploading=\"vm.designsUploaderUploading\" has-errors=\"vm.designsUploaderHasErrors\"></ap-uploader></fieldset><button type=\"button\" ng-click=\"vm.submit()\" ng-show=\"vm.uploaderStatus != \'started\' \" class=\"submit\">NEXT</button></form>");
$templateCache.put("views/submit-work-estimate.directive.html","<h2>Your Estimate</h2><h3>{{vm.getEstimate() | estimate}}</h3><form name=\"estimateForm\"><p>This is our closest estimate for your project based on the information you’ve provided today. When you click \"Submit Project,\" we\'ll process your info and provide a formal project proposal.</p><input id=\"submit-work-accept-terms\" name=\"acceptedTerms\" type=\"checkbox\" ng-model=\"vm.work.acceptedTerms\" required=\"required\" ng-change=\"vm.change()\"/><label for=\"submit-work-accept-terms\">Accept <a ng-click=\"vm.showTerms = true\" class=\"terms-link\">Terms and Conditions</a></label><ul ng-show=\"estimateForm.$dirty || estimateForm.acceptedTerms.$dirty\" class=\"invalid-messages\"><li ng-show=\"estimateForm.acceptedTerms.$error.required\">You must agree to our Terms and Conditions in order to use our services</li></ul></form><modal show=\"vm.showTerms\"><div class=\"terms\"><h3>Terms &amp; Conditions</h3><p>We will rule over all this land, and we will call it...This Land. It was supposed to confuse him, but it just made him peppy. You haven\'t seen my drawer of inappropriate starches? I would appreciate it if one person on this boat would not assume I\'m an evil, lecherous hump. We\'ll have to call it early quantum state phenomenon. Only way to fit 5000 species of mammal on the same boat.</p><p>A whole mess of sparrows turning on a dime, salmon trucking upstream. Well we could grind our enemies into talcum powder with a sledgehammer but, gosh, we did that last night. In every generation there is a chosen one. Say Skywalker, and I smack ya. It has nothing to do with me.</p></div></modal>");
$templateCache.put("views/submit-work-features.directive.html","<h2>What features does your app need?</h2><h3>Select from our list, or describe your own.</h3><form name=\"featureForm\" ng-submit=\"vm.submit()\"><ul class=\"features\"><li ng-repeat=\"feature in vm.work.features\"><input id=\"{{\'feature-\' + feature.id}}\" type=\"checkbox\" ng-model=\"feature.selected\"/><div class=\"label-example\"><label for=\"{{\'feature-\' + feature.id}}\">{{feature.name}}</label><button ng-if=\"!feature.custom\" type=\"button\" ng-click=\"vm.clickExample()\" title=\"View example\" class=\"clean\"></button><button ng-if=\"feature.custom\" type=\"button\" ng-click=\"vm.deleteFeature($index)\" class=\"x\">x</button></div><div class=\"desc\">{{feature.description}}</div><textarea placeholder=\"explain briefly (optional)\" ng-show=\"feature.selected\" ng-model=\"feature.explanation\"></textarea></li><li><input type=\"checkbox\" ng-model=\"vm.newFeature\"/><div class=\"label-example\"><label for=\"{{\'feature-\' + feature.id}}\">Additional Features</label></div><div class=\"desc\">Tell us about other features you need that are not listed here.</div></li></ul><div ng-show=\"vm.newFeature\" class=\"new-feature\"><div class=\"title\"><input type=\"text\" ng-model=\"vm.newFeatureName\" placeholder=\"Name\" ng-enter=\"vm.add()\"/></div><div class=\"explanation-n-add\"><textarea type=\"text\" ng-model=\"vm.newFeatureExplanation\" ng-enter=\"vm.add()\" placeholder=\"Explanation\"></textarea><button type=\"button\" ng-click=\"vm.add()\">+</button></div></div><button type=\"submit\" ng-show=\"featureForm.$valid\" class=\"submit\">NEXT</button></form><div ng-modal=\"showExample\" class=\"example layout-modal\"><button type=\"button\" ng-click=\"showExample = false\" class=\"clean close\"></button><h2>Email Login:</h2><h3>allows users to login with email and username</h3><img src=\"/submit-work/images/phone.png\"/></div>");
$templateCache.put("views/submit-work-name.directive.html","<h2>About your project</h2><h3>Name your project</h3><form name=\"nameForm\" ng-submit=\"vm.submit()\"><input name=\"name\" type=\"text\" placeholder=\"Ex. My Stock Monitor App\" required=\"required\" ng-model=\"vm.work.name\" ng-minlength=\"3\" ng-pattern=\"/^[0-9a-zA-Z].*$/\"/><ul ng-show=\"nameForm.$dirty || nameForm.name.$dirty\" class=\"invalid-messages\"><li ng-show=\"nameForm.name.$error.required\">This field is required.</li><li ng-show=\"nameForm.name.$error.minlength\">The project name must be at least 3 characters long.</li><li ng-show=\"nameForm.name.$error.pattern\">The project name must start with a letter or a number.</li></ul><button type=\"submit\" ng-show=\"nameForm.$valid\" class=\"success\">NEXT</button></form>");
$templateCache.put("views/submit-work-type.directive.html","<h2>About your project</h2><h3>What type of project do you need?</h3><form name=\"typeForm\" ng-submit=\"vm.submit()\"><input name=\"type\" type=\"hidden\" required=\"required\" ng-model=\"vm.work.requestType\"/><ul class=\"project-types\"><li><label for=\"project-type-design\">DESIGN</label><button id=\"project-type-design\" type=\"button\" ng-class=\"{\'selected\': vm.work.requestType == \'design\'}\" ng-click=\"vm.setType($event, \'design\')\" ng-enter=\"vm.submit()\"><div class=\"starting-at\">starting at</div><div class=\"price\">$2,000</div><div class=\"duration\">about 1 week</div></button><div class=\"description\">I need a design for my app.</div></li><li><label for=\"project-type-code\">CODE</label><button id=\"project-type-code\" type=\"button\" ng-class=\"{\'selected\': vm.work.requestType == \'code\'}\" ng-click=\"vm.setType($event, \'code\')\" ng-enter=\"vm.submit()\"><div class=\"starting-at\">starting at</div><div class=\"price\">$5,000</div><div class=\"duration\">about 2 weeks</div></button><div class=\"description\">I have a design and need an app created from it.</div></li><li><label for=\"project-type-design-code\">DESIGN &amp; CODE</label><button id=\"project-type-design-code\" type=\"button\" ng-class=\"{\'selected\': vm.work.requestType == \'both\'}\" ng-click=\"vm.setType($event, \'both\')\" ng-enter=\"vm.submit()\"><div class=\"starting-at\">starting at</div><div class=\"price\">$10,000</div><div class=\"duration\">about 3 weeks</div></button><div class=\"description\">I have an idea for an app and need it designed and built.</div></li></ul><ul ng-show=\"typeForm.$dirty\" class=\"invalid-messages\"><li ng-show=\"typeForm.type.$error.required\">Please tell us the type of your project.</li></ul><button type=\"submit\" ng-show=\"typeForm.$valid\" class=\"submit\">NEXT</button></form>");
$templateCache.put("views/submit-work-users.directive.html","<h2>Your Users</h2><h3>Who do you want to use your app? How will they interact with it?</h3><form name=\"usersForm\" ng-submit=\"vm.submit()\"><textarea name=\"usageDescription\" placeholder=\"My users will be people who want to get automatic stock  prices while they’re working.\" ng-model=\"vm.work.usageDescription\" maxlength=\"300\" required=\"required\"></textarea><ul ng-show=\"usersForm.$dirty || usersForm.usageDescription.$dirty\" class=\"invalid-messages\"><li ng-show=\"usersForm.usageDescription.$error.required\">This field is required.</li></ul><button type=\"submit\" ng-show=\"usersForm.$valid\" class=\"submit\">NEXT</button></form>");}]);
(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submit-work.directive.html',
      controller: 'SubmitWorkController as vm',
      scope: true
    };
  };

  angular.module('appirio-tech-ng-submit-work').directive('submitWork', directive);

}).call(this);

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

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submit-work-name.directive.html',
      controller: 'SubmitWorkNameController as vm',
      scope: true
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
      scope: true
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
      scope: true
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
      scope: true
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
      scope: true
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
      scope: true
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
      scope: true
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
      scope: true
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

  SubmitWorkController = function($scope, SubmitWorkService, NavService, $state) {
    var activate, setActiveState, setCompleted, watchActiveState, watchCompleted;
    $scope.activeState = NavService.activeState;
    $scope.work = SubmitWorkService.work;
    $scope.completed = NavService.completed;
    $scope.asideService = {
      getEstimate: SubmitWorkService.getEstimate
    };
    watchActiveState = function() {
      return NavService.activeState;
    };
    setActiveState = function(activeState) {
      return $scope.activeState = activeState;
    };
    $scope.$watch(watchActiveState, setActiveState, true);
    watchCompleted = function() {
      return NavService.completed;
    };
    setCompleted = function(completed) {
      return $scope.completed = completed;
    };
    $scope.$watch(watchCompleted, setCompleted, true);
    $scope.launch = function() {
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
        return SubmitWorkService.save('Submitted', true).then(function() {
          return $state.go('view-work-multiple', options);
        });
      }
    };
    activate = function() {
      if (!$scope.work) {
        return SubmitWorkService.resetWork();
      }
    };
    return activate();
  };

  SubmitWorkController.$inject = ['$scope', 'SubmitWorkService', 'NavService', '$state'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkController', SubmitWorkController);

}).call(this);

/*global form:true */
(function () {
  'use strict';

  angular
    .module('appirio-tech-ng-submit-work')
    .controller('SubmitWorkNameController', SubmitWorkNameController);

  SubmitWorkNameController.$inject = ['$scope', 'SubmitWorkService', 'NavService'];

  function SubmitWorkNameController($scope, SubmitWorkService, NavService) {
    var vm   = this;
    vm.title = 'Name';
    vm.work  = SubmitWorkService.work;
    vm.submit;

    $scope.$watch('nameForm', function(nameForm) {
      if (nameForm) {
        NavService.findState('name').form = nameForm;
      }
    });

    vm.submit = function () {
      if ($scope.nameForm.$valid) {
        NavService.findState('name').visited = true;
        NavService.setNextState('name');
      }
    };

  }
})();

(function () {
  'use strict';

  angular
    .module('appirio-tech-ng-submit-work')
    .controller('SubmitWorkTypeController', SubmitWorkTypeController);

  SubmitWorkTypeController.$inject = ['$scope', 'SubmitWorkService', 'NavService'];

  function SubmitWorkTypeController($scope, SubmitWorkService, NavService) {
    var vm   = this;
    vm.title = 'Type';
    vm.work  = SubmitWorkService.work;
    vm.setType;
    vm.submit;

    activate();

    function activate() {
      vm.work = SubmitWorkService.work;
    }

    vm.setType = function (e, type) {
      e.target.focus();
      vm.work.requestType = type;
    }

    $scope.$watch('typeForm', function(typeForm) {
      if (typeForm) {
        NavService.findState('type').form = typeForm;
      }
    });

    vm.submit = function () {
      if ($scope.typeForm.$valid) {
        NavService.setNextState('type');
      }
    };
  }
})();

/*global form:true */
(function () {
  'use strict';

  angular
    .module('appirio-tech-ng-submit-work')
    .controller('SubmitWorkBriefController', SubmitWorkBriefController);

  SubmitWorkBriefController.$inject = ['$scope', '$state', 'SubmitWorkService', 'NavService', 'API_URL'];
  /* @ngInject */
  function SubmitWorkBriefController($scope, $state, SubmitWorkService, NavService, API_URL) {
    var vm                    = this;
    vm.title                  = 'Brief';
    vm.work                   = SubmitWorkService.work;
    vm.briefFilename          = null;
    vm.question               = null;
    vm.showYesNo              = true;
    vm.showBrief              = false;
    vm.showElevator           = false;
    vm.briefUploaderUploading = null;
    vm.briefUploaderHasErrors = null;
    vm.toggleYes;
    vm.toggleNo;
    vm.toggleCancel;
    vm.submitElevator;
    vm.submitBrief;
    vm.questionSubmit;

    function configureUploader() {
      var workId = vm.work.id
      var assetType = 'brief';

      vm.briefUploaderConfig = {
        name: 'briefUploader' + workId,
        allowMultiple: false,
        queryUrl: API_URL + '/work-files/assets?filter=workId%3D' + workId + '%26assetType%3D' + assetType,
        urlPresigner: API_URL + '/work-files/uploadurl',
        fileEndpoint: API_URL + '/work-files/:fileId',
        saveParams: {
          workId: workId,
          assetType: assetType
        }
      };
    }

    // Configure uploader initially so the view can render
    configureUploader();

    // Update the uploader configuration once we have a work id
    $scope.$watch('vm.work.id', function(newValue) {
      configureUploader();
    });

    vm.toggleYes = function() {
      vm.showYesNo    = false;
      vm.showBrief    = true;
      vm.showElevator = false;
      NavService.findState('brief').form = $scope.briefForm;
    };

    vm.toggleNo = function() {
      vm.showYesNo    = false;
      vm.showBrief    = false;
      vm.showElevator = true;
      NavService.findState('brief').form = $scope.elevatorForm;
    };

    vm.toggleCancel = function() {
      vm.question     = null;
      vm.showYesNo    = true;
      vm.showBrief    = false;
      vm.showElevator = false;
      NavService.findState('brief').form = $scope.questionForm;
    };

    vm.submitElevator = function () {
      if ($scope.elevatorForm.$valid) {
        NavService.setNextState('brief');
      }
    };

    vm.submitBrief = function () {
      if (!vm.briefUploaderUploading && !vm.briefUploaderHasErrors) {
        NavService.setNextState('brief');
      }
    };

    vm.questionSubmit = function () {
      if (vm.question === 1) {
        vm.toggleYes();
      }
      else if (vm.question === 0) {
        vm.toggleNo();
      }
    };

    $scope.$watch('vm.briefUploaderUploading', function(newValue) {
      NavService.findState('brief').uploading = newValue;
    });

    $scope.$watch('vm.briefUploaderHasErrors', function(newValue) {
      NavService.findState('brief').hasErrors = newValue;
    });

    $scope.$watch('questionForm', function(questionForm) {
      if (questionForm) {
        NavService.findState('brief').form = $scope.questionForm;
      }
    });

    function activate() {
      if (vm.work.summary && vm.work.summary.length > 1) {
       vm.toggleNo();
      }
    }

    activate();

  }
})();

/*global form:true */
(function () {
  'use strict';

  angular
    .module('appirio-tech-ng-submit-work')
    .controller('SubmitWorkCompetitorsController', SubmitWorkCompetitorsController);

  SubmitWorkCompetitorsController.$inject = ['$scope', 'SubmitWorkService', 'NavService'];

  function SubmitWorkCompetitorsController($scope, SubmitWorkService, NavService) {
    var vm     = this;
    vm.title   = 'Competitors';
    vm.appName = '';
    vm.work    = SubmitWorkService.work;
    vm.add;
    vm.submit;

    vm.add = function() {
      var appName = vm.appName.trim();
      var isBlank = appName.length === 0;
      var isDuplicate = vm.work.competitorApps.indexOf(appName) > -1;
      if (!isBlank && !isDuplicate) {
        vm.work.competitorApps.push(appName);
        vm.appName = '';
        vm.placeholder = ' ';
      }
    }

    vm.submit = function () {
      if ($scope.competitorForm.$valid) {
        NavService.setNextState('competitors');
      }
    };

    $scope.$watch('competitorForm', function(competitorForm) {
      if (competitorForm) {
        NavService.findState('competitors').form = competitorForm;
      }
    });
  }
})();

/*global form:true */
(function () {
  'use strict';

  angular
    .module('appirio-tech-ng-submit-work')
    .controller('SubmitWorkUsersController', SubmitWorkUsersController);

  SubmitWorkUsersController.$inject = ['$scope', 'SubmitWorkService', 'NavService'];

  function SubmitWorkUsersController($scope, SubmitWorkService, NavService) {
    var vm   = this;
    vm.title = 'Users';
    vm.work  = SubmitWorkService.work;
    vm.submit;

    vm.submit = function () {
      if ($scope.usersForm.$valid) {
        NavService.setNextState('users');
      }
    };

    $scope.$watch('usersForm', function(usersForm) {
      if (usersForm) {
        NavService.findState('users').form = usersForm;
      }
    });
  }
})();

/*global form:true */
(function () {
  'use strict';

  angular
    .module('appirio-tech-ng-submit-work')
    .controller('SubmitWorkFeaturesController', SubmitWorkFeaturesController);

  SubmitWorkFeaturesController.$inject = ['$scope', 'SubmitWorkService', 'NavService'];
  /* @ngInject */
  function SubmitWorkFeaturesController($scope, SubmitWorkService, NavService) {
    var vm                   = this;
    vm.title                 = 'Features';
    vm.work                  = SubmitWorkService.work;
    vm.newFeatureName        = '';
    vm.newFeatureExplanation = '';
    vm.newFeature            = false;
    vm.showExample           = false;
    vm.add                   = null;
    vm.deleteFeature         = null;

    vm.clickExample = function () {
      $scope.showExample = true;
    };

    vm.submit = function () {
      if ($scope.featureForm.$valid) {
        NavService.setNextState('features');
      }
    };

    $scope.$watch('featureForm', function(featureForm) {
      if (featureForm) {
        NavService.findState('features').form = featureForm;
      }
    });

    vm.add = function() {
      if (vm.newFeatureName.trim().length > 0 && vm.newFeatureExplanation.trim().length > 0) {
        vm.work.features.push({
          id         : vm.newFeatureName,
          name       : vm.newFeatureName,
          explanation : vm.newFeatureExplanation,
          description : '',
          custom      : true,
          selected    : true
        });

        vm.newFeatureName        = '';
        vm.newFeatureExplanation = '';
        vm.newFeature            = false;
      }
    };

    vm.deleteFeature = function(i) {
      vm.work.features.splice(i, 1);
    };

  }
})();

/*global form:true */
(function () {
  'use strict';

  angular
    .module('appirio-tech-ng-submit-work')
    .controller('SubmitWorkDesignsController', SubmitWorkDesignsController);

  SubmitWorkDesignsController.$inject = ['$scope', '$state', 'SubmitWorkService', 'NavService', 'API_URL'];
  /* @ngInject */
  function SubmitWorkDesignsController($scope, $state, SubmitWorkService, NavService, API_URL) {
    var vm                      = this;
    vm.title                    = 'Designs';
    vm.work                     = SubmitWorkService.work;
    vm.designsUploaderUploading = null;
    vm.designsUploaderHasErrors = null;
    vm.submit;

    function configureUploader() {
      var workId = vm.work.id
      var assetType = 'specs';

      vm.designsUploaderConfig = {
        name: 'designsUploader' + workId,
        allowMultiple: true,
        queryUrl: API_URL + '/work-files/assets?filter=workId%3D' + workId + '%26assetType%3D' + assetType,
        urlPresigner: API_URL + '/work-files/uploadurl',
        fileEndpoint: API_URL + '/work-files/:fileId',
        saveParams: {
          workId: workId,
          assetType: assetType
        }
      };
    }

    // Configure uploader initially so the view can render
    configureUploader();

    // Update the uploader configuration once we have a work id
    $scope.$watch('vm.work.id', function(newValue) {
      configureUploader();
    });

    vm.submit = function () {
      if (!vm.designsUploaderUploading && !vm.designsUploaderHasErrors) {
        NavService.setNextState('designs');
      }
    };

    $scope.$watch('vm.designsUploaderUploading', function(newValue) {
      NavService.findState('designs').uploading= newValue;
    });

    $scope.$watch('vm.designsUploaderHasErrors', function(newValue) {
      NavService.findState('designs').hasErrors= newValue;
    });

    $scope.$watch('designForm', function(designForm) {
      if (designForm) {
        NavService.findState('designs').form = designForm;
      }
    });

  }
})();

(function () {
  'use strict';

  angular
    .module('appirio-tech-ng-submit-work')
    .controller('SubmitWorkEstimateController', SubmitWorkEstimateController);

  SubmitWorkEstimateController.$inject = ['$scope', 'SubmitWorkService', 'NavService'];

  function SubmitWorkEstimateController($scope, SubmitWorkService, NavService) {
    var vm         = this;
    vm.title       = 'Estimate';
    vm.work        = SubmitWorkService.work;
    vm.getEstimate = SubmitWorkService.getEstimate;
    vm.showTerms   = false;
    vm.change;

    $scope.$watch('estimateForm', function(estimateForm) {
      if (estimateForm) {
        NavService.findState('estimate').form = estimateForm;
      }
    });

    // Hide terms when no longer on estimate
    $scope.$watch(function () {
       return NavService.activeState;
     }, function (activeState) {
      if (activeState != 'estimate') {
        vm.showTerms = false;
      }
    }, true);

    // Mark completed when terms is accepted
    vm.change = function () {
      NavService.setActiveState('estimate');
    };
  }
})();

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

  angular.module('appirio-tech-ng-submit-work').factory('WorkAPIService', srv);

}).call(this);

(function () {
  'use strict';

  angular
    .module('appirio-tech-ng-submit-work')
    .factory('SubmitWorkService', SubmitWorkService);

  SubmitWorkService.$inject = ['$q', 'WorkAPIService', 'FeatureService'];
  /* @ngInject */
  function SubmitWorkService($q, WorkAPIService, FeatureService) {
    // local used by "save" function
    var created = false;

    var service = {

      // variables
      work           : {},

      // functions
      save           : null,
      savePrice      : null,
      getEstimate    : null,
      resetWork      : null,
      initializeWork : null

    };

    // using a default helps with resetting after submit
    var defaultWork = {
      name             : null,
      modelType        : 'app-project',
      requestType      : null,
      usageDescription : null,
      summary          : null,
      status           : 'Incomplete',
      competitorApps   : [],
      features         : [],
      costEstimate     : { low: 0, high: 0 },
      acceptedTerms    : false
    };

    service.work = angular.copy(defaultWork);

    // these are all the fields we'll actually submit on
    // a POST or PUT. everything else is filtered.
    var submittableFields = [
      'name',
      'requestType',
      'usageDescription',
      'summary',
      'competitorApps',
      'status',
      'features',
      'modelType'
    ];

    service.save = function(status, reset) {
      var deferred = $q.defer();
      var work = {};

      // copy only submittable fields
      for (var key in service.work) {
        if (submittableFields.indexOf(key) >= 0) {
          work[key] = angular.copy(service.work[key]);
        }
      }

      if (status) {
        work.status = status;
      }

      // need to filter out stuff used for front-end processing
      work.features = work.features.filter(function(feature) {
        return feature.selected;
      }).map(function(feature) {
        return {
          name        : feature.name,
          description : feature.description,
          explanation : feature.explanation,
          custom      : feature.custom
        };
      });

      if (!created) {
        var resource = WorkAPIService.save(work);

        resource.$promise.then(function(data) {
          created = true;
          service.id = data.result.content;
          service.work.id = service.id;
          service.savePrice();
          deferred.resolve(data);
        });

        resource.$promise.catch(function(e) {
          $q.reject(e);
        });
      } else {
        work.id = service.id;
        service.work.id = service.id;
        var resource = WorkAPIService.put(work)

        resource.$promise.then(function(data) {
          deferred.resolve(data);
        });

        resource.$promise.catch(function(e) {
          $q.reject(e);
        });
      }
      if (reset) {
        service.resetWork();
      }
      return deferred.promise;
    };

    service.getEstimate = function() {
      var work = service.work;
      if (work.requestType) {
        // this is a calculation of the estimate
        var estimate = work.features.reduce(function(x, y) {
          if (y.selected) {
            x.low += 800;
            x.high += 1200;
          }
          return x;
        }, {low: 2000, high: 2000});
        if (work.costEstimate && work.costEstimate.low > estimate.low) {
          return work.costEstimate;
        } else {
          return estimate;
        }
      } else {
        return {low: 0, high: 0};
      }
    };

    service.savePrice = function() {
      var resource = WorkAPIService.get({id: service.id})
      resource.$promise.then(function(data) {
        service.work.costEstimate = data.result.content.costEstimate;
      });
    };

    service.resetWork = function() {
      created = false;
      if (service.id) delete service.id;
      service.work = angular.copy(defaultWork);
      initializeFeatures();
    };

    function initializeFeatures() {
      var deferred = $q.defer();

      // Get all selectable features
      FeatureService.getFeatures().then(function(features) {

        // Create a list of saved features
        var selectedFeatures = {};
        // ...and a list of custom features
        var customFeatures = [];

        service.work.features.forEach(function(feature) {
          selectedFeatures[feature.name] = feature;
          if (feature.custom) {
            feature.selected = true;
            customFeatures.push(feature);
          }
        });

        // Set any features that are currently saved to selected
        features.forEach(function(feature) {
          var savedFeature = selectedFeatures[feature.name];
          if (savedFeature) {
            feature.selected = true;
            feature.explanation = savedFeature.explanation;
          }
        });
        features = features.concat(customFeatures);

        // Overwrite features from server with our cleaned up list
        service.work.features = features;
        deferred.resolve();
      });

      return deferred.promise;
    }

    service.initializeWork = function(id) {
      var deferred = $q.defer();
      var resource = WorkAPIService.get({id: id});
      resource.$promise.then(function(data) {
        service.work = data.result.content;
        service.id = id;
        created = true;
        initializeFeatures().then(function(){
          deferred.resolve(service.work);
        });
      });
      return deferred.promise;
    };

    return service;

  }
})();

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

      SubmitWorkService.save();
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
