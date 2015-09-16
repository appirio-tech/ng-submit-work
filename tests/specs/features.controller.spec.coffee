'use strict'
describe 'SubmitWorkFeaturesController', ->

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
            features   : []

        save:
          $q.when

    controller = $controller('SubmitWorkFeaturesController', $scope: scope)
    scope.vm = controller

  describe 'Features Controller', ->
    it 'should be created successfully', ->
      expect(controller).to.be.defined

    context 'when an existing project', ->
      it 'should initialize work', ->
        expect(controller.work).to.be.ok

    it 'should have a toggleDefineFeatures method', ->
      expect(controller.toggleDefineFeatures).to.exist

    it 'should have a hideCustomFeatures method', ->
      expect(controller.hideCustomFeatures).to.exist

    it 'should have a addCustomFeature method', ->
      expect(controller.addCustomFeature).to.exist

    it 'should have a save method', ->
     expect(controller.save).to.exist

    it 'should set add custom features to work features', ->
      controller.features = []
      controller.customFeature =
        name: 'feature'
        description: 'description'
      controller.addCustomFeature()
      expect(controller.features.length).to.equal(1)

    it 'should call API service with put to save project', ->
      controller.workId = '123'
      controller.save()
      expect(SubmitWorkService.save.called).to.be.ok

    it 'should apply default features', ->
      controller.work.features = []
      controller.activeFeature =
        name: 'Login',
        description: 'Users can login / register for your app',

      controller.applyFeature()
      expect(controller.work.features.length).to.equal(1)

    it 'should initialize work', ->
      expect(controller.work).to.be.defined