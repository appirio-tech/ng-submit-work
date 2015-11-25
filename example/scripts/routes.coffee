'use strict'

config = ($stateProvider) ->
  states = {}

  states['submit-work'] =
    url         : '/'
    title       : 'submit work type'
    controller  : 'TypeController as vm'
    templateUrl : 'views/submit-work-type.example.html'

  states['submit-work-features'] =
    url         : '/submit-work/features'
    title       : 'submit work features'
    templateUrl : 'views/submit-work-features.example.html'

  states['submit-work-visuals'] =
    url         : '/submit-work/visuals'
    title       : 'submit work visuals'
    templateUrl : 'views/submit-work-visuals.example.html'

  states['submit-work-development'] =
    url         : '/submit-work/development'
    title       : 'submit work development'
    templateUrl : 'views/submit-work-development.example.html'

  states['submit-work-complete'] =
    url         : '/submit-work/complete'
    title       : 'submit work complete'
    templateUrl : 'views/submit-work-complete.example.html'

  states['feature-list'] =
    url         : '/feature-list'
    title       : 'feature-list'
    controller  : 'FeatureListExample as vm'
    templateUrl : 'views/feature-list.example.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()


