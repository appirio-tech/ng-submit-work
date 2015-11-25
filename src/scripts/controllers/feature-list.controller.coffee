'use strict'

FeaturelistController = ($scope) ->
  vm = this
  vm.activateFeature = ->
    $scope.activate()

  activate = ->
    vm

  activate()

FeaturelistController.$inject = ['$scope']

angular.module('appirio-tech-ng-submit-work').controller 'FeaturelistController', FeaturelistController