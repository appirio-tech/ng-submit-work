'use strict'
describe 'SubmitWorkFeaturesController', ->

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

    controller = $controller('SubmitWorkFeaturesController', $scope: scope)
    scope.vm = controller
    saveSpy = sinon.spy controller, 'save'

  describe 'Features Controller', ->
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

    it 'should have a showCustomFeatureModal method', ->
      expect(controller.showCustomFeatureModal).to.exist

    it 'should have a hideCustomFeatureModal method', ->
      expect(controller.hideCustomFeatureModal).to.exist

    it 'should have a addCustomFeature method', ->
      expect(controller.addCustomFeature).to.exist

    it 'should have a save method', ->
     expect(controller.save).to.exist

    it 'should have a submitFeatures method', ->
     expect(controller.submitFeatures).to.exist

    it 'should set add custom features to work features', ->
      controller.work.features = []
      controller.customFeature =
        name: 'feature'
      controller.addCustomFeature()
      expect(controller.work.features).to.eql([name: 'feature'])

    it 'should call API service with put to save project', ->
      controller.workId = '123'
      controller.save()
      expect(SubmitWorkAPIService.put.called).to.be.ok

    it 'should add default features', ->
      controller.work.features = []
      controller.defaultFeatures = [
          name: 'Login',
          description: 'Users can login / register for your app',
          checked: true
        ,
          name: 'Onboarding',
          description: 'Users can see data from social networks (FB, Twitter etc.) in your app',
          checked: false
      ]
      controller.submitFeatures()
      expect(controller.work.features.length).to.equal(1)

    it 'should initialize work', ->
      expect(controller.work).to.be.defined