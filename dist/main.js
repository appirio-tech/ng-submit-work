(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-api-services', 'duScroll'];

  angular.module('appirio-tech-ng-submit-work', dependencies);

}).call(this);

angular.module("appirio-tech-ng-submit-work").run(["$templateCache", function($templateCache) {$templateCache.put("views/nav.html","<ul class=\"navs\"><li ng-class=\"{ active: vm.section == 1 }\"><a ui-sref=\"submit-work-features({ id: vm.workId })\">Features</a></li><li ng-class=\"{ active: vm.section == 2 }\"><a ui-sref=\"submit-work-visuals({ id: vm.workId })\">Visual Design</a></li><li ng-if=\"vm.projectType == \'DESIGN_AND_CODE\'\" ng-class=\"{ active: vm.section == 3 }\"><a ui-sref=\"submit-work-development({ id: vm.workId })\">Development</a></li></ul><progress value=\"{{ vm.section }}\" max=\"{{ vm.numberOfSections }}\"></progress>");
$templateCache.put("views/submit-work-type.directive.html","<header><h1>How to create a new project</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></header><form ng-submit=\"vm.create()\"><div class=\"interactive\"><input type=\"text\" placeholder=\"Name your project...\" required=\"true\" ng-model=\"vm.name\" class=\"wider\"/></div><button type=\"button\" scroll-element=\"platformDetails\" class=\"wider continue action\">continue</button><ul id=\"platformDetails\" class=\"target-platform interactive\"><li><h2>IOS <strong>platform details</strong></h2></li><li><h4>Devices</h4><ul><li ng-repeat=\"device in vm.devices\"><checkbox label=\"{{device.name}}\" ng-model=\"device.selected\"></checkbox></li></ul></li><li><h4>Orientation</h4><ul><li ng-repeat=\"orientation in vm.orientations\"><checkbox label=\"{{orientation.name}}\" ng-model=\"orientation.selected\"></checkbox></li></ul></li></ul><button type=\"button\" scroll-element=\"typeDetails\" class=\"wider continue action\">continue</button><ul id=\"typeDetails\" class=\"type interactive\"><li><h2>What <strong>type of work</strong> are you looking for?</h2></li><li ng-repeat=\"projectType in vm.projectTypes\"><h4>{{projectType.name}}</h4><p>{{ projectType.description }}</p><img src=\"{{ projectType.imgUrl }}\"/><button type=\"button\" selectable=\"true\" ng-model=\"vm.projectType\" value=\"projectType.id\"></button><h4>{{requestType.name}}</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></li></ul><button type=\"button\" scroll-element=\"briefDetails\" class=\"wider continue action\">continue</button><div id=\"briefDetails\" class=\"interactive\"><h2>Can you <strong>share a brief</strong> overview?</h2><textarea placeholder=\"E.g. I need a mobile HR application with social features to support my growing organization\" ng-model=\"vm.brief\" class=\"brief\"></textarea><button type=\"submit\" class=\"create wider\">Create Project</button></div></form><modal show=\"vm.showSuccessModal\" background-click-close=\"background-click-close\"><div class=\"success\"><h2>Awesome!</h2><p>Your {{ vm.name }} is set up now</p><p>Share your email to signup and we\'ll be sure to send a project link.</p><form><input type=\"email\" required=\"required\" class=\"wider\"/><button type=\"submit\" class=\"wider\">Submit</button></form></div></modal>");
$templateCache.put("views/submit-work-features.directive.html","<header><ul class=\"navs\"><li ng-class=\"{ active: vm.section == 1 }\"><a ui-sref=\"submit-work-features({ id: vm.workId })\">Features</a></li><li ng-class=\"{ active: vm.section == 2 }\"><a ui-sref=\"submit-work-visuals({ id: vm.workId })\">Visual Design</a></li><li ng-if=\"vm.projectType == \'DESIGN_AND_CODE\'\" ng-class=\"{ active: vm.section == 3 }\"><a ui-sref=\"submit-work-development({ id: vm.workId })\">Development</a></li></ul><progress value=\"{{ vm.section }}\" max=\"{{ vm.numberOfSections }}\"></progress></header><header><div class=\"house\"><div class=\"icon checkmark biggest\"></div></div><h1>Specify Features</h1><p>Tell us what features we need to include in your new app.</p></header><ul class=\"path-choices\"><li><div class=\"icon\"></div><h3>Define features</h3><p>UX design greating the usability, accessibility, and costume journey.</p><button ng-click=\"vm.showFeatures()\" class=\"action wide\">select</button></li><li><div class=\"icon\"></div><h3>Upload document</h3><p>Upload your specs or any documents you have.</p><button ng-click=\"vm.showUpload()\" class=\"action wide\">select</button></li></ul><a ui-sref=\"submit-work-visuals({ id: vm.workId })\" class=\"wider action\">go to design</a><modal show=\"vm.showFeaturesModal\" background-click-close=\"background-click-close\" class=\"full define-features\"><h2>Data booklet mobile app <strong>features</strong></h2><main><ul class=\"features\"><li><ul><li ng-repeat=\"feature in vm.features\"><button ng-click=\"vm.activateFeature(feature)\" class=\"widest clean\"><div ng-class=\"{selected: feature.selected}\" class=\"icon\"></div><span>{{ feature.title }}</span></button></li></ul></li><li><button ng-click=\"vm.toggleDefineFeatures()\" class=\"widest clean\"><span>Define a new feature</span><div class=\"icon\">+</div></button></li></ul><ul class=\"contents\"><li><div ng-hide=\"vm.showDefineFeaturesForm\" ng-class=\"{active: !vm.activeFeature}\" class=\"default active\"><h4>Select and define features for your app</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></div><div ng-hide=\"vm.showDefineFeaturesForm\" ng-class=\"{active: vm.activeFeature}\" class=\"description\"><h4>Select and define features for your app</h4><h5>{{ vm.activeFeature.title }} description</h5><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><textarea placeholder=\"Notes...\" ng-model=\"vm.activeFeature.notes\" class=\"widest\"></textarea><button ng-if=\"!vm.activeFeature.selected\" ng-click=\"vm.applyFeature()\" class=\"wider action\">apply feature</button><button ng-if=\"vm.activeFeature.selected\" ng-click=\"vm.removeFeature()\" class=\"wider action\">remove feature</button></div><form ng-submit=\"vm.addCustomFeature()\" ng-class=\"{active: vm.showDefineFeaturesForm}\" class=\"new-feature\"><h4>Define a new feature</h4><label>New feature title</label><input type=\"text\" ng-model=\"vm.customFeature.title\" required=\"required\" class=\"widest\"/><label>New feature description</label><textarea ng-model=\"vm.customFeature.description\" required=\"required\" class=\"widest\"></textarea><button type=\"submit\" class=\"wide action\">add new feature</button><button type=\"button\" ng-click=\"vm.hideCustomFeatures()\" class=\"wide cancel\">Cancel</button></form><div class=\"example\"><div class=\"phone\"></div></div></li><li><div class=\"count\">{{vm.selectedFeaturesCount}} features added</div><button ng-click=\"vm.save()\" class=\"wider action\">Save</button></li></ul></main></modal><modal show=\"vm.showUploadModal\" background-click-close=\"background-click-close\" class=\"upload-documents\"><div class=\"upload\"><div class=\"icon upload\"></div><h2>Upload <strong>documents</strong></h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><ap-uploader config=\"vm.featuresUploaderConfig\" uploading=\"vm.featuresUploaderUploading\" has-errors=\"vm.featuresUploaderHasErrors\"></ap-uploader></div></modal>");
$templateCache.put("views/submit-work-visuals.directive.html","<loader ng-if=\"vm.loading\"></loader><header><ul class=\"navs\"><li ng-class=\"{ active: vm.section == 1 }\"><a ui-sref=\"submit-work-features({ id: vm.workId })\">Features</a></li><li ng-class=\"{ active: vm.section == 2 }\"><a ui-sref=\"submit-work-visuals({ id: vm.workId })\">Visual Design</a></li><li ng-if=\"vm.projectType == \'DESIGN_AND_CODE\'\" ng-class=\"{ active: vm.section == 3 }\"><a ui-sref=\"submit-work-development({ id: vm.workId })\">Development</a></li></ul><progress value=\"{{ vm.section }}\" max=\"{{ vm.numberOfSections }}\"></progress></header><header><div class=\"house\"><div class=\"icon checkmark biggest\"></div></div><h1>Visual Design</h1><p>Help us define the visual style of your mobile app.</p></header><ul ng-class=\"{active: vm.showPaths}\" class=\"path-choices\"><li><div class=\"icon\"></div><h3>Choose Styles</h3><p>Pick few fonts style for your mobile app</p><button ng-click=\"vm.showChooseStyles()\" class=\"action wide\">select</button></li><li><div class=\"icon\"></div><h3>Upload styles</h3><p>Pick color palette for your mobile app</p><button ng-click=\"vm.showUploadStyles()\" class=\"action wide\">select</button></li><li><div class=\"icon\"></div><h3>Get style from url</h3><p>Pick graphic style for your mobile app.</p><button ng-click=\"vm.showUrlStyles()\" class=\"action wide\">select</button></li></ul><a ui-sref=\"submit-work-development({ id: vm.workId })\" class=\"wider action\">go to development</a><modal show=\"vm.showUploadStylesModal\" background-click-close=\"background-click-close\" class=\"upload-documents\"><div class=\"upload\"><div class=\"icon upload\"></div><h2>Upload <strong>documents</strong></h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><ap-uploader config=\"vm.visualsUploaderConfig\" uploading=\"vm.visualsUploaderUploading\" has-errors=\"vm.visualsUploaderHasErrors\"></ap-uploader></div></modal><modal show=\"vm.showUrlStylesModal\" background-click-close=\"background-click-close\" class=\"enter-url\"><div class=\"upload\"><div class=\"icon upload\"></div><h2>Enter your <strong>url</strong></h2><p>You can enter your website address and we\'ll grab your colors, fonts amd ocpms to use when designing your new app.</p><form ng-submit=\"vm.save()\"><input type=\"url\" placeholder=\"http://www.example.com\" ng-model=\"vm.url\" required=\"required\" class=\"wide\"/><button type=\"submit\" class=\"wider action\">enter</button></form></div></modal><modal show=\"vm.showChooseStylesModal\" background-click-close=\"background-click-close\" class=\"full choose-styles\"><ul class=\"nav\"><li><button ng-click=\"vm.viewPrevious()\" class=\"clean\">&lt;</button></li><li><button ng-click=\"vm.activateModal(\'fonts\')\" class=\"clean\">fonts</button></li><li><button ng-click=\"vm.activateModal(\'colors\')\" class=\"clean\">colors</button></li><li><button ng-click=\"vm.activateModal(\'icons\')\" class=\"clean\">icons</button></li><li><button ng-click=\"vm.viewNext()\" class=\"clean\">&gt;</button></li></ul><main ng-show=\"vm.activeStyleModal == \'fonts\' \" class=\"fonts\"><h2>Tell us your <strong>font preference</strong></h2><ul class=\"or-choices\"><li ng-repeat-start=\"font in vm.fonts\"><h3>{{font.name}}</h3><hr/><p>{{font.description}}</p><ul ng-if=\"font.name == \'Serif\' \" class=\"samples\"><li class=\"baskerville\">Baskerville is a serif font.</li><li class=\"times\">Times New Roman is a serif font</li><li class=\"courier\">Courier is a serif font.</li></ul><ul ng-if=\"font.name == \'Sans Serif\' \" class=\"samples\"><li class=\"sofia\">Sofia is a sans-serif font.</li><li class=\"arial\">Arial is a sans-serif font.</li><li class=\"museo\">Museo Sans is a sans-serif font.</li></ul><button selectable=\"selectable\" type=\"button\" ng-model=\"vm.font\" value=\"font.id\"></button></li><li ng-repeat-end=\"ng-repeat-end\" ng-if=\"font.name == \'Serif\' \" class=\"or\"><div class=\"house\">OR</div></li></ul></main><main ng-show=\"vm.activeStyleModal == \'colors\' \" class=\"colors\"><h2>Tell us <strong>the colors</strong> you like</h2><ul><li ng-repeat=\"color in vm.colors\">{{color.name}}<img src=\"{{ color.imgUrl }}\" width=\"150\"/></li></ul></main><main ng-show=\"vm.activeStyleModal == \'icons\' \" class=\"icons\"><h2>Tell us <strong>the icons</strong> you like</h2><ul><li ng-repeat=\"icon in vm.icons\"><div class=\"colorIcon\"></div><h4>{{icon.name}}</h4><p>{{icon.description}}</p><button type=\"button\" selectable=\"selectable\" ng-model=\"vm.icon\" value=\"icon.id\"></button></li></ul></main><footer><button ng-hide=\"vm.backButtonDisabled\" ng-click=\"vm.viewPrevious()\" class=\"wider\">back</button><button ng-hide=\"vm.nextButtonDisabled\" ng-click=\"vm.viewNext()\" class=\"action wider\">next</button><button ng-show=\"vm.showFinishDesignButton\" ng-click=\"vm.save()\" class=\"action wider\">finish design</button></footer></modal>");
$templateCache.put("views/submit-work-development.directive.html","<header><ul class=\"navs\"><li ng-class=\"{ active: vm.section == 1 }\"><a ui-sref=\"submit-work-features({ id: vm.workId })\">Features</a></li><li ng-class=\"{ active: vm.section == 2 }\"><a ui-sref=\"submit-work-visuals({ id: vm.workId })\">Visual Design</a></li><li ng-if=\"vm.projectType == \'DESIGN_AND_CODE\'\" ng-class=\"{ active: vm.section == 3 }\"><a ui-sref=\"submit-work-development({ id: vm.workId })\">Development</a></li></ul><progress value=\"{{ vm.section }}\" max=\"{{ vm.numberOfSections }}\"></progress></header><header><div class=\"house\"><div class=\"icon checkmark biggest\"></div></div><h1>Development</h1><p>Help us understand the technical requirements of your app.</p></header><modal show=\"vm.showUploadModal\" background-click-close=\"background-click-close\" class=\"upload-documents\"><div class=\"upload\"><div class=\"icon upload\"></div><h2>Upload your <strong>Development specs</strong></h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><ap-uploader config=\"vm.uploaderConfig\" uploading=\"vm.uploaderUploading\" has-errors=\"vm.uploaderHasErrors\"></ap-uploader><button class=\"wider continue action\">kick off project</button></div></modal><ul class=\"path-choices\"><li><div class=\"icon\"></div><h3>Define development specs</h3><button type=\"button\" scroll-element=\"offlineAccess\" class=\"action wide\">select</button></li><li><div class=\"icon\"></div><h3>Upload development specs</h3><button ng-click=\"vm.showUpload()\" class=\"action wide\">select</button></li></ul><button type=\"button\" scroll-element=\"offlineAccess\" class=\"wider continue\">continue</button><form ng-submit=\"vm.save()\"><div id=\"offlineAccess\" class=\"interactive\"><h2>Do you require users to have <strong>offline access to data</strong>?</h2><p>This will affect backps and scalability.</p><ul class=\"or-choices\"><li><button ng-model=\"vm.work.offlineAccess\" label=\"yes\" value=\"true\" selectable=\"selectable\" type=\"button\" class=\"big widest\"></button><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></li><li class=\"or\"><div class=\"house\">OR</div></li><li><button ng-model=\"vm.work.offlineAccess\" label=\"no\" value=\"false\" selectable=\"selectable\" type=\"button\" class=\"big widest\"></button><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></li></ul></div><button type=\"button\" scroll-element=\"personalInfo\" class=\"wider continue\">continue</button><div id=\"personalInfo\" class=\"interactive\"><h2>Personal information</h2><p>Is there any level of personal information? (stored or transmitted)</p><ul class=\"or-choices\"><li><button ng-model=\"vm.work.usesPersonalInformation\" label=\"yes\" value=\"true\" selectable=\"selectable\" type=\"button\" class=\"big widest\"></button><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></li><li class=\"or\"><div class=\"house\">OR</div></li><li><button ng-model=\"vm.work.usesPersonalInformation\" label=\"no\" value=\"false\" selectable=\"selectable\" type=\"button\" class=\"big widest\"></button><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></li></ul></div><button type=\"button\" scroll-element=\"securityLevel\" class=\"wider continue\">continue</button><div id=\"securityLevel\" class=\"interactive\"><h2>What level of <strong>security do you need</strong>?</h2><ul class=\"path-choices\"><li><div class=\"img\"></div><h3>No security</h3><button selectable=\"selectable\" type=\"button\" ng-model=\"vm.work.securityLevel\" value=\"vm.securityLevels.none\"></button></li><li><div class=\"img\"></div><h3>Minimal security</h3><button selectable=\"selectable\" type=\"button\" ng-model=\"vm.work.securityLevel\" value=\"vm.securityLevels.minimal\"></button></li><li><div class=\"img\"></div><h3>Complete security</h3><button selectable=\"selectable\" type=\"button\" ng-model=\"vm.work.securityLevel\" value=\"vm.securityLevels.complete\"></button></li></ul></div><button type=\"button\" scroll-element=\"thirdPartyIntegrations\" class=\"wider continue\">continue</button><div id=\"thirdPartyIntegrations\" class=\"interactive\"><h2>How many 3rd party integrations</strong>?</h2><p>Enter the number of 3rd party integrations so we can estimate effort involved.</p><input type=\"number\" min=\"1\" max=\"6\" ng-model=\"vm.work.numberOfApiIntegrations\"/></div><button type=\"button\" class=\"wider save\">save</button><button type=\"submit\" class=\"wider kick-off action\">kick off project</button></form>");}]);
(function() {
  'use strict';
  var Service, noop, stripMeta, wrapWithMeta;

  Service = function() {};

  noop = function() {};

  wrapWithMeta = function(model, meta) {
    var metaTemplate, metaToApply;
    metaTemplate = {
      pending: false,
      error: null,
      propsUpdated: {},
      propsPending: {},
      propsErrored: {}
    };
    metaToApply = meta || metaTemplate;
    if (!model.o) {
      return model.o = metaToApply;
    }
  };

  stripMeta = function(model) {
    var meta;
    meta = model.o;
    if (model.o) {
      delete model.o;
    }
    return meta;
  };

  Service.prototype.fetchOne = function(options) {
    var apiCall, clearErrorsOnSuccess, handleResponse, model, request, updateCallback, updates;
    model = options.model || {};
    updates = options.updates || [];
    apiCall = options.apiCall || noop;
    updateCallback = options.updateCallback || noop;
    handleResponse = options.handleResponse !== false;
    clearErrorsOnSuccess = options.clearErrorsOnSuccess !== false;
    wrapWithMeta(model);
    model.o.pending = true;
    updateCallback(model);
    request = apiCall();
    request.then(function(response) {
      var name, now, prop;
      now = new Date();
      model.o.lastUpdated = now.toISOString();
      if (clearErrorsOnSuccess) {
        model.o.error = null;
      }
      for (name in response) {
        prop = response[name];
        if (response.propertyIsEnumerable(name)) {
          model[name] = prop;
        }
      }
      if (model.$promise) {
        delete model.$promise;
      }
      if (model.$resolved) {
        delete model.$resolved;
      }
      return response;
    });
    request["catch"](function(err) {
      return model.o.error = err;
    });
    return request["finally"](function() {
      model.o.pending = false;
      return updateCallback(model);
    });
  };

  Service.prototype.updateLocal = function(options) {
    var model, name, prop, updateCallback, updates;
    model = options.model || {};
    updates = options.updates || [];
    updateCallback = options.updateCallback || noop;
    wrapWithMeta(model);
    for (name in updates) {
      prop = updates[name];
      model[name] = prop;
    }
    return updateCallback(model);
  };

  Service.prototype.restore = function(options) {};

  Service.prototype.update = function(options) {
    Service.prototype.updateLocal(options);
    return Service.prototype.save(options);
  };

  Service.prototype.save = function(options) {
    var apiCall, clearErrorsOnSuccess, handleResponse, meta, model, name, prop, request, rollbackOnFailure, updateCallback, updates;
    model = options.model || {};
    updates = options.updates;
    apiCall = options.apiCall || noop;
    updateCallback = options.updateCallback || noop;
    handleResponse = options.handleResponse !== false;
    clearErrorsOnSuccess = options.clearErrorsOnSuccess !== false;
    rollbackOnFailure = options.rollbackOnFailure || false;
    meta = stripMeta(model);
    request = apiCall(angular.copy(model));
    wrapWithMeta(model, meta);
    for (name in updates) {
      prop = updates[name];
      model.o.propsPending[name] = true;
    }
    updateCallback(model);
    request.then(function(response) {
      var now, results;
      now = new Date();
      model.o.lastUpdated = now.toISOString();
      if (clearErrorsOnSuccess) {
        model.o.propsErrored = {};
      }
      if (handleResponse) {
        results = [];
        for (name in updates) {
          prop = updates[name];
          results.push(model[name] = response[name]);
        }
        return results;
      }
    });
    request["catch"](function(err) {
      var results;
      if (rollbackOnFailure) {
        Service.prototype.restore(options);
      }
      results = [];
      for (name in updates) {
        prop = updates[name];
        model[name] = prop;
        results.push(model.o.errors[name] = err);
      }
      return results;
    });
    return request["finally"](function() {
      for (name in updates) {
        prop = updates[name];
        delete model.o.pending[name];
      }
      return updateCallback(model);
    });
  };

  Service.$inject = ['$rootScope'];

  angular.module('appirio-tech-ng-submit-work').service('Optimist', Service);

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

  SubmitWorkTypeController = function($scope, $rootScope, $state, SubmitWorkService, RequirementService) {
    var getUpdates, isValid, localStorageKey, recent, vm;
    vm = this;
    vm.loading = false;
    vm.showSuccessModal = false;
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
    vm.create = function() {
      var updates;
      updates = getUpdates();
      if (isValid(updates)) {
        vm.loading = true;
        return SubmitWorkService.create(updates).then(function() {
          return $state.go("submit-work-features");
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

  SubmitWorkTypeController.$inject = ['$scope', '$rootScope', '$state', 'SubmitWorkService', 'RequirementService'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkTypeController', SubmitWorkTypeController);

}).call(this);

(function() {
  'use strict';
  var SubmitWorkVisualController;

  SubmitWorkVisualController = function($scope, $rootScope, $state, SubmitWorkService, Optimist, API_URL, RequirementService) {
    var activate, configureUploader, getUpdates, localStorageKey, onChange, updateButtons, vm;
    if ($scope.workId) {
      localStorageKey = "recentSubmitWorkSection-" + $scope.workId;
      localStorage[localStorageKey] = 'visuals';
    }
    vm = this;
    vm.workId = $scope.workId;
    vm.loading = true;
    vm.visualsUploaderUploading = null;
    vm.visualsUploaderHasErrors = null;
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
    vm.save = function() {
      var updates;
      updates = getUpdates();
      return SubmitWorkService.save(updates).then(function() {
        return $state.go("submit-work-development");
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
      return $state.go("submit-work-development");
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
      var assetType, category, domain, workId;
      domain = API_URL;
      workId = vm.workId;
      category = 'work';
      assetType = 'specs';
      return vm.visualsUploaderConfig = {
        name: 'uploader' + vm.workId,
        allowMultiple: true,
        query: {
          url: domain + '/v3/work-files/assets',
          params: {
            filter: 'id=' + workId + '&assetType=' + assetType + '&category=' + category
          }
        },
        presign: {
          url: domain + '/v3/work-files/uploadurl',
          params: {
            id: workId,
            assetType: assetType,
            category: category
          }
        },
        createRecord: {
          url: domain + '/v3/work-files',
          params: {
            id: workId,
            assetType: assetType,
            category: category
          }
        },
        removeRecord: {
          url: domain + '/v3/work-files/:fileId',
          params: {
            filter: 'category=' + category
          }
        }
      };
    };
    onChange = function() {
      var ref, ref1, ref2, work;
      work = SubmitWorkService.get();
      if (work.o.pending) {
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

  SubmitWorkVisualController.$inject = ['$scope', '$rootScope', '$state', 'SubmitWorkService', 'Optimist', 'API_URL', 'RequirementService'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkVisualController', SubmitWorkVisualController);

}).call(this);

(function() {
  'use strict';
  var SubmitWorkFeaturesController;

  SubmitWorkFeaturesController = function($scope, $rootScope, SubmitWorkService, SubmitWorkAPIService, API_URL, RequirementService) {
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
    vm.featuresUploaderUploading = null;
    vm.featuresUploaderHasErrors = null;
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
      uploaderValid = !vm.featuresUploaderUploading && !vm.featuresUploaderHasErrors;
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
      var assetType, category, domain, workId;
      domain = API_URL;
      workId = vm.workId;
      category = 'work';
      assetType = 'specs';
      return vm.featuresUploaderConfig = {
        name: 'uploader' + vm.workId,
        allowMultiple: true,
        query: {
          url: domain + '/v3/work-files/assets',
          params: {
            filter: 'id=' + workId + '&assetType=' + assetType + '&category=' + category
          }
        },
        presign: {
          url: domain + '/v3/work-files/uploadurl',
          params: {
            id: workId,
            assetType: assetType,
            category: category
          }
        },
        createRecord: {
          url: domain + '/v3/work-files',
          params: {
            id: workId,
            assetType: assetType,
            category: category
          }
        },
        removeRecord: {
          url: domain + '/v3/work-files/:fileId',
          params: {
            filter: 'category=' + category
          }
        }
      };
    };
    onChange = function() {
      var work;
      work = SubmitWorkService.get();
      if (work.o.pending) {
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

  SubmitWorkFeaturesController.$inject = ['$scope', '$rootScope', 'SubmitWorkService', 'SubmitWorkAPIService', 'API_URL', 'RequirementService'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkFeaturesController', SubmitWorkFeaturesController);

}).call(this);

(function() {
  'use strict';
  var SubmitWorkDevelopmentController;

  SubmitWorkDevelopmentController = function($scope, $rootScope, $state, SubmitWorkService, API_URL) {
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
    vm.save = function() {
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
        updates.status = 'SUBMITTED';
        return SubmitWorkService.save(updates).then(function() {
          return $state.go('view-work-multiple');
        });
      }
    };
    configureUploader = function() {
      var assetType, category, domain, workId;
      domain = API_URL;
      workId = vm.workId;
      category = 'work';
      assetType = 'specs';
      return vm.uploaderConfig = {
        name: 'uploader' + vm.workId,
        allowMultiple: true,
        query: {
          url: domain + '/v3/work-files/assets',
          params: {
            filter: 'id=' + workId + '&assetType=' + assetType + '&category=' + category
          }
        },
        presign: {
          url: domain + '/v3/work-files/uploadurl',
          params: {
            id: workId,
            assetType: assetType,
            category: category
          }
        },
        createRecord: {
          url: domain + '/v3/work-files',
          params: {
            id: workId,
            assetType: assetType,
            category: category
          }
        },
        removeRecord: {
          url: domain + '/v3/work-files/:fileId',
          params: {
            filter: 'category=' + category
          }
        }
      };
    };
    onChange = function() {
      var work;
      work = SubmitWorkService.get();
      if (work.o.pending) {
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

  SubmitWorkDevelopmentController.$inject = ['$scope', '$rootScope', '$state', 'SubmitWorkService', 'API_URL'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkDevelopmentController', SubmitWorkDevelopmentController);

}).call(this);

(function() {
  'use strict';
  var srv;

  srv = function($rootScope, Optimist, SubmitWorkAPIService) {
    var currentWorkId, emitUpdates, service, work, workTemplate;
    service = {};
    work = {};
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
    service.get = function() {
      return angular.copy(work);
    };
    service.create = function(updates) {
      var apiCall, updateCallback;
      work = angular.copy(workTemplate);
      apiCall = function(model) {
        return SubmitWorkAPIService.post({}, model).$promise;
      };
      updateCallback = function(model) {
        currentWorkId = model.id;
        return emitUpdates();
      };
      return Optimist.update({
        model: work,
        updates: updates,
        apiCall: apiCall,
        updateCallback: updateCallback,
        handleResponse: false
      });
    };
    service.fetch = function(workId) {
      var apiCall, params;
      if (workId !== currentWorkId) {
        work = angular.copy(workTemplate);
        currentWorkId = workId;
      }
      params = {
        id: currentWorkId
      };
      apiCall = function() {
        return SubmitWorkAPIService.get(params).$promise;
      };
      return Optimist.fetchOne({
        model: work,
        apiCall: apiCall,
        updateCallback: emitUpdates
      });
    };
    service.save = function(updates) {
      var apiCall;
      apiCall = function(model) {
        var params;
        params = {
          id: currentWorkId
        };
        return SubmitWorkAPIService.put(params, model).$promise;
      };
      return Optimist.update({
        model: work,
        updates: updates,
        apiCall: apiCall,
        updateCallback: emitUpdates
      });
    };
    return service;
  };

  srv.$inject = ['$rootScope', 'Optimist', 'SubmitWorkAPIService'];

  angular.module('appirio-tech-ng-submit-work').factory('SubmitWorkService', srv);

}).call(this);

(function() {
  'use strict';
  var srv;

  srv = function($rootScope, Optimist, SubmitWorkAPIService) {
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

  srv.$inject = ['$rootScope', 'Optimist', 'SubmitWorkAPIService'];

  angular.module('appirio-tech-ng-submit-work').factory('RequirementService', srv);

}).call(this);
