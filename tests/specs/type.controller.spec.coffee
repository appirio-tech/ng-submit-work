'use strict'

describe 'SubmitWorkTypeController', ->
  mockedService = null
  vm            = null
  calledWith    = null

  beforeEach ->
    bard.inject this, '$rootScope', '$q', '$controller', 'SubmitWorkService'
    scope = $rootScope.$new()

    mockedService = bard.mockService SubmitWorkService,
      create: (updates) ->
        deferred = $q.defer()
        calledWith = updates
        deferred.resolve()
        deferred.promise

    vm = $controller 'SubmitWorkTypeController', $scope: scope

  afterEach ->
    calledWith = null

  it 'should be created successfully', ->
    expect(vm).to.be.defined

  context 'when a new project', ->
    it 'should initialize work', ->
      expect(vm.name).to.be.a 'string'
      expect(vm.devices).to.be.an 'array'
      expect(vm.orientations).to.be.an 'array'
      expect(vm.projectTypes).to.be.an 'array'
      expect(vm.brief).to.be.a 'string'

  it 'should call service to create project', ->
    vm.projectType    = 'DESIGN_AND_CODE'
    vm.name           = 'Test name'
    vm.brief          = 'Test brief'

    vm.devices = [
      { id: 'abc', selected: true }
      { id: 'def', selected: false }
    ]

    vm.orientations = [
      { id: 'abc', selected: true }
      { id: 'def', selected: false }
    ]

    vm.create()
    expect(calledWith).to.have.all.keys 'projectType', 'name', 'brief', 'deviceIds', 'orientationIds'
