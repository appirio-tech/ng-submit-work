'use strict'
describe 'SubmitWorkVisualController', ->

  controller = null
  saveSpy = null

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
      save: $q.when
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

    it 'should call service to save project', ->
      controller.workId              = '123'
      controller.visualDesign =
        fonts: '123'
        colors:'123'
        icons: '123'
      controller.save()
      expect(SubmitWorkService.save).to.have.been.called

    it 'should not save visual designs when options are incomplete', ->
      controller.visualDesign =
        fonts: null
        colors: null
        icons: '123'
      controller.save()
      expect(SubmitWorkService.save.called).not.to.be.ok
