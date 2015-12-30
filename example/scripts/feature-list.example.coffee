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

    vm.activeFeature = vm.features[0]

    vm.activate = (feature)->
      vm.activeFeature = feature
      console.log('active feature is',  vm.activeFeature.name)

    vm

  activate()

angular.module('example').controller 'FeatureListExample', FeatureListExample
