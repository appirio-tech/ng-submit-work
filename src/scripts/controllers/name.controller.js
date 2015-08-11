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
