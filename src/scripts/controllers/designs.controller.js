/*global form:true */
(function () {
  'use strict';

  angular
    .module('appirio-tech-ng-submit-work')
    .controller('SubmitWorkDesignsController', SubmitWorkDesignsController);

  SubmitWorkDesignsController.$inject = ['$scope', '$state', 'SubmitWorkService', 'NavService', 'API_URL'];
  /* @ngInject */
  function SubmitWorkDesignsController($scope, $state, SubmitWorkService, NavService, API_URL) {
    var vm                      = this;
    vm.title                    = 'Designs';
    vm.work                     = SubmitWorkService.work;
    vm.designsUploaderUploading = null;
    vm.designsUploaderHasErrors = null;
    vm.submit;

    function configureUploader() {
      var workId = vm.work.id
      var assetType = 'specs';

      vm.designsUploaderConfig = {
        name: 'designsUploader' + workId,
        allowMultiple: true,
        queryUrl: API_URL + '/work-files/assets?filter=workId%3D' + workId + '%26assetType%3D' + assetType,
        urlPresigner: API_URL + '/work-files/uploadurl',
        fileEndpoint: API_URL + '/work-files/:fileId',
        saveParams: {
          workId: workId,
          assetType: assetType
        }
      };
    }

    // Configure uploader initially so the view can render
    configureUploader();

    // Update the uploader configuration once we have a work id
    $scope.$watch('vm.work.id', function(newValue) {
      configureUploader();
    });

    vm.submit = function () {
      if (!vm.designsUploaderUploading && !vm.designsUploaderHasErrors) {
        NavService.setNextState('designs');
      }
    };

    $scope.$watch('vm.designsUploaderUploading', function(newValue) {
      NavService.findState('designs').uploading= newValue;
    });

    $scope.$watch('vm.designsUploaderHasErrors', function(newValue) {
      NavService.findState('designs').hasErrors= newValue;
    });

    $scope.$watch('designForm', function(designForm) {
      if (designForm) {
        NavService.findState('designs').form = designForm;
      }
    });

  }
})();
