'use strict'

features = [
  name       : 'Login'
  explanation: ''
  description: 'Users can login / register for your app'
  custom     : false,
,
  name       : 'Social'
  explanation: ''
  description: 'Users can see data from social networks (FB, Twitter etc.) in your app'
  custom     : false
,
  name       : 'Profiles'
  explanation: ''
  description: 'Users can create profiles with personal info'
  custom     : false
,
  name       : 'Map'
  explanation: ''
  description: 'A map with a user\'s GPS location that helps them get to places'
  custom     : false
,
  name       : 'Forms'
  explanation: ''
  description: 'Users send specific information to you via forms '
  custom     : false
,
  name       : 'Listing'
  explanation: ''
  description: 'Display list of products, images, items that the user can browse or search through'
  custom     : false
]

service = ->
  getFeatures = ->
    angular.copy features

  getFeatures: getFeatures

service.$inject = []

angular.module('appirio-tech-ng-submit-work').factory 'FeatureService', service

