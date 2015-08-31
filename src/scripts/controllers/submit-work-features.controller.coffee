'use strict'

SubmitWorkFeaturesController = ($scope) ->
  vm                         = this
  vm.showDefineAFeatureModal = true

  activate = ->
    vm

  activate()

SubmitWorkFeaturesController.$inject = ['$scope']

angular.module('appirio-tech-ng-submit-work').controller 'SubmitWorkFeaturesController', SubmitWorkFeaturesController