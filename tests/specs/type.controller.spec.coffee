'use strict'

controller = null
saveSpy  = null

describe 'SubmitWorkTypeController', ->
  beforeEach ->
    bard.inject this, '$rootScope', '$q', '$controller', 'SubmitWorkService'
    scope = $rootScope.$new()

    work =
      name       : null
      requestType: null
      summary    : null
      features   : []

    promise  = $q.when work
    _default = $promise: promise

    bard.mockService SubmitWorkService,
      _default: _default
      save: $q.when

    controller = $controller 'SubmitWorkTypeController', $scope: scope
    scope.vm   = controller
    saveSpy    = sinon.spy SubmitWorkService, 'save'

  afterEach ->
    saveSpy.restore()

  describe 'Type Controller', ->
    it 'should be created successfully', ->
      expect(controller).to.be.defined

    context 'when a new project', ->
      it 'should call service for work data', ->
        expect(SubmitWorkService.fetch.called).not.to.be.ok

      it 'should initialize work', ->
        expect(controller.work).to.be.ok

    context 'when an existing project', ->
      it 'should initialize work', ->
        expect(controller.work).to.be.ok

    it 'should have a save method', ->
      expect(controller.save).to.exist

    it 'should call service to save project', ->
      controller.workId           = '123'
      controller.work.name        = 'abc'
      controller.work.summary     = 'abc'
      controller.type.requestTypes = [
        name: 'Design'
        selected: true
      ]
      controller.type.devices = [
        name: 'iphone'
        selected: true
      ]
      controller.type.orientations = [
        name: 'landscape'
        selected: true
      ]
      controller.type.operatingSystems = [
        name: 'ios'
        selected: true
      ]
      controller.save()
      expect(SubmitWorkService.save.called).to.be.ok

    it 'should initialize work', ->
      expect(controller.work).to.be.defined
