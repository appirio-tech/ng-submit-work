'use strict'
describe 'SubmitWorkDevelopmentController', ->

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

    controller = $controller('SubmitWorkDevelopmentController', $scope: scope)
    scope.vm = controller
    saveSpy = sinon.spy controller, 'save'

  describe 'Development Controller', ->
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

    it 'should initialize securityLevels', ->
      expect(controller.securityLevels).to.be.ok

    it 'should initialize appPurposes', ->
      expect(controller.appPurposes).to.be.ok

    it 'should initialize thirdPartyIntegrations', ->
      expect(controller.thirdPartyIntegrations).to.be.ok

    it 'should have a save method', ->
     expect(controller.save).to.exist

    it 'should have a submitDevelopment method', ->
     expect(controller.submitDevelopment).to.exist

    it 'should call API service with put to save project', ->
      controller.workId = '123'
      controller.save()
      expect(SubmitWorkAPIService.put.called).to.be.ok

    it 'should save development when all options are selected', ->
      controller.work.development =
        appPurpose: 'enterprise'
        offlineAccess:
          required: true
          comments: 'abc'
        hasPersonalInformation: true
        securityLevel: 'none'
        thirdPartyIntegrations : ['Google']

      controller.submitDevelopment()
      expect(saveSpy.called).to.be.ok

    it 'should not save development when options are incomplete', ->
      controller.work.development =
        appPurpose: 'enterprise'
        offlineAccess:
          required: null
          comments: 'abc'
        hasPersonalInformation: true
        securityLevel: 'none'
        thirdPartyIntegrations : ['Google']

      controller.submitDevelopment()
      expect(saveSpy.called).not.to.be.ok