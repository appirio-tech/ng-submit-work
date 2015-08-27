'use strict'
describe 'TypeController', ->

  controller = null
  saveSpy = null

  beforeEach ->
    bard.inject this, '$rootScope', '$q', '$controller', 'SubmitWorkAPIService'
    scope = $rootScope.$new()

    bard.mockService SubmitWorkAPIService,
      _default:
        $promise:
          $q.when
            name       : null
            requestType: null
            summary    : null
            features   : []

    controller = $controller('TypeController', $scope: scope)
    scope.vm = controller
    saveSpy = sinon.spy controller, 'save'

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

    it 'should have a createProject method', ->
     expect(controller.createProject).to.exist

    it 'should set requestType of project', ->
      controller.toggleType('Design')
      expect(controller.work.requestType).to.equal('Design')

    it 'should call API service with put to save project', ->
      controller.workId = '123'
      controller.save()
      expect(SubmitWorkAPIService.put.called).to.be.ok

    it 'should call API service with post to create new project', ->
      controller.save()
      expect(SubmitWorkAPIService.post.called).to.be.ok

    it 'should create a project when all fields are completed', ->
      controller.work.name = 'abc'
      controller.work.requestType = 'Design'
      controller.work.summary = 'abc'
      controller.createProject()
      expect(saveSpy.called).to.be.ok

    it 'should initialize work', ->
      expect(controller.work).to.be.defined