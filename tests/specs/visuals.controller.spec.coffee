'use strict'

mockData =
  projectType: 'DESIGN_AND_CODE'
  offlineAccess: true
  usesPersonalInformation: true
  securityLevel: 'minimal'
  numberOfApiIntegrations: 5
  o:
    pending: false

describe 'SubmitWorkVisualController', ->
  vm = null
  mockedService = null
  calledWith = null

  beforeEach ->
    bard.inject this, '$rootScope', '$q', '$controller', 'SubmitWorkService'
    scope = $rootScope.$new()
    scope.workId = 'someIdString'

    mockedService = bard.mockService SubmitWorkService,
      get: mockData
      save: (updates) ->
        deferred = $q.defer()
        calledWith = updates
        deferred.resolve()
        deferred.promise

    vm = $controller('SubmitWorkVisualController', $scope: scope)

  afterEach ->
    calledWith = null

  describe 'Visuals Controller', ->
    it 'should be created successfully', ->
      expect(vm).to.be.defined

    it 'should initialize work', ->
      expect(vm.workId).to.equal 'someIdString'
      expect(vm.loading).to.be.true
      expect(vm.visualsUploaderUploading).to.be.null
      expect(vm.visualsUploaderHasErrors).to.be.null
      expect(vm.showPaths).to.be.true
      expect(vm.showChooseStylesModal).to.be.false
      expect(vm.showUploadStylesModal).to.be.false
      expect(vm.showUrlStylesModal).to.be.false
      expect(vm.activeStyleModal).to.be.null
      expect(vm.nextButtonDisabled).to.be.false
      expect(vm.backButtonDisabled).to.be.false
      expect(vm.styleModals).to.be.an 'array'

    describe 'showChooseStyles', ->
      it 'should update vm for proper display', ->
        vm.showPaths = true
        vm.showChooseStylesModal = false
        vm.backButtonDisabled = false

        vm.showChooseStyles()

        expect(vm.showPaths).to.be.false
        expect(vm.showChooseStylesModal).to.be.true
        expect(vm.backButtonDisabled).to.be.true

    describe 'showUploadStyles', ->
      it 'should update vm for proper display', ->
        vm.showUploadStylesModal = false
        vm.showUploadStyles()
        expect(vm.showUploadStylesModal).to.be.true

    describe 'showUrlStyles', ->
      it 'should update vm for proper display', ->
        vm.showUrlStylesModal = false
        vm.showUrlStyles()
        expect(vm.showUrlStylesModal).to.be.true

    describe 'activateModal', ->
      it 'should update vm for proper display', ->
        modal = {}
        vm.activeStyleModal = false
        vm.activateModal(modal)
        expect(vm.activeStyleModal).to.equal modal

    describe 'save', ->
      it 'should update vm for proper display', ->
        vm.font = 'abc'
        vm.colors = [
          { id: 'abc', selected: true }
          { id: 'def', selected: true }
        ]
        vm.icon = 'abc'
        vm.url = 'http://someurl.com'

        vm.save()
        expect(calledWith).to.have.all.keys 'fontIds', 'colorSwatchIds', 'iconsetIds', 'designUrls'
