'use strict'

controller = null
scope = null

describe 'SubmitWorkCompetitorsController', ->
  beforeEach inject ($rootScope, $controller) ->
    scope = $rootScope.$new()
    controller = $controller 'SubmitWorkCompetitorsController', $scope: scope
    $rootScope.$apply()

  describe 'competitors controller', ->
    it 'should be created successfully', ->
      expect(controller).to.be.defined

    it 'should not initally have competitor apps', ->
      expect(controller.work.competitorApps.length).to.equal(0)

    it 'should not initally have an appName', ->
      expect(controller.appName).to.equal('')

    describe 'after activate', ->
      it 'should have title of Competitors', ->
       expect(controller.title).to.equal('Competitors')

    describe 'add competitor apps', ->
      beforeEach ->
        controller.appName = 'New App'
        controller.add()

      it 'should add an appName', ->
        expect(controller.work.competitorApps.length).to.equal(1)

      it 'should set appName to empty string', ->
        expect(controller.appName).to.equal('')
