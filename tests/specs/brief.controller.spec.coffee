'use strict'

controller = null
scope = null
navServ = null
navServBriefState = null
setNextStateSpy = null

describe 'SubmitWorkBriefController', ->

  beforeEach inject ($rootScope, $controller, NavService) ->
    navServ = NavService
    navServBriefState = navServ.findState 'brief'
    setNextStateSpy = sinon.spy navServ, 'setNextState'
    scope = $rootScope.$new()
    scope.briefForm = "project brief"
    scope.elevatorForm = "elevator pitch"
    scope.questionForm = "question"
    controller = $controller 'SubmitWorkBriefController', $scope: scope
    $rootScope.$apply()

  afterEach ->
    setNextStateSpy.restore()

  describe 'Brief controller', ->
    it 'should be created successfully', ->
      expect(controller).to.be.defined

  describe 'after activate', ->
    it 'should have a title of Brief', ->
      expect(controller.title).to.equal('Brief')

  describe 'toggleYes', ->
    beforeEach ->
      controller.toggleYes()
      scope.$apply()

    it 'should set "showYesNo" to false', ->
      expect(controller.showYesNo).to.equal(false)

    it 'should set "showBrief" to true', ->
      expect(controller.showBrief).to.equal(true)

    it 'should set "showElevator" to false', ->
      expect(controller.showElevator).to.equal(false)

    it 'should set "brief" state form on NavService to "briefForm"', ->
      expect(navServBriefState.form).to.equal('project brief')

  describe 'toggleNo', ->
    beforeEach ->
      controller.toggleNo()
      scope.$apply()

    it 'should set "showYesNo" to false', ->
      expect(controller.showYesNo).to.equal(false)

    it 'should set "showBrief" to false', ->
      expect(controller.showBrief).to.equal(false)

    it 'should set "showElevator" to true', ->
      expect(controller.showElevator).to.equal(true)

    it 'should set "brief" state form on NavService to "elevatorForm"', ->
      expect(navServBriefState.form).to.equal('elevator pitch')

  describe 'toggleCancel', ->
    beforeEach ->
      controller.toggleCancel()
      scope.$apply()

    it 'should set "question" to null', ->
      expect(controller.question).to.equal(null)

    it 'should set "showYesNo" to true', ->
      expect(controller.showYesNo).to.equal(true)

    it 'should set "showBrief" to false', ->
      expect(controller.showBrief).to.equal(false)

    it 'should set "showElevator" to false', ->
      expect(controller.showElevator).to.equal(false)

    it 'should set "brief" state form on NavService to "questionForm"', ->
      expect(navServBriefState.form).to.equal('question')

  describe 'submitElevator', ->
    beforeEach ->
      scope.elevatorForm =
        $valid: true
      controller.submitElevator()
      scope.$apply()
    context 'when elevatorForm is valid', ->

    it 'should call setNextState on NavService', ->
      expect(setNextStateSpy).to.have.been.called
