'use strict'
describe 'SubmitWorkDevelopmentController', ->

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
            features   : []
      work:
        o:
          hasPending: false
      save: $q.when

    controller = $controller('SubmitWorkDevelopmentController', $scope: scope)
    scope.vm = controller
    saveSpy = sinon.spy SubmitWorkService, 'save'

  describe 'Development Controller', ->
    it 'should be created successfully', ->
      expect(controller).to.be.defined

    it 'should initialize work', ->
      expect(controller.work).to.be.ok

    it 'should have a save method', ->
     expect(controller.save).to.exist

    it 'should call service to save project', ->
      controller.workId = '123'
      controller.work =
        offlineAccessRequired: true
        hasPersonalInformation: true
        securityLevel: 'minimal'
        thirdPartyIntegrations: '3'
      controller.save()
      expect(SubmitWorkService.save.called).to.be.ok

    it 'should save development when all options are selected', ->
      controller.workId = '123'
      controller.work =
        offlineAccessRequired: true
        hasPersonalInformation: true
        securityLevel: 'minimal'
        thirdPartyIntegrations: '3'
      controller.save()
      expect(SubmitWorkService.save.called).to.be.ok

    it 'should not save development when options are incomplete', ->
      controller.workId = '123'
      controller.work =
        offlineAccessRequired: true
        hasPersonalInformation: true
        securityLevel: null
        thirdPartyIntegrations: null
      controller.save()
      expect(SubmitWorkService.save.called).not.to.be.ok