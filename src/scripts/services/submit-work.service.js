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
        WorkAPIService.save(work).then(function(data) {
          created = true;
          service.id = data.result.content;
          service.work.id = service.id;
          service.savePrice();
          deferred.resolve(data);
        }).catch(function(e) {
          $q.reject(e);
        });
      } else {
        work.id = service.id;
        service.work.id = service.id;
        WorkAPIService.put(work).then(function(data) {
          deferred.resolve(data);
        }).catch(function(e) {
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
      WorkAPIService.get({id: service.id}).then(function(data) {
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
      WorkAPIService.get({id: id}).then(function(data) {
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
