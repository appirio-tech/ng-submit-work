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
