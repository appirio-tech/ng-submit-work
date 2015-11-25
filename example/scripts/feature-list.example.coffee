'use strict'

FeatureListExample = ->
  vm = this

  activate = ->
    vm.features = [
      name    : 'Introductions'
      active  : false
      selected: true
    ,
      name: 'spiderman'
      active: true
    ,
      name    : 'A very very very very very very very long feaking name'
      active  : false
      selected: true
    ]

    vm.activate = ->
      console.log 'lalalalalala i love you!'

    vm

  activate()

angular.module('appirio-tech-ng-work-layout').controller 'FeatureListExample', FeatureListExample
