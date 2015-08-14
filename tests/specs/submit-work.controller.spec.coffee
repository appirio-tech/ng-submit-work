'use strict'

scope          = null
submitWorkServ = null
navServ        = null
stateSpy       = null

describe 'SubmitWorkController', ->
  beforeEach inject ($controller, $rootScope, SubmitWorkService, NavService, $state) ->
    scope          = $rootScope.$new()
    submitWorkServ = SubmitWorkService
    navServ        = NavService
    stateSpy       = sinon.spy $state, 'go'

    stashIt navServ, 'states'
    stashIt navServ, 'activeState'
    stashIt navServ, 'completed'

    # Allow manipulation of states
    navServ.states = []

    for state in ['name', 'type']
      navServ.states.push
        key: state,
        form:
          '$valid': true
          '$setDirty': ->
            true
          '$setPristine': ->
            true
          '$setUntouched': ->
            true

    $controller 'SubmitWorkController', $scope: scope

  afterEach ->
    stateSpy.restore()
    unstashIt navServ, 'states'
    unstashIt navServ, 'activeState'
    unstashIt navServ, 'completed'

  it 'should define activeState', ->
    expect(scope.activeState).to.isDefined

  it 'should define work', ->
    expect(scope.work).to.isDefined

  it 'should define completed', ->
    expect(scope.completed).to.isDefined

  it 'should define asideService', ->
    expect(scope.asideService).to.isDefined

  describe 'watch service to set active state', ->
    beforeEach inject ->
      navServ.activeState = 'type'
      scope.$apply()

    it 'should set activeState to "type"', ->
      expect(scope.activeState).to.equal 'type'

  describe 'watch service to set completed', ->
    beforeEach inject ->
      navServ.completed = true
      scope.$apply()

    it 'should set completed to true', ->
      expect(scope.completed).to.ok

