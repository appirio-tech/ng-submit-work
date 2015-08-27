'use strict'

config = ($stateProvider) ->
  states = {}

  states['submit-work'] =
    url         : '/'
    title       : 'submit work type'
    templateUrl : 'views/submit-work-type.html'

  states['submit-work-features'] =
    url         : '/submit-work/features'
    title       : 'submit work features'
    templateUrl : 'views/submit-work-features.html'


  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()


