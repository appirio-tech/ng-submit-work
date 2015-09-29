'use strict'

devData =
  projectType: 'DESIGN_AND_CODE'
  offlineAccess: true
  usesPersonalInformation: true
  securityLevel: 'minimal'
  numberOfApiIntegrations: 5
  o:
    pending: false

describe 'SubmitWorkDevelopmentController', ->
  mockedService = null
  vm            = null
  calledWith    = null

  beforeEach ->
    bard.inject this, '$rootScope', '$q', '$controller', 'SubmitWorkService'
    scope = $rootScope.$new()
    scope.workId = 'someIdString'

    mockedService = bard.mockService SubmitWorkService,
      get: devData
      fetch: ->
        $rootScope.$emit 'SubmitWorkService.work:changed'
      save: (updates) ->
        deferred = $q.defer()
        calledWith = updates
        deferred.resolve()
        deferred.promise

    vm = $controller('SubmitWorkDevelopmentController', $scope: scope)

  afterEach ->
    calledWith = null

  it 'should be created successfully', ->
    expect(vm).to.be.defined

  it 'should initialize vm based on work request', ->
    expect(vm.loading).to.be.false
    expect(vm.workId).to.equal 'someIdString'
    expect(vm.showUploadModal).to.be.false
    expect(vm.showSpecsModal).to.be.false
    expect(vm.uploaderUploading).to.be.false
    expect(vm.uploaderHasErrors).to.be.false
    expect(vm.securityLevels).to.have.keys 'none', 'minimal', 'complete'
    expect(vm.work.offlineAccess).to.be.a 'boolean'
    expect(vm.work.usesPersonalInformation).to.be.a 'boolean'
    expect(vm.work.securityLevel).to.be.a 'string'
    expect(vm.work.numberOfApiIntegrations).to.be.a 'number'
    expect(vm.projectType).to.be.a 'string'
    expect(vm.section).to.be.a 'number'
    expect(vm.numberOfSections).to.be.a 'number'

  it 'vm.save() should call mockedService to save project', ->
    vm.save()
    expect(calledWith).to.exist

  it 'vm.showUpload() should update vm', ->
    vm.showUpload()
    expect(vm.showUploadModal).to.be.true

  it 'vm.showSpecs() should update vm', ->
    vm.showSpecs()
    expect(vm.showSpecsModal).to.be.true