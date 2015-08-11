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
