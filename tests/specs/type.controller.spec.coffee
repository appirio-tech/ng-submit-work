'use strict'

controller = null
createSpy  = null

describe 'TypeController', ->
  beforeEach ->
    bard.inject this, '$rootScope', '$q', '$controller', 'SubmitWorkAPIService'
    scope = $rootScope.$new()

    work =
      name       : null
      requestType: null
      summary    : null
      features   : []

    promise  = $q.when work
    _default = $promise: promise

    bard.mockService SubmitWorkAPIService, _default: _default

    controller = $controller 'TypeController', $scope: scope
    scope.vm   = controller
    createSpy  = sinon.spy controller, 'createProject'

  afterEach ->
    createSpy.restore()

  describe 'Type Controller', ->
    it 'should be created successfully', ->
      expect(controller).to.be.defined

    context 'when a new project', ->
      it 'should not call API service for work data', ->
        expect(SubmitWorkAPIService.get.called).not.to.be.ok

      it 'should initialize work', ->
        expect(controller.work).to.be.ok

    context 'when an existing project', ->
      it 'should initialize work', ->
        expect(controller.work).to.be.ok

    it 'should have a toggleType method', ->
      expect(controller.toggleType).to.exist

    it 'should have a createProject method', ->
     expect(controller.createProject).to.exist

    it 'should set requestType of project', ->
      controller.toggleType('Design')
      expect(controller.work.requestType).to.equal('Design')

    it 'should create a project when all fields are completed', ->
      controller.work.name        = 'abc'
      controller.work.requestType = 'Design'
      controller.work.summary     = 'abc'
      controller.createProject()
      expect(createSpy.called).to.be.ok

    it 'should initialize work', ->
      expect(controller.work).to.be.defined
