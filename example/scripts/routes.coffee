'use strict'

config = ($stateProvider) ->
  states = {}

  states['submit-work'] =
    url         : '/'
    title       : 'submit work type'
    controller  : 'TypeController as vm'
    templateUrl : 'views/submit-work-type.example.html'

  states['submit-work-type-no-update'] =
    url         : '/submit-work-type-no-update'
    title       : 'submit work type no update'
    controller  : 'TypeController as vm'
    templateUrl : 'views/submit-work-type-no-update.example.html'

  states['submit-work-features'] =
    url         : '/submit-work/features'
    title       : 'submit work features'
    controller  : 'FeaturesExampleController as vm'
    templateUrl : 'views/submit-work-features.example.html'

  states['submit-work-features-no-update'] =
    url         : '/submit-work/features-no-update'
    title       : 'submit work features no update'
    controller  : 'FeaturesExampleController as vm'
    templateUrl : 'views/submit-work-features-no-update.example.html'

  states['submit-work-visuals'] =
    url         : '/submit-work/visuals'
    title       : 'submit work visuals'
    controller  : 'VisualExampleController as vm'
    templateUrl : 'views/submit-work-visuals.example.html'

  states['submit-work-visuals-no-update'] =
    url         : '/submit-work/visuals-no-update'
    title       : 'submit work visuals no update'
    controller  : 'VisualExampleController as vm'
    templateUrl : 'views/submit-work-visuals-no-update.example.html'

  states['submit-work-development'] =
    url         : '/submit-work/development'
    title       : 'submit work development'
    controller  : 'DevelopmentExampleController as vm'
    templateUrl : 'views/submit-work-development.example.html'

  states['submit-work-development-no-update'] =
    url         : '/submit-work/development-no-update'
    title       : 'submit work development no update'
    controller  : 'DevelopmentExampleController as vm'
    templateUrl : 'views/submit-work-development-no-update.example.html'

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


