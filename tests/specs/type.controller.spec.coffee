'use strict'

controller = null
saveSpy  = null

describe 'SubmitWorkTypeController', ->
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

    controller = $controller 'SubmitWorkTypeController', $scope: scope
    scope.vm   = controller
    saveSpy    = sinon.spy controller, 'save'

  afterEach ->
    saveSpy.restore()

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

    it 'should have a save method', ->
      expect(controller.save).to.exist

    it 'should set requestType of project', ->
      controller.toggleType('Design')
      expect(controller.work.requestType).to.equal('Design')

    it 'should call API service with put to save project', ->
      controller.workId           = '123'
      controller.work.name        = 'abc'
      controller.work.requestType = 'Design'
      controller.work.summary     = 'abc'
      controller.save()
      expect(SubmitWorkAPIService.put.called).to.be.ok

    it 'should call API service with post to create new project', ->
      controller.work.name        = 'abc'
      controller.work.requestType = 'Design'
      controller.work.summary     = 'abc'
      controller.save()
      expect(SubmitWorkAPIService.post.called).to.be.ok

    it 'should initialize work', ->
      expect(controller.work).to.be.defined
