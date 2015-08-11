'use strict'

config = ($stateProvider) ->
  states = {}

  states['submissions'] =
    url         : '/'
    title       : 'submissions'
    templateUrl : 'views/submissions.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()


