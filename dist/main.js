(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-api-services', 'duScroll'];

  angular.module('appirio-tech-ng-submit-work', dependencies);

}).call(this);

angular.module("appirio-tech-ng-submit-work").run(["$templateCache", function($templateCache) {$templateCache.put("views/submit-work-features.directive.html","<header><ul class=\"navs\"><li class=\"active\"><a ui-sref=\"submit-work-features\">Features</a></li><li><a ui-sref=\"submit-work-visuals\">Visual Design</a></li><li><a ui-sref=\"submit-work-development\">Development</a></li></ul><progress value=\"2\" max=\"3\"></progress></header><header><div class=\"house\"><div class=\"icon checkmark biggest\"></div></div><h1>Specify Features</h1><p>Tell us what features we need to include in your new app.</p></header><ul class=\"path-choices\"><li><div class=\"icon\"></div><h3>Define features</h3><p>UX design greating the usability, accessibility, and costume journey.</p><button ng-click=\"vm.showFeatures()\" class=\"action wide\">select</button></li><li><div class=\"icon\"></div><h3>Upload document</h3><p>Upload your specs or any documents you have.</p><button ng-click=\"vm.showUpload()\" class=\"action wide\">select</button></li></ul><button ng-click=\"vm.showFeatures()\" class=\"wider action\">go to design</button><modal show=\"vm.showFeaturesModal\" background-click-close=\"background-click-close\" class=\"full define-features\"><h2>Data booklet mobile app <strong>features</strong></h2><main><ul class=\"features\"><li><ul><li ng-repeat=\"feature in vm.features track by $index\"><button ng-click=\"vm.activateFeature(feature)\" class=\"widest clean\"><div ng-class=\"{selected: feature.selected}\" class=\"icon\"></div><span>{{ feature.name }}</span></button></li></ul></li><li><button ng-click=\"vm.toggleDefineFeatures()\" class=\"widest clean\"><span>Define a new feature</span><div class=\"icon\">+</div></button></li></ul><ul class=\"contents\"><li><div ng-hide=\"vm.showDefineFeaturesForm\" ng-class=\"{active: !vm.activeFeature}\" class=\"default active\"><h4>Select and define features for your app</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></div><div ng-hide=\"vm.showDefineFeaturesForm\" ng-class=\"{active: vm.activeFeature}\" class=\"description\"><h4>Select and define features for your app</h4><h5>{{ vm.activeFeature.name }} description</h5><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><textarea placeholder=\"Notes...\" ng-model=\"vm.activeFeature.notes\" class=\"widest\"></textarea><button ng-if=\"!vm.activeFeature.selected\" ng-click=\"vm.applyFeature()\" class=\"wider action\">apply feature</button><button ng-if=\"vm.activeFeature.selected\" ng-click=\"vm.removeFeature()\" class=\"wider action\">remove feature</button></div><form ng-submit=\"vm.addCustomFeature()\" ng-class=\"{active: vm.showDefineFeaturesForm}\" class=\"new-feature\"><h4>Define a new feature</h4><label>New feature title</label><input type=\"text\" ng-model=\"vm.customFeature.name\" required=\"required\" class=\"widest\"/><label>New feature description</label><textarea ng-model=\"vm.customFeature.description\" required=\"required\" class=\"widest\"></textarea><button type=\"submit\" class=\"wider action\">add new feature</button><button type=\"button\" ng-click=\"vm.hideCustomFeatures()\">Cancel</button></form><div class=\"example\"><div class=\"phone\"></div></div></li><li><div class=\"count\">{{vm.selectedFeaturesCount}} features added</div><button ng-click=\"vm.save()\" class=\"wider action\">next</button></li></ul></main></modal><modal show=\"vm.showUploadModal\" background-click-close=\"background-click-close\" class=\"upload-documents\"><div class=\"upload\"><div class=\"icon upload\"></div><h2>Upload <strong>documents</strong></h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><ap-uploader config=\"vm.featuresUploaderConfig\" uploading=\"vm.featuresUploaderUploading\" has-errors=\"vm.featuresUploaderHasErrors\"></ap-uploader></div></modal>");
$templateCache.put("views/submit-work-type.directive.html","<loader ng-show=\"vm.loading\"></loader><header><h1>How to create a new project</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></header><form ng-submit=\"vm.save()\"><div class=\"interactive\"><input type=\"text\" placeholder=\"Name your project...\" required=\"true\" ng-model=\"vm.work.name\" class=\"wider\"/></div><button type=\"button\" scroll-element=\"platformDetails\" class=\"wider continue action\">continue</button><ul id=\"platformDetails\" class=\"target-platform interactive\"><li><h2>IOS <strong>platform details</strong></h2></li><li><h4>Devices</h4><ul><li ng-repeat=\"device in vm.type.devices\"><checkbox label=\"{{device.name}}\" ng-model=\"device.selected\"></checkbox></li></ul></li><li><h4>Orientation</h4><ul><li ng-repeat=\"orientation in vm.type.orientations\"><checkbox label=\"{{orientation.name}}\" ng-model=\"orientation.selected\"></checkbox></li></ul></li><li><h4>OS</h4><ul><li ng-repeat=\"os in vm.type.operatingSystems\"><checkbox label=\"{{os.name}}\" ng-model=\"os.selected\"></checkbox></li></ul></li></ul><button type=\"button\" scroll-element=\"typeDetails\" class=\"wider continue action\">continue</button><ul id=\"typeDetails\" class=\"type interactive\"><li><h2>What <strong>type of work</strong> are you looking for?</h2></li><li ng-repeat=\"requestType in vm.type.requestTypes\"><h4>{{requestType.name}}</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><img ng-if=\"requestType.name == \'Design\'\" src=\"http://www.collegequest.com/wp-content/uploads/what-do-graphic-designers-do.jpg\"/><img ng-if=\"requestType.name == \'Design &amp; Development\'\" src=\"http://pbwebdev.com/blog/wp-content/uploads/2014/06/developer.jpg\"/><button type=\"button\" selectable=\"true\" ng-model=\"vm.work.requestType\" value=\"requestType.name\">Design</button></li></ul><button type=\"button\" scroll-element=\"briefDetails\" class=\"wider continue action\">continue</button><div id=\"briefDetails\" class=\"interactive\"><h2>Can you <strong>share a brief</strong> overview?</h2><textarea placeholder=\"E.g. I need a mobile HR application with social features to support my growing organization\" ng-model=\"vm.work.summary\" class=\"brief\"></textarea><button type=\"submit\" ng-if=\"!vm.workId\" class=\"create wider\">Create Project</button><button type=\"submit\" ng-if=\"vm.workId\" class=\"save wider\">Save</button></div></form><modal show=\"vm.showSuccessModal\" background-click-close=\"background-click-close\"><div class=\"success\"><h2>Awesome!</h2><p>Your {{ vm.work.name }} is set up now</p><p>Share your email to signup and we\'ll be sure to send a project link.</p><form><input type=\"email\" required=\"required\"/><button type=\"submit\">Submit</button></form></div></modal>");}]);
(function() {
  'use strict';
  var Service, enumProps, noop;

  Service = function() {};

  noop = function() {};

  enumProps = function() {
    var props;
    return props = {
      value: {},
      configurable: true,
      writable: true,
      enumerable: false
    };
  };

  Service.prototype.fetch = function(options) {
    var apiCall, clearErrorsOnSuccess, collection, replaceCollection, request, updateCallback;
    collection = options.collection;
    apiCall = options.apiCall || noop;
    updateCallback = options.updateCallback || noop;
    replaceCollection = options.replaceCollection !== false;
    clearErrorsOnSuccess = options.clearErrorsOnSuccess !== false;
    request = apiCall();
    if (collection.o == null) {
      Object.defineProperty(collection, 'o', enumProps());
    }
    collection.o.pending = true;
    updateCallback(collection);
    request.then(function(response) {
      var i, j, now, ref, results;
      now = new Date();
      collection.o.lastUpdated = now.toISOString();
      if (replaceCollection) {
        collection.length = 0;
        results = [];
        for (i = j = 0, ref = response.length; j < ref; i = j += 1) {
          results.push(collection.push(response[i]));
        }
        return results;
      }
    });
    request["catch"](function(err) {
      return collection.o.error = err;
    });
    return request["finally"](function() {
      collection.o.pending = false;
      return updateCallback(collection);
    });
  };

  Service.prototype.addToCollection = function(options) {
    var apiCall, clearErrorsOnSuccess, collection, handleResponse, item, request, updateCallback;
    collection = options.collection;
    item = options.item;
    apiCall = options.apiCall || noop;
    updateCallback = options.updateCallback || noop;
    handleResponse = options.handleResponse !== false;
    clearErrorsOnSuccess = options.clearErrorsOnSuccess !== false;
    request = apiCall(item);
    if (item.o == null) {
      Object.defineProperty(item, 'o', enumProps());
    }
    item.o.pending = true;
    item.o.confirmed = false;
    collection.push(item);
    updateCallback(collection);
    request.then(function(response) {
      var name, now, prop, results;
      now = new Date();
      item.o.lastUpdated = now.toISOString();
      item.o.confirmed = true;
      if (handleResponse) {
        results = [];
        for (name in response) {
          prop = response[name];
          results.push(item[name] = response[name]);
        }
        return results;
      }
    });
    request["catch"](function(err) {
      return item.o.error = err;
    });
    return request["finally"](function() {
      item.o.pending = false;
      return updateCallback(collection);
    });
  };

  Service.prototype.fetchOne = function(options) {
    var apiCall, clearErrorsOnSuccess, handleResponse, model, request, updateCallback, updates;
    model = options.model || {};
    updates = options.updates || [];
    apiCall = options.apiCall || noop;
    updateCallback = options.updateCallback || noop;
    handleResponse = options.handleResponse !== false;
    clearErrorsOnSuccess = options.clearErrorsOnSuccess !== false;
    request = apiCall();
    if (model.o == null) {
      Object.defineProperty(model, 'o', enumProps());
    }
    model.o.hasPending = true;
    updateCallback(model);
    request.then(function(response) {
      var name, now, prop, results;
      now = new Date();
      model.o.lastUpdated = now.toISOString();
      if (clearErrorsOnSuccess) {
        model.o.errors = {};
      }
      if (handleResponse) {
        results = [];
        for (name in response) {
          prop = response[name];
          results.push(model[name] = response[name]);
        }
        return results;
      }
    });
    request["catch"](function(err) {
      return model.o.error = err;
    });
    return request["finally"](function() {
      model.o.hasPending = false;
      return updateCallback(model);
    });
  };

  Service.prototype.update = function(options) {
    var apiCall, backup, clearErrorsOnSuccess, handleResponse, model, name, o, prop, request, updateCallback, updates;
    model = options.model || {};
    updates = options.updates || [];
    apiCall = options.apiCall || noop;
    updateCallback = options.updateCallback || noop;
    handleResponse = options.handleResponse !== false;
    clearErrorsOnSuccess = options.clearErrorsOnSuccess !== false;
    backup = {};
    for (name in updates) {
      prop = updates[name];
      backup[name] = model[name];
      model[name] = prop;
    }
    if (model.o) {
      o = model.o;
      delete model.o;
    }
    request = apiCall(model);
    Object.defineProperty(model, 'o', enumProps());
    if (o) {
      model.o = o;
    } else {
      model.o = {};
    }
    model.o.pending = {};
    model.o.errors = {};
    for (name in updates) {
      prop = updates[name];
      model.o.pending[name] = true;
    }
    updateCallback(model);
    request.then(function(response) {
      var now, results;
      now = new Date();
      model.o.lastUpdated = now.toISOString();
      if (clearErrorsOnSuccess) {
        model.o.errors = {};
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
      results = [];
      for (name in backup) {
        prop = backup[name];
        model[name] = prop;
        results.push(model.o.errors[name] = err);
      }
      return results;
    });
    return request["finally"](function() {
      model.o.pending.rankedSubmissions = false;
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

  SubmitWorkTypeController = function($scope, $rootScope, Optimist, SubmitWorkService) {
    var activate, config, getUpdates, onChange, typeValid, vm;
    vm = this;
    vm.loading = true;
    vm.showSuccessModal = false;
    vm.workId = $scope.workId;
    config = {
      name: null
    };
    config.requestTypes = [
      {
        name: 'Design',
        id: '1235',
        selected: false
      }, {
        name: 'Design & Development',
        id: '1234',
        selected: false
      }
    ];
    config.devices = [
      {
        name: 'iPhone5c',
        id: '1234',
        selected: false
      }, {
        name: 'iPhone5s',
        id: '1235',
        selected: false
      }
    ];
    config.orientations = [
      {
        name: 'Landscape',
        id: '1234',
        selected: false
      }, {
        name: 'Portrait',
        id: '1235',
        selected: false
      }
    ];
    config.operatingSystems = [
      {
        name: 'iOS7',
        id: '1234',
        selected: false
      }, {
        name: 'iOS8',
        id: '1235',
        selected: false
      }
    ];
    vm.save = function() {
      var updates, workValid;
      workValid = typeValid();
      updates = getUpdates();
      if (workValid) {
        return SubmitWorkService.save(updates).then(function() {
          return vm.showSuccessModal = true;
        });
      }
    };
    typeValid = function() {
      var isValid, type, updates, value;
      updates = getUpdates();
      isValid = true;
      for (type in updates) {
        value = updates[type];
        if (Array.isArray(value)) {
          if (!value.length) {
            isValid = false;
          }
        } else {
          isValid = value;
        }
      }
      return isValid;
    };
    getUpdates = function() {
      var updates;
      updates = {
        requestType: vm.work.requestType,
        name: vm.work.name,
        summary: vm.work.summary,
        devices: [],
        orientations: [],
        operatingSystems: []
      };
      vm.type.devices.forEach(function(device) {
        if (device.selected) {
          return updates.devices.push({
            id: device.id
          });
        }
      });
      vm.type.orientations.forEach(function(orientation) {
        if (orientation.selected) {
          return updates.orientations.push({
            id: orientation.id
          });
        }
      });
      vm.type.operatingSystems.forEach(function(operatingSystem) {
        if (operatingSystem.selected) {
          return updates.operatingSystems.push({
            id: operatingSystem.id
          });
        }
      });
      return updates;
    };
    onChange = function() {
      var updates;
      if (SubmitWorkService.work) {
        SubmitWorkService.work.devices = [
          {
            id: '1234'
          }
        ];
        SubmitWorkService.work.orientations = [
          {
            id: '1235'
          }
        ];
        SubmitWorkService.work.operatingSystems = [
          {
            id: '1235'
          }
        ];
        vm.work = {
          name: SubmitWorkService.work.name,
          requestType: SubmitWorkService.work.requestType,
          summary: SubmitWorkService.work.summary,
          devices: SubmitWorkService.work.devices,
          orientations: SubmitWorkService.work.orientations,
          operatingSystems: SubmitWorkService.work.operatingSystems
        };
      } else {
        vm.work = {
          name: null,
          requestType: null,
          summary: null,
          devices: [],
          orientations: [],
          operatingSystems: []
        };
      }
      vm.loading = false;
      if (!vm.type) {
        vm.type = config;
        vm.work.devices.forEach(function(device) {
          return vm.type.devices.forEach(function(vmDevice) {
            if (device.id === vmDevice.id) {
              return vmDevice.selected = true;
            }
          });
        });
        vm.work.orientations.forEach(function(orientation) {
          return vm.type.orientations.forEach(function(vmOrientation) {
            if (orientation.id === vmOrientation.id) {
              return vmOrientation.selected = true;
            }
          });
        });
        vm.work.operatingSystems.forEach(function(os) {
          return vm.type.operatingSystems.forEach(function(vmOs) {
            if (os.id === vmOs.id) {
              return vmOs.selected = true;
            }
          });
        });
      }
      return updates = getUpdates();
    };
    activate = function() {
      var destroyWorkListener;
      destroyWorkListener = $rootScope.$on("SubmitWorkService.work:changed", function() {
        return onChange();
      });
      $scope.$on('$destroy', function() {
        return destroyWorkListener();
      });
      if (vm.workId) {
        SubmitWorkService.fetch(vm.workId);
      } else {
        onChange();
      }
      return vm;
    };
    return activate();
  };

  SubmitWorkTypeController.$inject = ['$scope', '$rootScope', 'Optimist', 'SubmitWorkService'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkTypeController', SubmitWorkTypeController);

}).call(this);

(function() {
  'use strict';
  var SubmitWorkVisualController;

  SubmitWorkVisualController = function($scope, $rootScope, $state, SubmitWorkService, Optimist, API_URL) {
    var activate, config, configureUploader, getUpdates, onChange, updateButtons, visualDesignValid, vm;
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
    config = {};
    config.fonts = [
      {
        name: 'Serif',
        description: 'Classic design, good legiblity for large and small text.',
        id: '123',
        selected: false
      }, {
        name: 'Sans Serif',
        id: '456',
        description: 'Modern design, good for headers and body text.',
        selected: false
      }
    ];
    config.colors = [
      {
        name: 'Palette 1',
        description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        id: '1234',
        selected: false
      }, {
        name: 'Palette 2',
        description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        id: '1235',
        selected: false
      }, {
        name: 'Palette 3',
        description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        id: '1236',
        selected: false
      }, {
        name: 'Palette 4',
        description: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        id: '1237',
        selected: false
      }
    ];
    config.icons = [
      {
        name: 'Flat Colors',
        description: 'Lorem ipsum dolor sit amet',
        id: '1234',
        selected: false
      }, {
        name: 'Thin Line',
        description: 'Lorem ipsum dolor sit amet',
        id: '1235',
        selected: false
      }, {
        name: 'Solid Line',
        description: 'Lorem ipsum dolor sit amet',
        id: '1236',
        selected: false
      }
    ];
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
      var updates, visualsValid;
      visualsValid = visualDesignValid();
      updates = getUpdates();
      if (visualsValid) {
        return SubmitWorkService.save(updates).then(function() {
          return $state.go("submit-work-development");
        });
      }
    };
    visualDesignValid = function() {
      var hasVisualChoices, hasVisuals, updates, uploaderValid;
      updates = getUpdates();
      uploaderValid = !vm.visualsUploaderUploading && !vm.visualsUploaderHasErrors;
      hasVisualChoices = updates.font && updates.icons;
      hasVisuals = hasVisualChoices || updates.url;
      return hasVisuals;
    };
    getUpdates = function() {
      var updates;
      updates = {
        font: vm.work.font,
        colors: vm.work.colors,
        icons: vm.work.icons,
        url: null
      };
      if (vm.work.url) {
        updates.url = vm.visualDesign.url;
      }
      return updates;
    };
    vm.navigateDevelopment = function() {
      var visualsValid;
      visualsValid = visualsValid();
      if (visualsValid) {
        return $state.go("submit-work-development");
      }
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
    onChange = function() {
      if (SubmitWorkService.work.o.hasPending) {
        return false;
      }
      vm.loading = false;
      SubmitWorkService.work.visualDesign = {};
      SubmitWorkService.work.visualDesign.url = null;
      SubmitWorkService.work.visualDesign.font = {
        id: '123'
      };
      SubmitWorkService.work.visualDesign.colors = {
        id: '1236'
      };
      SubmitWorkService.work.visualDesign.icons = {
        id: '1234'
      };
      if (!vm.visualDesign) {
        vm.visualDesign = config;
        vm.visualDesign.fonts = config.fonts;
        vm.visualDesign.colors = config.colors;
        vm.visualDesign.icons = config.icons;
      }
      vm.work = {};
      vm.work.icons = SubmitWorkService.work.visualDesign.icons;
      vm.work.colors = SubmitWorkService.work.visualDesign.colors;
      vm.work.font = SubmitWorkService.work.visualDesign.font;
      return vm.work.url = null;
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
      onChange();
      return vm;
    };
    return activate();
  };

  SubmitWorkVisualController.$inject = ['$scope', '$rootScope', '$state', 'SubmitWorkService', 'Optimist', 'API_URL'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkVisualController', SubmitWorkVisualController);

}).call(this);

(function() {
  'use strict';
  var SubmitWorkFeaturesController;

  SubmitWorkFeaturesController = function($scope, $rootScope, SubmitWorkService, SubmitWorkAPIService, API_URL) {
    var activate, config, configureUploader, getUpdates, onChange, vm;
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
    config = {};
    config.defaultFeatures = [
      {
        id: '123',
        name: 'Login',
        description: 'Users can login / register for your app',
        notes: null,
        custom: null,
        selected: false
      }, {
        id: '124',
        name: 'Onboarding',
        description: 'Users can see data from social networks (FB, Twitter etc.) in your app',
        notes: null,
        custom: null,
        selected: false
      }, {
        id: '125',
        name: 'Registration',
        description: 'Users can create profiles with personal info',
        notes: null,
        custom: null,
        selected: false
      }, {
        id: '126',
        name: 'Location',
        description: 'A map with a user\'s GPS location that helps them get to places',
        notes: null,
        custom: null,
        selected: false
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
      return vm.showDefineFeaturesForm = false;
    };
    vm.activateFeature = function(feature) {
      return vm.activeFeature = feature;
    };
    vm.applyFeature = function() {
      vm.features.forEach(function(feature) {
        if (feature.name === vm.activeFeature.name) {
          return feature.selected = true;
        }
      });
      vm.activeFeature = null;
      return onChange();
    };
    vm.removeFeature = function() {
      vm.features.forEach(function(feature, index) {
        if (feature.name === vm.activeFeature.name) {
          return vm.features.splice(index, 1);
        }
      });
      vm.activeFeature = null;
      return onChange();
    };
    vm.addCustomFeature = function() {
      var customFeatureValid;
      customFeatureValid = vm.customFeature.name && vm.customFeature.description;
      if (customFeatureValid) {
        vm.customFeature.selected = true;
        vm.features.push(vm.customFeature);
        vm.hideCustomFeatures();
        return onChange();
      }
    };
    vm.save = function() {
      var hasFeatures, updates, uploaderValid;
      uploaderValid = !vm.featuresUploaderUploading && !vm.featuresUploaderHasErrors;
      updates = getUpdates();
      hasFeatures = updates.selectedFeatures.length || updates.customFeatures.length;
      if (uploaderValid && hasFeatures) {
        return SubmitWorkService.save(updates);
      }
    };
    getUpdates = function() {
      var updates;
      updates = {
        selectedFeatures: [],
        customFeatures: []
      };
      vm.features.forEach(function(feature) {
        if (feature.id) {
          if (feature.selected) {
            return updates.selectedFeatures.push({
              id: feature.id
            });
          }
        } else {
          if (feature.selected) {
            return updates.customFeatures.push(feature);
          }
        }
      });
      return updates;
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
    onChange = function() {
      var updates;
      if (SubmitWorkService.work.o.hasPending) {
        return false;
      }
      vm.loading = false;
      vm.customFeature = {
        name: null,
        description: null,
        custom: true
      };
      if (!vm.features.length) {
        config.defaultFeatures.forEach(function(feature) {
          return vm.features.push(feature);
        });
        SubmitWorkService.work.features.forEach(function(feature) {
          if (!feature.id) {
            feature.selected = true;
            return vm.features.push(feature);
          }
        });
        SubmitWorkService.work.features.forEach(function(feature) {
          return vm.features.forEach(function(vmFeature) {
            if (feature.id === vmFeature.id) {
              return vmFeature.selected = true;
            }
          });
        });
      }
      updates = getUpdates();
      vm.selectedFeaturesCount = updates.selectedFeatures.length + updates.customFeatures.length;
      return vm.work = SubmitWorkService.work;
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

  SubmitWorkFeaturesController.$inject = ['$scope', '$rootScope', 'SubmitWorkService', 'SubmitWorkAPIService', 'API_URL'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkFeaturesController', SubmitWorkFeaturesController);

}).call(this);

(function() {
  'use strict';
  var SubmitWorkDevelopmentController;

  SubmitWorkDevelopmentController = function($scope, $rootScope, SubmitWorkService, API_URL) {
    var activate, configureUploader, onChange, vm, workValid;
    vm = this;
    vm.loading = true;
    vm.workId = $scope.workId;
    vm.showUploadModal = false;
    vm.showSpecsModal = false;
    vm.developmentUploaderUploading = false;
    vm.developmentUploaderHasErrors = false;
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
      var developmentValid, updates, uploaderValid;
      developmentValid = workValid(vm.work);
      uploaderValid = !vm.developmentUploaderUploading && !vm.developmentUploaderHasErrors;
      updates = vm.work;
      if (developmentValid && uploaderValid) {
        return SubmitWorkService.save(updates);
      }
    };
    workValid = function(work) {
      var isValid, property, value;
      isValid = true;
      for (property in work) {
        value = work[property];
        if (value === null) {
          isValid = false;
        }
      }
      return isValid;
    };
    configureUploader = function() {
      var assetType, queryUrl;
      assetType = 'specs';
      queryUrl = API_URL + '/v3/work-files/assets?filter=workId%3D' + vm.workId + '%26assetType%3D' + assetType;
      return vm.developmentUploaderConfig = {
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
    onChange = function() {
      if (SubmitWorkService.work.o.hasPending) {
        return false;
      }
      vm.loading = false;
      SubmitWorkService.work.offlineAccessRequired = null;
      SubmitWorkService.work.hasPersonalInformation = null;
      SubmitWorkService.work.securityLevel = null;
      SubmitWorkService.work.thirdPartyIntegrations = null;
      vm.work = {};
      vm.work.offlineAccessRequired = SubmitWorkService.work.offlineAccessRequired;
      vm.work.hasPersonalInformation = SubmitWorkService.work.hasPersonalInformation;
      vm.work.securityLevel = SubmitWorkService.work.securityLevel;
      return vm.work.thirdPartyIntegrations = SubmitWorkService.work.thirdPartyIntegrations;
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
      onChange();
      return vm;
    };
    return activate();
  };

  SubmitWorkDevelopmentController.$inject = ['$scope', '$rootScope', 'SubmitWorkService', 'API_URL'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkDevelopmentController', SubmitWorkDevelopmentController);

}).call(this);

(function() {
  'use strict';
  var mockWork, srv;

  mockWork = {};

  srv = function($rootScope, Optimist, SubmitWorkAPIService) {
    var currentWorkId, emitUpdates, submitWorkService;
    currentWorkId = null;
    submitWorkService = {
      work: {}
    };
    emitUpdates = function() {
      return $rootScope.$emit('SubmitWorkService.work:changed');
    };
    submitWorkService.fetch = function(workId) {
      var apiCall, params;
      if (workId !== currentWorkId) {
        submitWorkService.work = {};
        currentWorkId = workId;
      }
      params = {
        id: currentWorkId
      };
      apiCall = function() {
        return SubmitWorkAPIService.get(params).$promise;
      };
      return Optimist.fetchOne({
        model: submitWorkService.work,
        apiCall: apiCall,
        updateCallback: emitUpdates
      });
    };
    submitWorkService.save = function(updates) {
      var apiCall;
      apiCall = function(model) {
        var params;
        params = {
          id: currentWorkId
        };
        return SubmitWorkAPIService.put(params, model).$promise;
      };
      return Optimist.update({
        model: submitWorkService.work,
        updates: updates,
        apiCall: apiCall,
        updateCallback: emitUpdates
      });
    };
    return submitWorkService;
  };

  srv.$inject = ['$rootScope', 'Optimist', 'SubmitWorkAPIService'];

  angular.module('appirio-tech-ng-submit-work').factory('SubmitWorkService', srv);

}).call(this);
