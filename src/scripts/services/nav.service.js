(function () {
  'use strict';

  angular
    .module('appirio-tech-ng-submit-work')
    .factory('NavService', NavService);

  NavService.$inject = ['SubmitWorkService'];
  /* @ngInject */
  function NavService(SubmitWorkService) {

    var service = {

      // variables
      completed      : {},
      states         : [],
      activeState    : '',

      // functions
      setActiveState : null,
      findState      : null,
      setNextState   : null,
      reset          : null

    };

    service.completed = {
      aboutProject : false,
      users        : false,
      features     : false,
      design       : false,
      launch       : false
    };

    // for resetting
    var defaultCompleted = angular.copy(service.completed);

    service.states = [
      { 'key': 'name' },
      { 'key': 'type' },
      { 'key': 'brief' },
      { 'key': 'competitors' },
      { 'key': 'users' },
      { 'key': 'features' },
      { 'key': 'designs' },
      { 'key': 'estimate' }
    ];


    function setCompleted () {
      var aboutProjectStates = ['name', 'type', 'brief', 'competitors'];
      var userState          = service.findState('users');
      var featureState       = service.findState('features');
      var designState        = service.findState('designs');
      var estimateState      = service.findState('estimate');

      service.completed.aboutProject = true;

      angular.forEach(aboutProjectStates, function (aboutProjectState, i) {
        var state = service.findState(aboutProjectState);

        service.completed.aboutProject = service.completed.aboutProject && state && state.form && state.form.$valid && state.visited;
      });
      service.completed.aboutProject = service.completed.aboutProject && userState.visited;
      service.completed.users        = userState && userState.form && userState.form.$valid && featureState.visited;
      service.completed.features     = featureState && featureState.form && featureState.form.$valid && designState.visited;
      service.completed.design       = designState && designState.form && designState.form.$valid && estimateState.visited;
      service.completed.launch       = estimateState && estimateState.form && estimateState.form.$valid;
    }

    function getActiveStateIndex () {
      var index = 0;

      angular.forEach(service.states, function(state, i) {
        if (state.key == service.activeState) {
          index = i;
        }
      });

      return index;
    }

    service.setActiveState = function(key) {
      if (typeof key != 'string') {
        key = key.key;
      }

      service.activeState = key;

      service.findState(key).visited = true;

      setCompleted();

      SubmitWorkService.save();
    };

    service.findState = function(key) {
      var found;

      angular.forEach(service.states, function(state, i) {
        if (state.key == key) {
          found = state;
        }
      });

      return found;
    };

    service.getStateIndex = function(key) {
      var i;
      for (i = 0; i < service.states.length; i++) {
        if (service.states[i].key == key) {
          return i;
        }
      }
      return -1;
    }

    service.setNextState = function(current) {
      var activeIndex;
      if (current) {
        activeIndex = service.getStateIndex(current);
      } else {
        activeIndex = getActiveStateIndex();
      }
      var nextState = service.states[activeIndex + 1];

      service.setActiveState(nextState);

      return service.activeState;
    };

    service.reset = function() {
      service.setActiveState('name');
      service.states.forEach(function(state) {
        if (state.form) {
        state.form.$setPristine();
        state.form.$setUntouched();
        }
      });
      service.completed = defaultCompleted;
      defaultCompleted = angular.copy(defaultCompleted);
    };

    return service;

  }
})();
