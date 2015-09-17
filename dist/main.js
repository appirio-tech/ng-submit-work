(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-api-services', 'duScroll'];

  angular.module('appirio-tech-ng-submit-work', dependencies);

}).call(this);

angular.module("appirio-tech-ng-submit-work").run(["$templateCache", function($templateCache) {$templateCache.put("views/submit-work-features.directive.html","<header><ul class=\"navs\"><li class=\"active\"><a ui-sref=\"submit-work-features\">Features</a></li><li><a ui-sref=\"submit-work-visuals\">Visual Design</a></li><li><a ui-sref=\"submit-work-development\">Development</a></li></ul><progress value=\"2\" max=\"3\"></progress></header><header><div class=\"house\"><div class=\"icon checkmark biggest\"></div></div><h1>Specify Features</h1><p>Tell us what features we need to include in your new app.</p></header><ul class=\"path-choices\"><li><div class=\"icon\"></div><h3>Define features</h3><p>UX design greating the usability, accessibility, and costume journey.</p><button ng-click=\"vm.showFeatures()\" class=\"action wide\">select</button></li><li><div class=\"icon\"></div><h3>Upload document</h3><p>Upload your specs or any documents you have.</p><button ng-click=\"vm.showUpload()\" class=\"action wide\">select</button></li></ul><button ng-click=\"vm.showFeatures()\" class=\"wider action\">go to design</button><modal show=\"vm.showFeaturesModal\" background-click-close=\"background-click-close\" class=\"full define-features\"><h2>Data booklet mobile app <strong>features</strong></h2><main><ul class=\"features\"><li><ul><li ng-repeat=\"feature in vm.defaultFeatures track by $index\"><button ng-click=\"vm.activateFeature(feature)\" class=\"widest clean\"><div ng-class=\"{selected: vm.activeFeature.name == feature.name}\" class=\"icon\"></div><span>{{ feature.name }}</span></button></li></ul></li><li><button ng-click=\"vm.toggleDefineFeatures()\" class=\"widest clean\"><span>Define a new feature</span><div class=\"icon\">+</div></button></li></ul><ul class=\"contents\"><li><div ng-class=\"{active: !vm.activeFeature}\" class=\"default active\"><h4>Select and define features for your app</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></div><div ng-class=\"{active: vm.activeFeature}\" class=\"description\"><h4>Select and define features for your app</h4><h5>{{ vm.activeFeature.name }} description</h5><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><textarea placeholder=\"Notes...\" ng-model=\"vm.activeFeature.notes\" class=\"widest\"></textarea><button ng-click=\"vm.applyFeature()\" class=\"wider action\">apply feature</button></div><form ng-submit=\"vm.addCustomFeature()\" ng-class=\"{active: vm.showDefineFeaturesForm}\" class=\"new-feature\"><h4>Define a new feature</h4><label>New feature title</label><input type=\"text\" ng-model=\"vm.customFeature.name\" required=\"required\" class=\"widest\"/><label>New feature description</label><textarea ng-model=\"vm.customFeature.description\" required=\"required\" class=\"widest\"></textarea><button type=\"submit\" class=\"wider action\">add new feature</button><button type=\"button\" ng-click=\"vm.hideCustomFeatures()\">Cancel</button></form><div class=\"example\"><div class=\"phone\"></div></div></li><li><div class=\"count\">{{vm.work.features.length}} features added</div><button ng-click=\"vm.submitFeatures()\" class=\"wider action\">next</button></li></ul></main></modal><modal show=\"vm.showUploadModal\" background-click-close=\"background-click-close\" class=\"upload-documents\"><div class=\"upload\"><div class=\"icon upload\"></div><h2>Upload <strong>documents</strong></h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><ap-uploader config=\"vm.featuresUploaderConfig\" uploading=\"vm.featuresUploaderUploading\" has-errors=\"vm.featuresUploaderHasErrors\"></ap-uploader></div></modal>");
$templateCache.put("views/submit-work-type.directive.html","<loader ng-show=\"vm.loading\"></loader><header><h1>How to create a new project</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></header><form ng-submit=\"vm.save()\"><div class=\"interactive\"><input type=\"text\" placeholder=\"Name your project...\" required=\"true\" ng-model=\"vm.work.name\" class=\"wider\"/></div><button type=\"button\" scroll-element=\"platformDetails\" class=\"wider continue action\">continue</button><ul id=\"platformDetails\" class=\"target-platform interactive\"><li><h2>IOS <strong>platform details</strong></h2></li><li><h4>Devices</h4><ul><li><checkbox label=\"iPhone 5c\" ng-model=\"vm.work.devices.iPhone5c\"></checkbox></li><li><checkbox label=\"iPhone 5s\" ng-model=\"vm.work.devices.iPhone5s\"></checkbox></li></ul></li><li><h4>Orientation</h4><ul><li><checkbox label=\"Landscape\" ng-model=\"vm.work.orientation.landscape\"></checkbox></li><li><checkbox label=\"Portrait\" ng-model=\"vm.work.orientation.portrait\"></checkbox></li></ul></li><li><h4>OS</h4><ul><li><checkbox label=\"iOS 7\" ng-model=\"vm.work.os.iOS7\"></checkbox></li><li><checkbox label=\"iOS 8\" ng-model=\"vm.work.os.iOS8\"></checkbox></li></ul></li></ul><button type=\"button\" scroll-element=\"typeDetails\" class=\"wider continue action\">continue</button><ul id=\"typeDetails\" class=\"type interactive\"><li><h2>What <strong>type of work</strong> are you looking for?</h2></li><li><h4>Design</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><img src=\"http://www.collegequest.com/wp-content/uploads/what-do-graphic-designers-do.jpg\"/><selected-button type=\"button\" value=\"vm.requestTypes.design\" ng-model=\"vm.work.requestTypes\">Design</selected-button></li><li><h4>Development</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><img src=\"http://pbwebdev.com/blog/wp-content/uploads/2014/06/developer.jpg\"/><selected-button type=\"button\" value=\"vm.requestTypes.code\" ng-model=\"vm.work.requestTypes\">Development</selected-button></li></ul><button type=\"button\" scroll-element=\"briefDetails\" class=\"wider continue action\">continue</button><div id=\"briefDetails\" class=\"interactive\"><h2>Can you <strong>share a brief</strong> overview?</h2><textarea placeholder=\"E.g. I need a mobile HR application with social features to support my growing organization\" ng-model=\"vm.work.summary\" class=\"brief\"></textarea><button type=\"submit\" ng-if=\"!vm.workId\" class=\"create wider\">Create Project</button><button type=\"submit\" ng-if=\"vm.workId\" class=\"save wider\">Save</button></div></form><modal show=\"vm.showSuccessModal\" background-click-close=\"background-click-close\"><div class=\"success\"><h2>Awesome!</h2><p>Your {{ vm.work.name }} is set up now</p><p>Share your email to signup and we\'ll be sure to send a project link.</p><form><input type=\"email\" required=\"required\"/><button type=\"submit\">Submit</button></form></div></modal>");}]);
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
  var SubmitWorkTypeController;

  SubmitWorkTypeController = function($scope, SubmitWorkAPIService) {
    var activate, isValid, mockify, vm;
    vm = this;
    vm.work = {
      name: null,
      requestType: null,
      summary: null,
      features: []
    };
    vm.requestTypes = {
      code: 'code',
      design: 'design'
    };
    vm.loading = true;
    vm.showSuccessModal = false;
    vm.workId = $scope.workId;
    isValid = function() {
      return vm.work.name && vm.work.requestTypes.length && vm.work.summary;
    };
    vm.save = function(onSuccess) {
      var params, resource;
      if (isValid()) {
        if (vm.workId) {
          params = {
            id: vm.workId
          };
          resource = SubmitWorkAPIService.put(params, vm.work);
          resource.$promise.then(function(response) {
            return typeof onSuccess === "function" ? onSuccess(response) : void 0;
          });
          resource.$promise["catch"](function(response) {});
        } else {
          vm.work.status = 'Submitted';
          resource = SubmitWorkAPIService.post(vm.work);
          resource.$promise.then(function(response) {
            vm.showSuccessModal = true;
            return typeof onSuccess === "function" ? onSuccess(response) : void 0;
          });
          resource.$promise["catch"](function(response) {});
          if (typeof onSuccess === "function") {
            onSuccess(response);
          }
        }
        return resource.$promise["catch"](function(response) {});
      }
    };
    mockify = function(work) {
      work.requestTypes = [];
      work.devices = {
        iPhone5c: false,
        iPhone5s: false
      };
      work.orientation = {
        landscape: false,
        portrait: false
      };
      return work.os = {
        iOS7: false,
        iOS8: false
      };
    };
    activate = function() {
      var params, resource;
      if (vm.workId) {
        params = {
          id: vm.workId
        };
        resource = SubmitWorkAPIService.get(params);
        resource.$promise.then(function(response) {
          vm.work = response;
          return mockify(vm.work);
        });
        resource.$promise["catch"](function(response) {});
        resource.$promise["finally"](function() {
          return vm.loading = false;
        });
      } else {
        vm.loading = false;
      }
      return vm;
    };
    return activate();
  };

  SubmitWorkTypeController.$inject = ['$scope', 'SubmitWorkAPIService'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkTypeController', SubmitWorkTypeController);

}).call(this);

(function() {
  'use strict';
  var SubmitWorkVisualController;

  SubmitWorkVisualController = function($scope, SubmitWorkAPIService, API_URL) {
    var activate, configureUploader, mockify, vm;
    vm = this;
    vm.loading = true;
    vm.workId = $scope.workId;
    vm.visualsUploaderUploading = null;
    vm.visualsUploaderHasErrors = null;
    vm.work = {
      name: null,
      requestType: null,
      summary: null,
      features: [],
      featuresDetails: null
    };
    vm.visualDesign = {};
    vm.visualDesign.fonts = [
      {
        name: 'Serif',
        description: 'a small line attached to the end of a stroke',
        id: '1234'
      }, {
        name: 'Sans Serif',
        description: 'does not have the small `serifs`',
        id: '1235'
      }, {
        name: 'Slap Serif',
        description: 'does not have the small `serifs`',
        id: '1236'
      }, {
        name: 'Script',
        description: 'does not have the small `serifs`',
        id: '1237'
      }, {
        name: 'Grunge',
        description: 'does not have the small `serifs`',
        id: '1238'
      }
    ];
    vm.visualDesign.colors = [
      {
        name: 'Palette 1',
        description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        id: '1234'
      }, {
        name: 'Palette 2',
        description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        id: '1235'
      }, {
        name: 'Palette 3',
        description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        id: '1236'
      }, {
        name: 'Palette 4',
        description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        id: '1237'
      }, {
        name: 'Palette 5',
        description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        id: '1238'
      }
    ];
    vm.visualDesign.icons = [
      {
        name: 'Google',
        description: 'Lorem ipsum dolor sit amet',
        id: '1234'
      }, {
        name: 'Anamorphic',
        description: 'Lorem ipsum dolor sit amet',
        id: '1235'
      }, {
        name: 'iOS Style',
        description: 'Lorem ipsum dolor sit amet',
        id: '1236'
      }, {
        name: 'Android',
        description: 'Lorem ipsum dolor sit amet',
        id: '1237'
      }, {
        name: 'Windows 8',
        description: 'Lorem ipsum dolor sit amet',
        id: '1238'
      }
    ];
    vm.save = function(onSuccess) {
      var params, resource;
      if (vm.workId) {
        params = {
          id: vm.workId
        };
        resource = SubmitWorkAPIService.put(params, vm.work);
        resource.$promise.then(function(response) {
          return typeof onSuccess === "function" ? onSuccess(response) : void 0;
        });
        return resource.$promise["catch"](function(response) {});
      }
    };
    vm.submitVisuals = function() {
      var uploaderValid, workColors, workFonts, workIcons;
      workFonts = vm.work.visualDesign.fonts;
      workColors = vm.work.visualDesign.colors;
      workIcons = vm.work.visualDesign.icons;
      uploaderValid = !vm.visualsUploaderUploading && !vm.visualsUploaderHasErrors;
      if (workFonts.length && workColors.length && workIcons.length) {
        vm.work.status = 'visualsAdded';
        return vm.save(function(response) {});
      }
    };
    mockify = function(work) {
      work.visualDesign = {};
      work.visualDesign.fonts = [];
      work.visualDesign.colors = [];
      return work.visualDesign.icons = [];
    };
    configureUploader = function() {
      var assetType, queryUrl;
      assetType = 'specs';
      queryUrl = API_URL + '/v3/work-files/assets?filter=workId%3D' + vm.workId + '%26assetType%3D' + assetType;
      return vm.visualsUploaderConfig = {
        name: 'uploader' + vm.workId,
        allowMultiple: true,
        queryUrl: queryUrl,
        urlPresigner: API_URL + '/v3/work-files/uploadurl',
        fileEndpoint: API_URL + '/v3/work-files/:fileId',
        saveParams: {
          workId: vm.workId,
          assetType: assetType
        }
      };
    };
    activate = function() {
      var params, resource;
      configureUploader();
      if (vm.workId) {
        params = {
          id: vm.workId
        };
        resource = SubmitWorkAPIService.get(params);
        resource.$promise.then(function(response) {
          vm.work = response;
          return mockify(vm.work);
        });
        resource.$promise["catch"](function(response) {});
        resource.$promise["finally"](function() {
          return vm.loading = false;
        });
      } else {
        vm.loading = false;
      }
      return vm;
    };
    return activate();
  };

  SubmitWorkVisualController.$inject = ['$scope', 'SubmitWorkAPIService', 'API_URL'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkVisualController', SubmitWorkVisualController);

}).call(this);

(function() {
  'use strict';
  var SubmitWorkFeaturesController;

  SubmitWorkFeaturesController = function($scope, SubmitWorkAPIService, API_URL) {
    var activate, configureUploader, resetCustomFeature, vm;
    vm = this;
    vm.workId = $scope.workId;
    vm.loading = true;
    vm.showFeaturesModal = false;
    vm.showUploadModal = false;
    vm.showDefineFeaturesForm = false;
    vm.activeFeature = null;
    vm.featuresUploaderUploading = null;
    vm.featuresUploaderHasErrors = null;
    vm.work = {
      name: null,
      requestType: null,
      summary: null,
      features: [],
      featuresDetails: null
    };
    vm.defaultFeatures = [
      {
        name: 'Login',
        description: 'Users can login / register for your app',
        notes: null,
        custom: null
      }, {
        name: 'Onboarding',
        description: 'Users can see data from social networks (FB, Twitter etc.) in your app',
        notes: null,
        custom: null
      }, {
        name: 'Registration',
        description: 'Users can create profiles with personal info',
        notes: null,
        custom: null
      }, {
        name: 'Location',
        description: 'A map with a user\'s GPS location that helps them get to places',
        notes: null,
        custom: null
      }
    ];
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
      resetCustomFeature();
      return vm.showDefineFeaturesForm = false;
    };
    vm.activateFeature = function(feature) {
      return vm.activeFeature = feature;
    };
    vm.applyFeature = function() {
      var featureAdded, features;
      featureAdded = false;
      features = vm.work.features;
      features.forEach(function(feature) {
        if (feature.name === vm.activeFeature.name) {
          return featureAdded = true;
        }
      });
      if (!featureAdded) {
        features.push(vm.activeFeature);
        return vm.activeFeature = null;
      }
    };
    vm.addCustomFeature = function() {
      var customFeatureValid;
      customFeatureValid = vm.customFeature.name && vm.customFeature.description;
      if (customFeatureValid) {
        vm.work.features.push(vm.customFeature);
        resetCustomFeature();
        return vm.hideCustomFeatures();
      }
    };
    vm.save = function(onSuccess) {
      var params, resource;
      if (vm.workId) {
        params = {
          id: vm.workId
        };
        resource = SubmitWorkAPIService.put(params, vm.work);
        resource.$promise.then(function(response) {
          return typeof onSuccess === "function" ? onSuccess(response) : void 0;
        });
        return resource.$promise["catch"](function(response) {});
      }
    };
    vm.submitFeatures = function() {
      var formsValid, uploaderValid, workFeatures;
      workFeatures = vm.work.features;
      formsValid = workFeatures.length;
      uploaderValid = !vm.featuresUploaderUploading && !vm.featuresUploaderHasErrors;
      if (formsValid && uploaderValid) {
        vm.work.status = 'FeaturesAdded';
        return vm.save(function(response) {});
      }
    };
    resetCustomFeature = function() {
      return vm.customFeature = {
        name: null,
        description: null,
        custom: true
      };
    };
    configureUploader = function() {
      var assetType, queryUrl;
      assetType = 'specs';
      queryUrl = API_URL + '/v3/work-files/assets?filter=workId%3D' + vm.workId + '%26assetType%3D' + assetType;
      return vm.featuresUploaderConfig = {
        name: 'uploader' + vm.workId,
        allowMultiple: true,
        queryUrl: queryUrl,
        urlPresigner: API_URL + '/v3/work-files/uploadurl',
        fileEndpoint: API_URL + '/v3/work-files/:fileId',
        saveParams: {
          workId: vm.workId,
          assetType: assetType
        }
      };
    };
    activate = function() {
      var params, resource;
      resetCustomFeature();
      configureUploader();
      if (vm.workId) {
        params = {
          id: vm.workId
        };
        resource = SubmitWorkAPIService.get(params);
        resource.$promise.then(function(response) {
          vm.work = response;
          return vm.work.featuresDetails = null;
        });
        resource.$promise["catch"](function(response) {});
        resource.$promise["finally"](function() {
          return vm.loading = false;
        });
      } else {
        vm.loading = false;
      }
      return vm;
    };
    return activate();
  };

  SubmitWorkFeaturesController.$inject = ['$scope', 'SubmitWorkAPIService', 'API_URL'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkFeaturesController', SubmitWorkFeaturesController);

}).call(this);

(function() {
  'use strict';
  var SubmitWorkDevelopmentController;

  SubmitWorkDevelopmentController = function($scope, SubmitWorkAPIService) {
    var activate, mockify, vm, workValid;
    vm = this;
    vm.loading = true;
    vm.workId = $scope.workId;
    vm.work = {
      name: null,
      requestType: null,
      summary: null,
      features: [],
      featuresDetails: null,
      visualDesign: {}
    };
    vm.securityLevels = {
      none: 'none',
      minimal: 'minimal',
      complete: 'complete'
    };
    vm.appPurposes = {
      enterprise: 'enterprise',
      appStore: 'appStore'
    };
    vm.thirdPartyIntegrations = [
      {
        name: 'Google',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elite',
        id: '1234'
      }, {
        name: 'Yahoo',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elite',
        id: '1235'
      }, {
        name: 'Paypal',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elite',
        id: '1236'
      }
    ];
    vm.save = function(onSuccess) {
      var params, resource;
      if (vm.workId) {
        params = {
          id: vm.workId
        };
        resource = SubmitWorkAPIService.put(params, vm.work);
        resource.$promise.then(function(response) {
          return typeof onSuccess === "function" ? onSuccess(response) : void 0;
        });
        return resource.$promise["catch"](function(response) {});
      }
    };
    vm.submitDevelopment = function() {
      var developmentValid, workIntegrations;
      workIntegrations = vm.work.development.thirdPartyIntegrations;
      developmentValid = workValid(vm.work.development);
      if (workIntegrations.length && developmentValid) {
        vm.work.status = 'developmentAdded';
        return vm.save(function(response) {});
      }
    };
    workValid = function(work) {
      var isObject, isValid, property, value;
      isValid = true;
      for (property in work) {
        value = work[property];
        isObject = typeof value === 'object' && !Array.isArray(value);
        if (value === null) {
          isValid = false;
        } else if (isObject) {
          isValid = workValid(value);
        }
      }
      return isValid;
    };
    mockify = function(work) {
      return work.development = {
        appPurpose: null,
        offlineAccess: {
          required: null,
          comments: null
        },
        hasPersonalInformation: null,
        securityLevel: null,
        thirdPartyIntegrations: []
      };
    };
    activate = function() {
      var params, resource;
      if (vm.workId) {
        params = {
          id: vm.workId
        };
        resource = SubmitWorkAPIService.get(params);
        resource.$promise.then(function(response) {
          vm.work = response;
          return mockify(vm.work);
        });
        resource.$promise["catch"](function(response) {});
        resource.$promise["finally"](function() {
          return vm.loading = false;
        });
      } else {
        vm.loading = false;
      }
      return vm;
    };
    return activate();
  };

  SubmitWorkDevelopmentController.$inject = ['$scope', 'SubmitWorkAPIService'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkDevelopmentController', SubmitWorkDevelopmentController);

}).call(this);
