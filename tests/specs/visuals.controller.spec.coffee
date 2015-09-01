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

    it 'should add default visual designs', ->
      controller.work.visualDesign =
        fonts: []
        colors: []
        icons: []

      controller.visualDesign =
        fonts: [
          name: 'Serif'
          description: 'a small line attached to the end of a stroke'
          selected : true
        ,
          name: 'Sans Serif'
          description: 'does not have the small `serifs`'
          selected: false
        ] ,
        colors: [
          name: 'Palette 1'
          description: 'Consectetur adipiscing'
          selected: true
        ,
          name: 'Palette 2'
          description: 'Consectetur adipiscing'
          selected: false
        ] ,
        icons: [
          name: 'Google'
          description: 'Lorem ipsum dolor sit amet'
          selected: false
        ,
          name: 'Anamorphic'
          description: 'Lorem ipsum dolor sit amet'
          selected: true
        ]

      controller.submitVisuals()
      expect(controller.work.visualDesign).to.eql
        fonts: [
          name: 'Serif'
          description: 'a small line attached to the end of a stroke'
        ],
        colors: [
          name: 'Palette 1'
          description: 'Consectetur adipiscing'
        ],
        icons: [
          name: 'Anamorphic'
          description: 'Lorem ipsum dolor sit amet'
        ]