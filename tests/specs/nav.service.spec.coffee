'use strict'

navServ        = null
scope          = null
state          = null
activeState    = null
submitWorkServ = null
nextState      = null
defaultCompleted = null

describe 'NavService', ->

  beforeEach inject ($rootScope, NavService) ->
    navServ = NavService
    scope = $rootScope

  it 'should be defined', ->
    expect(navServ).to.be.defined

  describe 'find state', ->
    context 'when state is valid', ->
      beforeEach ->
        state = navServ.findState 'name'

      it 'should return correct state', ->
        expect(state).to.eql('key': 'name')

  describe 'set active state', ->
    context 'when state is a string', ->
      beforeEach ->
        navServ.setActiveState 'type'
        activeState = navServ.activeState

      it 'should set correct active state', ->
        expect(activeState).to.equal('type')

    context 'when state is an object', ->
      beforeEach ->
        navServ.setActiveState 'key': 'type'
        activeState = navServ.activeState

      it 'should set correct active state', ->
        expect(activeState).to.equal('type')

  describe 'set next state', ->
    context 'when current state is the first state', ->
      beforeEach ->
        nextState = navServ.setNextState()

      it 'should set the next state to "type"', ->
        expect(nextState).to.equal('type')

    context 'when current state is "features"', ->
      beforeEach ->
        navServ.setActiveState('features')
        nextState = navServ.setNextState()

      it 'should set the next state to "designs"', ->
        expect(nextState).to.equal('designs')

  describe 'reset', ->
    beforeEach ->
        navServ.reset()
        state  = navServ.activeState
        defaultCompleted =
          aboutProject : false
          users        : false
          features     : false
          design       : false
          launch       : false

    it 'should set active state to "name"', ->
      expect(state).to.equal('name')

    it 'should reset "completed" to "defaultCompleted"', ->
      expect(navServ.completed).to.eql(defaultCompleted)
