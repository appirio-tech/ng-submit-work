'use strict'

Provider              = require '../provider'
FileUploaderContainer = require('appirio-tech-file-upload').default

directive = (reactDirective) ->
  reactDirective Provider(FileUploaderContainer)

directive.$inject = ['reactDirective']

angular.module('appirio-tech-ng-submit-work').directive 'fileUploader', directive
