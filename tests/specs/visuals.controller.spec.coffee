'use strict'
describe 'SubmitWorkVisualController', ->

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

    controller = $controller('SubmitWorkVisualController', $scope: scope)
    scope.vm = controller
    saveSpy = sinon.spy controller, 'save'

  describe 'Visuals Controller', ->
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

    it 'should initialize visualDesign', ->
      expect(controller.visualDesign).to.be.ok

    it 'should have a save method', ->
     expect(controller.save).to.exist

    it 'should have a submitVisualsmethod', ->
     expect(controller.submitVisuals).to.exist

    it 'should call API service with put to save project', ->
      controller.workId = '123'
      controller.save()
      expect(SubmitWorkAPIService.put.called).to.be.ok

    it 'should save visual designs when options are selected', ->
      controller.work.visualDesign =
        fonts: ['123']
        colors: ['123']
        icons: ['123']

      controller.submitVisuals()
      expect(saveSpy.called).to.be.ok

    it 'should not save visual designs when options are incomplete', ->
      controller.work.visualDesign =
        fonts: []
        colors: ['123']
        icons: []

      controller.submitVisuals()
      expect(saveSpy.called).not.to.be.ok
