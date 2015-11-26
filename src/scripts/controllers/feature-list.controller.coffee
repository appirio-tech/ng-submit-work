'use strict'

FeaturelistController = ($scope) ->
  vm                 = this
  vm.activateFeature = $scope.activateFeature
  vm.headerText      = $scope.headerText
  vm.features        = $scope.features

  activate = ->
    $scope.$watch 'activeFeature', (newValue) ->
      vm.activeFeature = newValue

    vm


  activate()

FeaturelistController.$inject = ['$scope']

angular.module('appirio-tech-ng-submit-work').controller 'FeaturelistController', FeaturelistController