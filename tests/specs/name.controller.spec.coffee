'use strict'

controller = null
scope = null
setNextStateSpy = null
navServNameState = null

describe 'SubmitWorkNameController', ->
  beforeEach inject ($rootScope, $controller, NavService) ->
    navServ = NavService
    navServNameState = navServ.findState 'name'
    setNextStateSpy = sinon.spy navServ, 'setNextState'
    scope = $rootScope.$new()
    scope.save = ->
      #nothing
    scope.nameForm =
      $valid: true
    controller = $controller 'SubmitWorkNameController', $scope: scope
    $rootScope.$apply()

  describe 'Name controller', ->
    it 'should be created successfully', ->
      expect(controller).to.be.defined

    describe 'submit', ->
      beforeEach ->
        controller.submit()

      context 'when name form is valid', ->

        it 'should set "name" state on NavService to "visited"', ->
          expect(navServNameState.visited).to.equal(true)

        it 'should call setNextState on NavService', ->
          expect(setNextStateSpy).to.have.been.called
