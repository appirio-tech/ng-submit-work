'use strict'
describe 'SubmitWorkVisualController', ->

  controller = null

  beforeEach ->
    bard.inject this, '$rootScope', '$q', '$controller', 'SubmitWorkService'
    scope = $rootScope.$new()

    bard.mockService SubmitWorkService,
      _default:
        $promise:
          $q.when
            name       : null
            requestType: null
            summary    : null
            o:
              hasPending: false
      work:
        o:
          hasPending: false

    controller = $controller('SubmitWorkVisualController', $scope: scope)
    scope.vm = controller

  describe 'Visuals Controller', ->
    it 'should be created successfully', ->
      expect(controller).to.be.defined

    it 'should initialize work', ->
      expect(controller.work).to.be.ok

    it 'should initialize visualDesign', ->
      expect(controller.visualDesign).to.be.ok

    it 'should have a save method', ->
     expect(controller.save).to.exist

    it 'should have a submitVisualsmethod', ->
     expect(controller.save).to.exist

    it 'should call service to save project', ->
      controller.workId              = '123'
      controller.visualDesign = {}
      controller.visualDesign.fonts  = [id: '1234', selected: true]
      controller.visualDesign.colors = [id: '1234', selected: true]
      controller.visualDesign.icons  = [id: '1234', selected: true]
      controller.save()
      expect(SubmitWorkService.save.called).to.be.ok

    it 'should save visual designs when options are selected', ->
      controller.visualDesign =
        fonts: ['123']
        colors: ['123']
        icons: ['123']

      controller.submitVisuals()
      expect(SubmitWorkService.save.called).to.be.ok

    it 'should not save visual designs when options are incomplete', ->
      controller.visualDesign =
        fonts: []
        colors: ['123']
        icons: []

      controller.submitVisuals()
      expect(saveSpy.called).not.to.be.ok
