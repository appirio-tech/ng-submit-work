'use strict'

config = ($stateProvider) ->
  states = {}

  states['submit-work'] =
    url         : '/'
    title       : 'submit work type'
    controller  : 'TypeController as vm'
    templateUrl : 'views/submit-work-type.html'

  states['submit-work-features'] =
    url         : '/submit-work/features'
    title       : 'submit work features'
    templateUrl : 'views/submit-work-features.html'

  states['submit-work-visuals'] =
    url         : '/submit-work/visuals'
    title       : 'submit work visuals'
    templateUrl : 'views/submit-work-visuals.html'

  states['submit-work-development'] =
    url         : '/submit-work/development'
    title       : 'submit work development'
    templateUrl : 'views/submit-work-development.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()


