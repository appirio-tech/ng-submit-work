(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-api-services', 'appirio-tech-ng-optimist', 'duScroll'];

  angular.module('appirio-tech-ng-submit-work', dependencies);

}).call(this);

angular.module("appirio-tech-ng-submit-work").run(["$templateCache", function($templateCache) {$templateCache.put("views/nav.html","<ul class=\"navs flex-center\"><li ng-class=\"{ active: vm.section == 1 }\"><a ui-sref=\"submit-work-features({ id: vm.workId })\">Features</a></li><li ng-class=\"{ active: vm.section == 2 }\"><a ui-sref=\"submit-work-visuals({ id: vm.workId })\">Visual Design</a></li><li ng-if=\"vm.projectType == \'DESIGN_AND_CODE\'\" ng-class=\"{ active: vm.section == 3 }\"><a ui-sref=\"submit-work-development({ id: vm.workId })\">Development</a></li></ul><progress value=\"{{ vm.section }}\" max=\"{{ vm.numberOfSections }}\"></progress>");
$templateCache.put("views/submit-work-type.directive.html","<header><h1>How to create a new project</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></header><form ng-submit=\"vm.validateAllSections()\"><div flush-height=\"flush-height\" class=\"flush-height flex column\"><div id=\"app-name\" class=\"interactive flex column center flex-grow\"><input type=\"text\" placeholder=\"Name your project...\" ng-blur=\"vm.validateSection(\'app-name\', \'platform-details\', \'name\')\" ng-model=\"vm.name\" ng-class=\"{error: vm.nameError}\" class=\"wider\"/><p ng-if=\"vm.nameError &amp;&amp; !vm.name.length\" class=\"error\">Please enter an app name.</p></div><button type=\"button\" ng-click=\"vm.validateSection(\'platform-details\', \'name\', true)\" class=\"wider continue action\">continue</button></div><div full-height=\"full-height\" class=\"full-height flex column\"><div id=\"platform-details\" class=\"interactive flex column center flex-grow\"><h2>IOS <strong>platform details</strong></h2><ul class=\"target-platforms\"><li><h4>Devices</h4><hr/><ul><li ng-repeat=\"device in vm.devices\"><checkbox label=\"{{device.name}}\" ng-model=\"device.selected\"></checkbox></li></ul></li><li><h4>Orientation</h4><hr/><ul><li ng-repeat=\"orientation in vm.orientations\"><checkbox label=\"{{orientation.name}}\" ng-model=\"orientation.selected\"></checkbox></li></ul></li></ul><p ng-if=\"vm.devicesError\" class=\"error\">Please choose a device.</p><p ng-if=\"vm.orientationsError\" class=\"error\">Please choose an orientation.</p></div><button type=\"button\" ng-click=\"vm.validateSection(\'type-details\', [\'devices\', \'orientations\'], true)\" class=\"wider continue action\">continue</button></div><div full-height=\"full-height\" class=\"full-height flex column\"><div id=\"type-details\" class=\"interactive flex column center flex-grow\"><h2>What <strong>type of work</strong> are you looking for?</h2><ul class=\"type flex-center\"><li ng-repeat=\"projectType in vm.projectTypes\"><h4>{{projectType.name}}</h4><img src=\"{{ projectType.imgUrl }}\"/><p>{{ projectType.description }}</p><button type=\"button\" selectable=\"true\" ng-model=\"vm.projectType\" value=\"projectType.id\"></button></li></ul><p ng-if=\"vm.projectTypeError\" class=\"error\">Please choose a type of work.</p></div><button type=\"button\" ng-click=\"vm.validateSection(\'brief-details\', \'projectType\', true)\" class=\"wider continue action\">continue</button></div><div full-height=\"full-height\" class=\"full-height flex column has-loader\"><loader ng-if=\"vm.loading\"></loader><div id=\"brief-details\" class=\"interactive flex column center flex-grow\"><h2>Can you <strong>share a brief</strong> overview?</h2><textarea placeholder=\"E.g. I need a mobile HR application with social features to support my growing organization\" ng-model=\"vm.brief\" class=\"brief\"></textarea><button type=\"submit\" class=\"action continue wider\">Create Project</button></div></div></form><modal show=\"vm.showSuccessModal\" background-click-close=\"background-click-close\"><div class=\"success\"><h2>Awesome!</h2><p>Your {{ vm.name }} is set up now</p><p>Share your email to signup and we\'ll be sure to send a project link.</p><form><input type=\"email\" required=\"required\" class=\"wider\"/><button type=\"submit\" class=\"wider\">Submit</button></form></div></modal>");
$templateCache.put("views/submit-work-features.directive.html","<header><ul class=\"navs flex-center\"><li ng-class=\"{ active: vm.section == 1 }\"><a ui-sref=\"submit-work-features({ id: vm.workId })\">Features</a></li><li ng-class=\"{ active: vm.section == 2 }\"><a ui-sref=\"submit-work-visuals({ id: vm.workId })\">Visual Design</a></li><li ng-if=\"vm.projectType == \'DESIGN_AND_CODE\'\" ng-class=\"{ active: vm.section == 3 }\"><a ui-sref=\"submit-work-development({ id: vm.workId })\">Development</a></li></ul><progress value=\"{{ vm.section }}\" max=\"{{ vm.numberOfSections }}\"></progress><div class=\"house\"><div class=\"icon warning biggest\"></div></div><h1>Specify Features</h1><p>Tell us what features we need to include in your new app.</p></header><div flush-height=\"flush-height\" class=\"flush-height flex column\"><ul class=\"interactive flex center middle flex-grow selectable-choices\"><li><div class=\"icon warning big\"></div><h3>Define features</h3><p>UX design greating the usability, accessibility, and costume journey.</p><button ng-click=\"vm.showFeatures()\" class=\"action wide\">select</button></li><li><div class=\"icon warning big\"></div><h3>Upload document</h3><p>Upload your specs or any documents you have.</p><button ng-click=\"vm.showUpload()\" class=\"action wide\">select</button></li></ul><a ui-sref=\"submit-work-visuals({ id: vm.workId })\" class=\"button continue wider action\">go to design</a></div><modal show=\"vm.showFeaturesModal\" background-click-close=\"background-click-close\" class=\"full define-features\"><h2>Data booklet mobile app <strong>features</strong></h2><main class=\"flex flex-grow stretch\"><ul class=\"features flex column\"><li><ul><li ng-repeat=\"feature in vm.features\"><button ng-click=\"vm.activateFeature(feature)\" class=\"widest clean\"><div ng-class=\"{selected: feature.selected}\" class=\"icon warning\"></div><span>{{ feature.title }}</span></button></li></ul></li><li class=\"flex-grow\"><button ng-click=\"vm.toggleDefineFeatures()\" class=\"widest clean\"><span>Define a new feature</span><div class=\"icon\">+</div></button></li></ul><ul class=\"contents flex column flex-grow\"><li class=\"flex flex-grow\"><div ng-hide=\"vm.showDefineFeaturesForm\" ng-class=\"{active: !vm.activeFeature}\" class=\"default active\"><h4>Select and define features for your app</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></div><div ng-hide=\"vm.showDefineFeaturesForm\" ng-class=\"{active: vm.activeFeature}\" class=\"description\"><h4>Select and define features for your app</h4><h5>{{ vm.activeFeature.title }} description</h5><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><textarea placeholder=\"Notes...\" ng-model=\"vm.activeFeature.notes\" class=\"widest\"></textarea><button ng-if=\"!vm.activeFeature.selected\" ng-click=\"vm.applyFeature()\" class=\"wider action\">apply feature</button><button ng-if=\"vm.activeFeature.selected\" ng-click=\"vm.removeFeature()\" class=\"wider action\">remove feature</button></div><form ng-submit=\"vm.addCustomFeature()\" ng-class=\"{active: vm.showDefineFeaturesForm}\" class=\"new-feature\"><h4>Define a new feature</h4><label>New feature title</label><input type=\"text\" ng-model=\"vm.customFeature.title\" required=\"required\" class=\"widest\"/><p class=\"error\">This feature name already exists, please try another.</p><label>New feature description</label><textarea ng-model=\"vm.customFeature.description\" required=\"required\" class=\"widest\"></textarea><button type=\"submit\" class=\"wide action\">add</button><button type=\"button\" ng-click=\"vm.hideCustomFeatures()\" class=\"wide cancel\">Cancel</button></form><div class=\"example flex-grow\"><div class=\"phone\"></div></div></li><li class=\"flex center space-between\"><div class=\"count\">{{vm.selectedFeaturesCount}} features added</div><button ng-click=\"vm.save()\" class=\"wider action\">Save</button></li></ul></main></modal><modal show=\"vm.showUploadModal\" background-click-close=\"background-click-close\" class=\"upload-documents\"><div class=\"upload\"><div class=\"icon upload\"></div><h2>Upload <strong>documents</strong></h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><ap-uploader config=\"vm.uploaderConfig\" uploading=\"vm.uploaderUploading\" has-errors=\"vm.uploaderHasErrors\"></ap-uploader></div></modal>");
$templateCache.put("views/submit-work-visuals.directive.html","<loader ng-if=\"vm.loading\"></loader><header><ul class=\"navs flex-center\"><li ng-class=\"{ active: vm.section == 1 }\"><a ui-sref=\"submit-work-features({ id: vm.workId })\">Features</a></li><li ng-class=\"{ active: vm.section == 2 }\"><a ui-sref=\"submit-work-visuals({ id: vm.workId })\">Visual Design</a></li><li ng-if=\"vm.projectType == \'DESIGN_AND_CODE\'\" ng-class=\"{ active: vm.section == 3 }\"><a ui-sref=\"submit-work-development({ id: vm.workId })\">Development</a></li></ul><progress value=\"{{ vm.section }}\" max=\"{{ vm.numberOfSections }}\"></progress><div class=\"house\"><div class=\"icon warning biggest\"></div></div><h1>Visual Design</h1><p>Help us define the visual style of your mobile app.</p></header><div flush-height=\"flush-height\" class=\"flush-height flex column\"><ul ng-class=\"{active: vm.showPaths}\" class=\"interactive flex center flex-grow middle selectable-choices\"><li><div class=\"icon warning big\"></div><h3>Choose Styles</h3><p>Pick few fonts style for your mobile app</p><button ng-click=\"vm.showChooseStyles()\" class=\"action wide\">select</button></li><li><div class=\"icon warning big\"></div><h3>Upload styles</h3><p>Pick color palette for your mobile app</p><button ng-click=\"vm.showUploadStyles()\" class=\"action wide\">select</button></li><li><div class=\"icon warning big\"></div><h3>Get style from url</h3><p>Pick graphic style for your mobile app.</p><button ng-click=\"vm.showUrlStyles()\" class=\"action wide\">select</button></li></ul><a ng-if=\"vm.projectType == \'DESIGN_AND_CODE\'\" ui-sref=\"submit-work-development({ id: vm.workId })\" class=\"button wider action continue\">go to development</a><div class=\"design-buttons\"><button ng-if=\"vm.projectType != \'DESIGN_AND_CODE\'\" ng-click=\"vm.save(true, false)\" class=\"continue wider save\">save</button><button ng-if=\"vm.projectType != \'DESIGN_AND_CODE\'\" ng-click=\"vm.save(true, true)\" class=\"contine wider kick-off action\">kick off project</button></div></div><modal show=\"vm.showUploadStylesModal\" background-click-close=\"background-click-close\" class=\"upload-documents\"><div class=\"upload\"><div class=\"icon upload\"></div><h2>Upload <strong>documents</strong></h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><ap-uploader config=\"vm.uploaderConfig\" uploading=\"vm.uploaderUploading\" has-errors=\"vm.uploaderHasErrors\"></ap-uploader></div></modal><modal show=\"vm.showUrlStylesModal\" background-click-close=\"background-click-close\" class=\"enter-url\"><div class=\"upload\"><div class=\"icon upload\"></div><h2>Enter your <strong>url</strong></h2><p>You can enter your website address and we\'ll grab your colors, fonts amd ocpms to use when designing your new app.</p><form ng-submit=\"vm.save()\"><input type=\"url\" placeholder=\"http://www.example.com\" ng-model=\"vm.url\" required=\"required\" class=\"wide\"/><button type=\"submit\" class=\"wider action\">enter</button></form></div></modal><modal show=\"vm.showChooseStylesModal\" background-click-close=\"background-click-close\" class=\"full choose-styles\"><ul class=\"nav\"><li><button ng-click=\"vm.viewPrevious()\" class=\"clean\">&lt;</button></li><li><button ng-click=\"vm.activateModal(\'fonts\')\" class=\"clean\">fonts</button></li><li><button ng-click=\"vm.activateModal(\'colors\')\" class=\"clean\">colors</button></li><li><button ng-click=\"vm.activateModal(\'icons\')\" class=\"clean\">icons</button></li><li><button ng-click=\"vm.viewNext()\" class=\"clean\">&gt;</button></li></ul><main ng-show=\"vm.activeStyleModal == \'fonts\' \" class=\"fonts flex column center flex-grow\"><h2>Tell us your <strong>font preference</strong></h2><ul class=\"or-choices flex middle center\"><li ng-repeat-start=\"font in vm.fonts\"><h3>{{font.name}}</h3><hr/><p>{{font.description}}</p><ul ng-if=\"font.name == \'Serif\' \" class=\"samples\"><li class=\"baskerville\">Baskerville is a serif font.</li><li class=\"times\">Times New Roman is a serif font</li><li class=\"courier\">Courier is a serif font.</li></ul><ul ng-if=\"font.name == \'Sans Serif\' \" class=\"samples\"><li class=\"sofia\">Sofia is a sans-serif font.</li><li class=\"arial\">Arial is a sans-serif font.</li><li class=\"museo\">Museo Sans is a sans-serif font.</li></ul><button selectable=\"selectable\" type=\"button\" ng-model=\"vm.font\" value=\"font.id\"></button></li><li ng-repeat-end=\"ng-repeat-end\" ng-if=\"font.name == \'Serif\' \" class=\"or\"><div class=\"house\">OR</div></li></ul></main><main ng-show=\"vm.activeStyleModal == \'colors\' \" class=\"colors flex column center flex-grow\"><h2>Tell us <strong>the colors</strong> you like</h2><ul class=\"flex center\"><li ng-repeat=\"color in vm.colors\"><img src=\"{{ color.imgUrl }}\" width=\"150\"/><p>{{ color.name }}</p><button type=\"button\" selectable=\"selectable\" value=\"\"></button></li></ul></main><main ng-show=\"vm.activeStyleModal == \'icons\' \" class=\"icons flex column center flex-grow\"><h2>Tell us <strong>the icons</strong> you like</h2><ul class=\"flex center\"><li ng-repeat=\"icon in vm.icons\"><div class=\"icon\"></div><p>{{icon.name}}</p><p class=\"description\">{{icon.description}}</p><button type=\"button\" selectable=\"selectable\" ng-model=\"vm.icon\" value=\"icon.id\"></button></li></ul></main><footer><button ng-hide=\"vm.backButtonDisabled\" ng-click=\"vm.viewPrevious()\" class=\"wider\">back</button><button ng-hide=\"vm.nextButtonDisabled\" ng-click=\"vm.viewNext()\" class=\"action wider\">next</button><button ng-show=\"vm.showFinishDesignButton\" ng-click=\"vm.save()\" class=\"action wider\">Save</button></footer></modal>");
$templateCache.put("views/submit-work-development.directive.html","<header><ul class=\"navs flex-center\"><li ng-class=\"{ active: vm.section == 1 }\"><a ui-sref=\"submit-work-features({ id: vm.workId })\">Features</a></li><li ng-class=\"{ active: vm.section == 2 }\"><a ui-sref=\"submit-work-visuals({ id: vm.workId })\">Visual Design</a></li><li ng-if=\"vm.projectType == \'DESIGN_AND_CODE\'\" ng-class=\"{ active: vm.section == 3 }\"><a ui-sref=\"submit-work-development({ id: vm.workId })\">Development</a></li></ul><progress value=\"{{ vm.section }}\" max=\"{{ vm.numberOfSections }}\"></progress><div class=\"house\"><div class=\"icon warning biggest\"></div></div><h1>Development</h1><p>Help us understand the technical requirements of your app.</p></header><modal show=\"vm.showUploadModal\" background-click-close=\"background-click-close\" class=\"upload-documents\"><div class=\"upload\"><div class=\"icon upload\"></div><h2>Upload your <strong>Development specs</strong></h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><ap-uploader config=\"vm.uploaderConfig\" uploading=\"vm.uploaderUploading\" has-errors=\"vm.uploaderHasErrors\"></ap-uploader><button class=\"wider continue action\">kick off project</button></div></modal><div flush-height=\"flush-height\" class=\"flush-height flex column\"><ul class=\"interactive flex center middle flex-grow selectable-choices\"><li><div class=\"icon\"></div><h3>Define development specs</h3><button type=\"button\" scroll-element=\"offline-access\" class=\"action wide\">select</button></li><li><div class=\"icon\"></div><h3>Upload development specs</h3><button ng-click=\"vm.showUpload()\" class=\"action wide\">select</button></li></ul><button type=\"button\" scroll-element=\"offline-access\" class=\"wider continue\">continue</button></div><form><div full-height=\"full-height\" class=\"full-height flex column\"><div id=\"offline-access\" class=\"interactive flex column center flex-grow\"><h2>Do you require users to have <strong>offline access to data</strong>?</h2><p>Do your users need to be able to interact with the application when they are unable to connect to the internet (over the air or via wifi)?</p><ul class=\"or-choices flex center middle\"><li><button ng-model=\"vm.work.offlineAccess\" label=\"yes\" value=\"true\" selectable=\"selectable\" type=\"button\" class=\"big widest\"></button><p>Users will need to interact with the app even when offline.  This feature increases complexity and costs.</p></li><li class=\"or\"><div class=\"house\">OR</div></li><li><button ng-model=\"vm.work.offlineAccess\" label=\"no\" value=\"false\" selectable=\"selectable\" type=\"button\" class=\"big widest\"></button><p>The application will gracefully present a message to the user to please connect to the internet.</p></li></ul></div><button type=\"button\" scroll-element=\"personal-info\" class=\"wider continue\">continue</button></div><div full-height=\"full-height\" class=\"full-height flex column\"><div id=\"personal-info\" class=\"interactive flex column center flex-grow\"><h2>Personal information</h2><p>Is there any level of personal information? (stored or transmitted)</p><ul class=\"or-choices flex center middle\"><li><button ng-model=\"vm.work.usesPersonalInformation\" label=\"yes\" value=\"true\" selectable=\"selectable\" type=\"button\" class=\"big widest\"></button><p>Storing and/or transmitting personal information increases security and encryption needs which adds complexity and cost.</p></li><li class=\"or\"><div class=\"house\">OR</div></li><li><button ng-model=\"vm.work.usesPersonalInformation\" label=\"no\" value=\"false\" selectable=\"selectable\" type=\"button\" class=\"big widest\"></button><p>The app is not transferring or storing personal information.</p></li></ul></div><button type=\"button\" scroll-element=\"security-level\" class=\"wider continue\">continue</button></div><div full-height=\"full-height\" class=\"full-height flex column\"><div id=\"security-level\" class=\"security interactive flex column center flex-grow\"><h2>What level of <strong>security do you need</strong>?</h2><ul class=\"selectable-choices flex center\"><li><div class=\"img\"></div><label>No security</label><button selectable=\"selectable\" type=\"button\" ng-model=\"vm.work.securityLevel\" value=\"vm.securityLevels.none\"></button></li><li><div class=\"img\"></div><label>Minimal security</label><button selectable=\"selectable\" type=\"button\" ng-model=\"vm.work.securityLevel\" value=\"vm.securityLevels.minimal\"></button></li><li><div class=\"img\"></div><label>Complete security</label><button selectable=\"selectable\" type=\"button\" ng-model=\"vm.work.securityLevel\" value=\"vm.securityLevels.complete\"></button></li></ul></div><button type=\"button\" scroll-element=\"third-party-integrations\" class=\"wider continue\">continue</button></div><div full-height=\"full-height\" class=\"full-height flex column\"><div id=\"third-party-integrations\" class=\"interactive flex column center flex-grow\"><h2>How many 3rd party integrations</strong>?</h2><p>Enter the number of 3rd party integrations so we can estimate effort involved.</p><input type=\"number\" min=\"1\" max=\"6\" ng-model=\"vm.work.numberOfApiIntegrations\"/></div><div class=\"buttons\"><button ng-click=\"vm.save(false)\" class=\"continue wider save\">save</button><button ng-click=\"vm.save(true)\" class=\"contine wider kick-off action\">kick off project</button></div></div></form>");
$templateCache.put("views/submit-work-complete.directive.html","<modal show=\"vm.show\" class=\"full\"><main class=\"flex column middle center flex-grow\"><div class=\"icon-house\"><div class=\"icon biggest checkmark\"></div></div><h1><strong>awesome!</strong></h1><p>Your <span class=\"app-name\">{{vm.appName}}</span> app has been submitted.</p><button ui-sref=\"view-work-multiple\" class=\"action wider\">go to dashboard</button></main></modal>");}]);
(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submit-work-type.directive.html',
      controller: 'SubmitWorkTypeController as vm',
      scope: {
        workId: '@workId'
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
      templateUrl: 'views/submit-work-features.directive.html',
      controller: 'SubmitWorkFeaturesController as vm',
      scope: {
        workId: '@workId'
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
      templateUrl: 'views/submit-work-visuals.directive.html',
      controller: 'SubmitWorkVisualController as vm',
      scope: {
        workId: '@workId'
      }
    };
  };

  angular.module('appirio-tech-ng-submit-work').directive('submitWorkVisuals', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submit-work-development.directive.html',
      controller: 'SubmitWorkDevelopmentController as vm',
      scope: {
        workId: '@workId'
      }
    };
  };

  angular.module('appirio-tech-ng-submit-work').directive('submitWorkDevelopment', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submit-work-complete.directive.html',
      controller: 'SubmitWorkCompleteController as vm',
      scope: {
        workId: '@workId'
      }
    };
  };

  angular.module('appirio-tech-ng-submit-work').directive('submitWorkComplete', directive);

}).call(this);

(function() {
  'use strict';
  var SubmitWorkTypeController;

  SubmitWorkTypeController = function($scope, $rootScope, $state, $document, SubmitWorkService, RequirementService) {
    var getUpdates, isValid, localStorageKey, recent, vm;
    vm = this;
    vm.loading = false;
    vm.showSuccessModal = false;
    vm.nameError = false;
    vm.devicesError = false;
    vm.orientationError = false;
    vm.projectTypeError = false;
    if ($scope.workId) {
      localStorageKey = "recentSubmitWorkSection-" + $scope.workId;
      recent = localStorage[localStorageKey] || 'features';
      $state.go("submit-work-" + recent, {
        id: $scope.workId
      });
    }
    vm.name = "";
    vm.devices = angular.copy(RequirementService.devices);
    vm.orientations = angular.copy(RequirementService.orientations);
    vm.projectTypes = angular.copy(RequirementService.projectTypes);
    vm.brief = "";
    vm.validateSection = function(nextId, models, scrollActivated) {
      var foundErrors, foundModelErrors, model, modelError, nextSection, ref;
      nextSection = angular.element(document.getElementById(nextId));
      foundErrors = false;
      if (Array.isArray(models)) {
        foundModelErrors = false;
        models.forEach(function(model) {
          var modelError, selected;
          modelError = model + "Error";
          selected = vm[model].filter(function(individualModel) {
            return individualModel.selected;
          });
          if (selected.length === 0) {
            vm[modelError] = true;
            return foundModelErrors = true;
          } else {
            return vm[modelError] = false;
          }
        });
        if (foundModelErrors) {
          foundErrors = true;
        } else {
          foundErrors = false;
        }
      } else {
        model = models;
        modelError = model + "Error";
        if ((ref = vm[model]) != null ? ref.length : void 0) {
          vm[modelError] = false;
          foundErrors = false;
        } else {
          vm[modelError] = true;
          foundErrors = true;
        }
      }
      if (scrollActivated) {
        if (!foundErrors) {
          return $document.scrollToElementAnimated(nextSection);
        }
      }
    };
    vm.validateAllSections = function() {
      var errorElement, foundErrors;
      vm.validateSection('platform-details', 'name');
      vm.validateSection('type-details', ['devices', 'orientations']);
      vm.validateSection('brief-details', 'projectType');
      foundErrors = false;
      errorElement = null;
      if (vm.projectTypeError) {
        foundErrors = true;
        errorElement = angular.element(document.getElementById('type-details'));
        $document.scrollToElementAnimated(errorElement);
      }
      if (vm.devicesError || vm.orientationError) {
        foundErrors = true;
        errorElement = angular.element(document.getElementById('platform-details'));
        $document.scrollToElementAnimated(errorElement);
      }
      if (vm.nameError) {
        foundErrors = true;
        errorElement = angular.element(document.getElementById('app-name'));
        $document.scrollTopAnimated(0);
      }
      if (!foundErrors) {
        return vm.create();
      }
    };
    vm.create = function() {
      var promise, updates;
      updates = getUpdates();
      if (isValid(updates)) {
        vm.loading = true;
        promise = SubmitWorkService.create(updates);
        return promise.then(function() {
          var work;
          work = SubmitWorkService.get();
          return $state.go('submit-work-features', {
            id: work.id
          });
        });
      }
    };
    isValid = function(updates) {
      var valid;
      valid = true;
      if (!(updates.projectType === 'DESIGN' || updates.projectType === 'DESIGN_AND_CODE')) {
        valid = false;
      }
      if (!(updates.name.length > 0)) {
        valid = false;
      }
      if (!(updates.brief.length > 0)) {
        valid = false;
      }
      if (!(updates.deviceIds.length > 0)) {
        valid = false;
      }
      if (!(updates.orientationIds.length > 0)) {
        valid = false;
      }
      return valid;
    };
    getUpdates = function() {
      var getId, isSelected, updates;
      isSelected = function(item) {
        return item.selected;
      };
      getId = function(item) {
        return item.id;
      };
      return updates = {
        projectType: vm.projectType.trim(),
        name: vm.name.trim(),
        brief: vm.brief.trim(),
        deviceIds: vm.devices.filter(isSelected).map(getId),
        orientationIds: vm.orientations.filter(isSelected).map(getId)
      };
    };
    return vm;
  };

  SubmitWorkTypeController.$inject = ['$scope', '$rootScope', '$state', '$document', 'SubmitWorkService', 'RequirementService'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkTypeController', SubmitWorkTypeController);

}).call(this);

(function() {
  'use strict';
  var SubmitWorkVisualController;

  SubmitWorkVisualController = function($scope, $rootScope, $state, SubmitWorkService, SubmitWorkUploaderService, RequirementService) {
    var activate, configureUploader, getUpdates, localStorageKey, onChange, updateButtons, vm;
    if ($scope.workId) {
      localStorageKey = "recentSubmitWorkSection-" + $scope.workId;
      localStorage[localStorageKey] = 'visuals';
    }
    vm = this;
    vm.workId = $scope.workId;
    vm.loading = true;
    vm.uploaderUploading = null;
    vm.uploaderHasErrors = null;
    vm.showPaths = true;
    vm.showChooseStylesModal = false;
    vm.showUploadStylesModal = false;
    vm.showUrlStylesModal = false;
    vm.activeStyleModal = null;
    vm.nextButtonDisabled = false;
    vm.backButtonDisabled = false;
    vm.styleModals = ['fonts', 'colors', 'icons'];
    vm.showChooseStyles = function() {
      vm.showPaths = false;
      vm.showChooseStylesModal = true;
      vm.backButtonDisabled = true;
      return vm.activateModal('fonts');
    };
    vm.hideChooseStyles = function() {
      vm.showPaths = true;
      return vm.showChooseStylesModal = false;
    };
    vm.showUploadStyles = function() {
      return vm.showUploadStylesModal = true;
    };
    vm.showUrlStyles = function() {
      return vm.showUrlStylesModal = true;
    };
    vm.activateModal = function(modal) {
      vm.activeStyleModal = modal;
      return updateButtons();
    };
    vm.viewNext = function() {
      var currentIndex, isValid, nextModal;
      currentIndex = vm.styleModals.indexOf(vm.activeStyleModal);
      isValid = currentIndex < vm.styleModals.length - 1;
      if (isValid) {
        nextModal = vm.styleModals[currentIndex + 1];
        return vm.activateModal(nextModal);
      }
    };
    vm.viewPrevious = function() {
      var currentIndex, isValid, previousModal;
      currentIndex = vm.styleModals.indexOf(vm.activeStyleModal);
      isValid = currentIndex > 0;
      if (isValid) {
        previousModal = vm.styleModals[currentIndex - 1];
        return vm.activateModal(previousModal);
      }
    };
    vm.save = function(done, kickoff) {
      var updates;
      if (done == null) {
        done = false;
      }
      if (kickoff == null) {
        kickoff = false;
      }
      updates = getUpdates();
      updates.status = kickoff ? 'Submitted' : 'Incomplete';
      return SubmitWorkService.save(updates).then(function() {
        if (done) {
          return $state.go('submit-work-complete', {
            id: vm.workId
          });
        } else {
          return vm.hideChooseStyles();
        }
      });
    };
    getUpdates = function() {
      var getId, isSelected, updates;
      isSelected = function(item) {
        return item.selected;
      };
      getId = function(item) {
        return item.id;
      };
      updates = {
        fontIds: vm.font ? [vm.font] : null,
        colorSwatchIds: vm.colors.filter(isSelected).map(getId),
        iconsetIds: vm.icon ? [vm.icon] : null,
        designUrls: vm.url ? [vm.url] : null
      };
      return updates;
    };
    vm.navigateDevelopment = function() {
      return $state.go("submit-work-development", {
        id: vm.workId
      });
    };
    updateButtons = function() {
      var currentIndex, isFirst, isLast;
      currentIndex = vm.styleModals.indexOf(vm.activeStyleModal);
      isFirst = currentIndex === 0;
      isLast = currentIndex === vm.styleModals.length - 1;
      if (isFirst) {
        return vm.backButtonDisabled = true;
      } else if (isLast) {
        vm.nextButtonDisabled = true;
        return vm.showFinishDesignButton = true;
      } else {
        vm.nextButtonDisabled = false;
        vm.backButtonDisabled = false;
        return vm.showFinishDesignButton = false;
      }
    };
    configureUploader = function() {
      return vm.uploaderConfig = SubmitWorkUploaderService.generateConfig(vm.workId, 'visuals');
    };
    onChange = function() {
      var ref, ref1, ref2, work;
      work = SubmitWorkService.get();
      if (work._pending) {
        vm.loading = true;
        return false;
      }
      vm.loading = false;
      vm.font = vm.font || ((ref = work.fontIds) != null ? ref[0] : void 0);
      vm.icon = vm.icon || ((ref1 = work.iconsetIds) != null ? ref1[0] : void 0);
      vm.url = vm.url || ((ref2 = work.urlIds) != null ? ref2[0] : void 0);
      vm.fonts = angular.copy(RequirementService.fonts);
      vm.colors = angular.copy(RequirementService.colors);
      vm.icons = angular.copy(RequirementService.icons);
      vm.colors.forEach(function(color) {
        var ref3;
        if (((ref3 = work.colorSwatchIds) != null ? ref3.indexOf(color.id) : void 0) >= 0) {
          return color.selected = true;
        }
      });
      vm.projectType = work.projectType;
      vm.section = 2;
      return vm.numberOfSections = work.projectType === 'DESIGN_AND_CODE' ? 3 : 2;
    };
    activate = function() {
      var destroyWorkListener;
      destroyWorkListener = $rootScope.$on("SubmitWorkService.work:changed", function() {
        return onChange();
      });
      $scope.$on('$destroy', function() {
        return destroyWorkListener();
      });
      SubmitWorkService.fetch(vm.workId);
      configureUploader();
      return vm;
    };
    return activate();
  };

  SubmitWorkVisualController.$inject = ['$scope', '$rootScope', '$state', 'SubmitWorkService', 'SubmitWorkUploaderService', 'RequirementService'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkVisualController', SubmitWorkVisualController);

}).call(this);

(function() {
  'use strict';
  var SubmitWorkFeaturesController;

  SubmitWorkFeaturesController = function($scope, $rootScope, SubmitWorkService, SubmitWorkAPIService, SubmitWorkUploaderService, RequirementService) {
    var activate, config, configureUploader, getUpdates, localStorageKey, onChange, vm;
    if ($scope.workId) {
      localStorageKey = "recentSubmitWorkSection-" + $scope.workId;
      localStorage[localStorageKey] = 'features';
    }
    vm = this;
    vm.workId = $scope.workId;
    vm.loading = true;
    vm.showFeaturesModal = false;
    vm.showUploadModal = false;
    vm.showDefineFeaturesForm = false;
    vm.activeFeature = null;
    vm.uploaderUploading = null;
    vm.uploaderHasErrors = null;
    vm.features = [];
    config = {
      customFeatureTemplate: {
        id: null,
        title: null,
        description: null,
        notes: null,
        custom: true,
        fileIds: []
      }
    };
    vm.showFeatures = function() {
      return vm.showFeaturesModal = true;
    };
    vm.showUpload = function() {
      return vm.showUploadModal = true;
    };
    vm.toggleDefineFeatures = function() {
      return vm.showDefineFeaturesForm = !vm.showDefineFeaturesForm;
    };
    vm.hideCustomFeatures = function() {
      return vm.showDefineFeaturesForm = false;
    };
    vm.activateFeature = function(feature) {
      return vm.activeFeature = feature;
    };
    vm.applyFeature = function() {
      vm.features.forEach(function(feature) {
        if (feature.id === vm.activeFeature.id) {
          return vm.updatedFeatures.push(feature);
        }
      });
      vm.activeFeature = null;
      return onChange();
    };
    vm.removeFeature = function() {
      vm.updatedFeatures.forEach(function(feature, index) {
        if (feature.title === vm.activeFeature.title) {
          return vm.updatedFeatures.splice(index, 1);
        }
      });
      vm.activeFeature = null;
      return onChange();
    };
    vm.addCustomFeature = function() {
      var customFeatureValid;
      customFeatureValid = vm.customFeature.title && vm.customFeature.description;
      if (customFeatureValid) {
        vm.updatedFeatures.push(vm.customFeature);
        vm.hideCustomFeatures();
        return onChange();
      }
    };
    vm.save = function() {
      var updates, uploaderValid;
      uploaderValid = !vm.uploaderUploading && !vm.uploaderHasErrors;
      updates = getUpdates();
      if (uploaderValid) {
        return SubmitWorkService.save(updates).then(function() {
          return vm.showFeaturesModal = false;
        });
      }
    };
    getUpdates = function() {
      var updates;
      updates = {
        features: []
      };
      vm.updatedFeatures.forEach(function(feature) {
        return updates.features.push({
          id: feature.id,
          title: feature.title,
          description: feature.description,
          notes: feature.notes,
          custom: feature.custom,
          fileIds: feature.fileIds
        });
      });
      return updates;
    };
    configureUploader = function() {
      return vm.uploaderConfig = SubmitWorkUploaderService.generateConfig(vm.workId, 'features');
    };
    onChange = function() {
      var work;
      work = SubmitWorkService.get();
      if (work._pending) {
        vm.loading = true;
        return false;
      }
      vm.loading = false;
      vm.customFeature = angular.copy(config.customFeatureTemplate);
      vm.selectedFeaturesCount = 0;
      vm.features = angular.copy(RequirementService.features);
      if (!vm.updatedFeatures) {
        vm.updatedFeatures = work.features;
      }
      vm.updatedFeatures.forEach(function(feature) {
        if (feature.custom) {
          feature.selected = true;
          vm.features.push(feature);
          return vm.selectedFeaturesCount++;
        } else {
          return vm.features.forEach(function(vmFeature) {
            if (feature.id === vmFeature.id) {
              vmFeature.selected = true;
              return vm.selectedFeaturesCount++;
            }
          });
        }
      });
      vm.projectType = work.projectType;
      vm.section = 1;
      return vm.numberOfSections = work.projectType === 'DESIGN_AND_CODE' ? 3 : 2;
    };
    activate = function() {
      var destroyWorkListener;
      destroyWorkListener = $rootScope.$on("SubmitWorkService.work:changed", function() {
        return onChange();
      });
      $scope.$on('$destroy', function() {
        return destroyWorkListener();
      });
      SubmitWorkService.fetch(vm.workId);
      return configureUploader();
    };
    activate();
    return vm;
  };

  SubmitWorkFeaturesController.$inject = ['$scope', '$rootScope', 'SubmitWorkService', 'SubmitWorkAPIService', 'SubmitWorkUploaderService', 'RequirementService'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkFeaturesController', SubmitWorkFeaturesController);

}).call(this);

(function() {
  'use strict';
  var SubmitWorkDevelopmentController;

  SubmitWorkDevelopmentController = function($scope, $rootScope, $state, SubmitWorkService, SubmitWorkUploaderService) {
    var activate, configureUploader, localStorageKey, onChange, vm;
    if ($scope.workId) {
      localStorageKey = "recentSubmitWorkSection-" + $scope.workId;
      localStorage[localStorageKey] = 'development';
    }
    vm = this;
    vm.loading = true;
    vm.workId = $scope.workId;
    vm.showUploadModal = false;
    vm.showSpecsModal = false;
    vm.uploaderUploading = false;
    vm.uploaderHasErrors = false;
    vm.projectType = null;
    vm.securityLevels = {
      none: 'none',
      minimal: 'minimal',
      complete: 'complete'
    };
    vm.showUpload = function() {
      return vm.showUploadModal = true;
    };
    vm.showSpecs = function() {
      return vm.showSpecsModal = true;
    };
    vm.save = function(kickoff) {
      var name, prop, updates, uploaderValid;
      uploaderValid = !vm.uploaderUploading && !vm.uploaderHasErrors;
      updates = vm.work;
      for (name in updates) {
        prop = updates[name];
        if (!prop) {
          prop = null;
        }
      }
      if (uploaderValid) {
        updates.status = kickoff ? 'Submitted' : 'Incomplete';
        return SubmitWorkService.save(updates).then(function() {
          return $state.go('submit-work-complete', {
            id: vm.workId
          });
        });
      }
    };
    configureUploader = function() {
      return vm.uploaderConfig = SubmitWorkUploaderService.generateConfig(vm.workId, 'development');
    };
    onChange = function() {
      var work;
      work = SubmitWorkService.get();
      if (work._pending) {
        vm.loading = true;
        return false;
      }
      vm.loading = false;
      vm.work = {
        offlineAccess: work.offlineAccess,
        usesPersonalInformation: work.usesPersonalInformation,
        securityLevel: work.securityLevel,
        numberOfApiIntegrations: work.numberOfApiIntegrations
      };
      vm.projectType = work.projectType;
      vm.section = 3;
      return vm.numberOfSections = 3;
    };
    activate = function() {
      var destroyWorkListener;
      destroyWorkListener = $rootScope.$on("SubmitWorkService.work:changed", function() {
        return onChange();
      });
      $scope.$on('$destroy', function() {
        return destroyWorkListener();
      });
      SubmitWorkService.fetch(vm.workId);
      return configureUploader();
    };
    activate();
    return vm;
  };

  SubmitWorkDevelopmentController.$inject = ['$scope', '$rootScope', '$state', 'SubmitWorkService', 'SubmitWorkUploaderService'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkDevelopmentController', SubmitWorkDevelopmentController);

}).call(this);

(function() {
  'use strict';
  var SubmitWorkCompleteController;

  SubmitWorkCompleteController = function($scope, $rootScope, $state) {
    var activate, vm;
    vm = this;
    vm.show = true;
    vm.appName = $rootScope.currentAppName;
    activate = function() {
      $scope.$watch('vm.show', function(newValue) {
        if (newValue === false) {
          return $state.go('view-work-multiple');
        }
      });
      return vm;
    };
    return activate();
  };

  SubmitWorkCompleteController.$inject = ['$scope', '$rootScope', '$state'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkCompleteController', SubmitWorkCompleteController);

}).call(this);

(function() {
  'use strict';
  var SubmitWorkService;

  SubmitWorkService = function($rootScope, OptimistModel, SubmitWorkAPIService, ProjectsAPIService) {
    var create, createWork, currentWorkId, emitUpdates, fetch, get, save, work, workTemplate;
    currentWorkId = null;
    workTemplate = {
      modelType: 'app-project',
      id: null,
      name: null,
      projectType: null,
      deviceIds: [],
      orientationIds: [],
      brief: null,
      features: [],
      fontIds: [],
      colorSwatchIds: [],
      iconsetIds: [],
      designUrls: [],
      offlineAccess: null,
      offlineAccessComment: null,
      usesPersonalInformation: null,
      securityLevel: null,
      numberOfApiIntegrations: null
    };
    emitUpdates = function() {
      return $rootScope.$emit('SubmitWorkService.work:changed');
    };
    createWork = function() {
      var work;
      return work = new OptimistModel({
        data: workTemplate,
        updateCallback: emitUpdates,
        propsToIgnore: {
          $promise: true,
          $resolved: true
        }
      });
    };
    work = createWork();
    get = function() {
      return work.get();
    };
    create = function(updates) {
      var apiCall, interceptResponse;
      interceptResponse = function(res) {
        currentWorkId = res.id;
        work.set({
          updates: {
            id: res.id
          },
          updateValues: true
        });
        return res;
      };
      apiCall = function(model) {
        return ProjectsAPIService.post({}, model).$promise.then(interceptResponse);
      };
      return work.update({
        updates: updates,
        apiCall: apiCall
      });
    };
    fetch = function(workId) {
      var apiCall;
      if (workId !== currentWorkId) {
        work = createWork();
        currentWorkId = workId;
      }
      apiCall = function() {
        var params;
        params = {
          id: currentWorkId
        };
        return SubmitWorkAPIService.get(params).$promise;
      };
      return work.fetch({
        apiCall: apiCall
      });
    };
    save = function(updates) {
      var apiCall;
      apiCall = function(model) {
        var params;
        params = {
          id: currentWorkId
        };
        return SubmitWorkAPIService.put(params, model).$promise;
      };
      return work.update({
        updates: updates,
        apiCall: apiCall
      });
    };
    return {
      get: get,
      create: create,
      fetch: fetch,
      save: save
    };
  };

  SubmitWorkService.$inject = ['$rootScope', 'OptimistModel', 'SubmitWorkAPIService', 'ProjectsAPIService'];

  angular.module('appirio-tech-ng-submit-work').factory('SubmitWorkService', SubmitWorkService);

}).call(this);

(function() {
  'use strict';
  var srv;

  srv = function() {
    var service;
    service = {};
    service.projectTypes = [
      {
        name: 'Design',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        id: 'DESIGN',
        selected: false,
        imgUrl: 'http://www.collegequest.com/wp-content/uploads/what-do-graphic-designers-do.jpg'
      }, {
        name: 'Design & Development',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        id: 'DESIGN_AND_CODE',
        selected: false,
        imgUrl: 'http://pbwebdev.com/blog/wp-content/uploads/2014/06/developer.jpg'
      }
    ];
    service.devices = [
      {
        name: 'iWatch',
        id: 'IWATCH',
        selected: false
      }, {
        name: 'iPhone',
        id: 'IPHONE',
        selected: false
      }, {
        name: 'iPad',
        id: 'IPAD',
        selected: false
      }
    ];
    service.orientations = [
      {
        name: 'Landscape',
        id: 'LANDSCAPE',
        selected: false
      }, {
        name: 'Portrait',
        id: 'PORTRAIT',
        selected: false
      }
    ];
    service.features = [
      {
        id: 'LOGIN',
        title: 'Login',
        description: 'Users can login / register for your app',
        notes: null,
        custom: null,
        selected: false
      }, {
        id: 'ONBOARDING',
        title: 'Onboarding',
        description: 'Users can see data from social networks (FB, Twitter etc.) in your app',
        notes: null,
        custom: null,
        selected: false
      }, {
        id: 'REGISTRATION',
        title: 'Registration',
        description: 'Users can create profiles with personal info',
        notes: null,
        custom: null,
        selected: false
      }, {
        id: 'LOCATION',
        title: 'Location',
        description: 'A map with a user\'s GPS location that helps them get to places',
        notes: null,
        custom: null,
        selected: false
      }
    ];
    service.fonts = [
      {
        name: 'Serif',
        description: 'Classic design, good legiblity for large and small text.',
        id: 'SERIF',
        selected: false
      }, {
        name: 'Sans Serif',
        id: 'SANS_SERIF',
        description: 'Modern design, good for headers and body text.',
        selected: false
      }
    ];
    service.colors = [
      {
        name: 'Blue',
        id: 'BLUE',
        imgUrl: 'http://s3.amazonaws.com/colorcombos-images/users/1/color-schemes/color-scheme-375-main.png?v=20120505082910'
      }, {
        name: 'Red',
        id: 'Red',
        imgUrl: 'http://s3.amazonaws.com/colorcombos-images/users/1/color-schemes/color-scheme-375-main.png?v=20120505082910'
      }, {
        name: 'Green',
        id: 'GREEN',
        imgUrl: 'http://s3.amazonaws.com/colorcombos-images/users/1/color-schemes/color-scheme-375-main.png?v=20120505082910'
      }, {
        name: 'Orange',
        id: 'Orange',
        imgUrl: 'http://s3.amazonaws.com/colorcombos-images/users/1/color-schemes/color-scheme-375-main.png?v=20120505082910'
      }
    ];
    service.icons = [
      {
        name: 'Flat Colors',
        description: 'Lorem ipsum dolor sit amet',
        id: 'FLAT_COLORS',
        selected: false
      }, {
        name: 'Thin Line',
        description: 'Lorem ipsum dolor sit amet',
        id: 'THIN_LINE',
        selected: false
      }, {
        name: 'Solid Line',
        description: 'Lorem ipsum dolor sit amet',
        id: 'SOLID_LINE',
        selected: false
      }
    ];
    return service;
  };

  srv.$inject = [];

  angular.module('appirio-tech-ng-submit-work').factory('RequirementService', srv);

}).call(this);

(function() {
  'use strict';
  var SubmitWorkUploaderService;

  SubmitWorkUploaderService = function(API_URL) {
    var generateConfig;
    generateConfig = function(workId, assetType) {
      var category, domain, uploaderConfig;
      domain = API_URL;
      category = 'work';
      uploaderConfig = {
        name: assetType + "-uploader-" + workId,
        allowMultiple: true,
        query: {
          url: domain + '/v3/attachments',
          params: {
            filter: "id=" + workId + "&assetType=" + assetType + "&category=" + category,
            fields: 'url'
          }
        },
        presign: {
          url: domain + '/v3/attachments/uploadurl',
          params: {
            id: workId,
            assetType: assetType,
            category: category
          }
        },
        createRecord: {
          url: domain + '/v3/attachments',
          params: {
            id: workId,
            assetType: assetType,
            category: category
          }
        },
        removeRecord: {
          url: domain + '/v3/attachments/:fileId',
          params: {
            filter: 'category=' + category
          }
        }
      };
      return uploaderConfig;
    };
    return {
      generateConfig: generateConfig
    };
  };

  SubmitWorkUploaderService.$inject = ['API_URL'];

  angular.module('appirio-tech-ng-submit-work').factory('SubmitWorkUploaderService', SubmitWorkUploaderService);

}).call(this);
