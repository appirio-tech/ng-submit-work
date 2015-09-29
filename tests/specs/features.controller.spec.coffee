'use strict'

featuresData =
  features: []
  projectType: 'DESIGN_AND_CODE'
  o:
    pending: false

describe 'SubmitWorkFeaturesController', ->
  calledWith = null
  mockedService    = null
  vm         = null

  beforeEach ->
    bard.inject this, '$rootScope', '$q', '$controller', 'SubmitWorkService'
    scope = $rootScope.$new()
    scope.workId = 'someIdString'

    mockedService = bard.mockService SubmitWorkService,
      get: featuresData
      save: (updates) ->
        deferred = $q.defer()
        calledWith = updates
        deferred.resolve()
        deferred.promise
      fetch: ->
        $rootScope.$emit 'SubmitWorkService.work:changed'

    vm = $controller('SubmitWorkFeaturesController', $scope: scope)

  it 'should be created successfully', ->
    expect(vm).to.be.defined

  it 'should initialize vm based on work request', ->
    expect(vm.workId).to.equal 'someIdString'
    expect(vm.loading).to.be.false
    expect(vm.showFeaturesModal).to.be.false
    expect(vm.showUploadModal).to.be.false
    expect(vm.showDefineFeaturesForm).to.be.false
    expect(vm.activeFeature).to.be.null
    expect(vm.featuresUploaderUploading).to.be.null
    expect(vm.featuresUploaderHasErrors).to.be.null
    expect(vm.features).to.be.an 'array'

    expect(vm.customFeature).to.have.all.keys 'id', 'title', 'description', 'notes', 'custom', 'fileIds'
    expect(vm.selectedFeaturesCount).to.be.a 'number'
    expect(vm.projectType).to.be.a 'string'
    expect(vm.section).to.be.a 'number'
    expect(vm.numberOfSections).to.be.a 'number'

  it 'vm.showFeatures should update the vm', ->
    expect(vm.showFeaturesModal).to.be.false
    vm.showFeatures()
    expect(vm.showFeaturesModal).to.be.true

  it 'vm.showUpload should update the vm', ->
    expect(vm.showUploadModal).to.be.false
    vm.showUpload()
    expect(vm.showUploadModal).to.be.true

  it 'vm.toggleDefineFeatures() should update the vm', ->
    expect(vm.showDefineFeaturesForm).to.be.false
    vm.toggleDefineFeatures()
    expect(vm.showDefineFeaturesForm).to.be.true

  it 'vm.hideCustomFeatures() should update the vm', ->
    vm.showDefineFeaturesForm = true
    vm.hideCustomFeatures()
    expect(vm.showDefineFeaturesForm).to.be.false

  it 'vm.activateFeature() should update the vm', ->
    expect(vm.activeFeature).to.be.null
    featureToActivate = {}
    vm.activateFeature featureToActivate
    expect(vm.activeFeature).to.equal featureToActivate

  it 'vm.applyFeature() should update the updated features list', ->
    expect(vm.updatedFeatures.length).to.equal 0
    vm.activeFeature = { id: 'def' }
    vm.features      = [ { id: 'abc' }, { id: 'def' } ]
    vm.applyFeature()
    expect(vm.updatedFeatures.length).to.equal 1

  it 'vm.removeFeature() should update the updated features list', ->
    vm.updatedFeatures = [ { id: 'abc' }, { id: 'def' } ]
    vm.activeFeature   = { id: 'def' }
    vm.removeFeature()
    expect(vm.updatedFeatures.length).to.equal 1

  it 'vm.addCustomFeature() should update the updated features list', ->
    vm.updatedFeatures = []
    vm.customFeature =
      id: null
      title: 'Testing'
      description: '1.. 2.. 3..'
      notes: null
      custom: true
      fileIds: []

    vm.addCustomFeature()
    expect(vm.updatedFeatures.length).to.equal 1

  it 'vm.save() should call the service\'s save method with the updated feature list', ->
    vm.updatedFeatures = [ { id: 'abc' } ]
    vm.save()
    expect(calledWith.features[0].id).to.equal vm.updatedFeatures[0].id