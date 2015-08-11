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
