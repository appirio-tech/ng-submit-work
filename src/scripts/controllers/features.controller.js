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
