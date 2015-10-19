'use strict'

srv = () ->
  service = {}

  service.projectTypes = [
    name: 'Design'
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    id: 'DESIGN'
    selected: false
    imgUrl: 'http://www.collegequest.com/wp-content/uploads/what-do-graphic-designers-do.jpg'
  ,
    name: 'Design & Development'
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    id: 'DESIGN_AND_CODE'
    selected: false
    imgUrl: 'http://pbwebdev.com/blog/wp-content/uploads/2014/06/developer.jpg'
  ]

  service.devices = [
    name: 'iWatch'
    id: 'IWATCH'
    selected: false
  ,
    name: 'iPhone'
    id: 'IPHONE'
    selected: false
  ,
    name: 'iPad'
    id: 'IPAD'
    selected: false
  ]

  service.orientations = [
    name: 'Landscape'
    id: 'LANDSCAPE'
    selected: false
  ,
    name: 'Portrait'
    id: 'PORTRAIT'
    selected: true
  ]

  service.features = [
    id: 'LOGIN',
    title: 'Login',
    description: 'Users can login / register for your app',
    notes: null,
    custom: null,
    selected: false
  ,
    id: 'ONBOARDING',
    title: 'Onboarding',
    description: 'Users can see data from social networks (FB, Twitter etc.) in your app',
    notes: null,
    custom: null,
    selected: false
  ,
    id: 'REGISTRATION',
    title: 'Registration',
    description: 'Users can create profiles with personal info',
    notes: null,
    custom: null,
    selected: false
  ,
    id: 'LOCATION',
    title: 'Location',
    description: 'A map with a user\'s GPS location that helps them get to places',
    notes: null,
    custom: null,
    selected: false
  ]

  service.fonts = [
    name: 'Serif'
    description: 'Classic design, good legiblity for large and small text.'
    id: 'SERIF'
    selected: false
  ,
    name: 'Sans Serif'
    id: 'SANS_SERIF'
    description: 'Modern design, good for headers and body text.'
    selected: false
  ]

  service.colors = [
    name: 'Blue'
    id: 'BLUE'
    imgUrl: 'http://s3.amazonaws.com/colorcombos-images/users/1/color-schemes/color-scheme-375-main.png?v=20120505082910'
  ,
    name: 'Red'
    id: 'Red'
    imgUrl: 'http://s3.amazonaws.com/colorcombos-images/users/1/color-schemes/color-scheme-375-main.png?v=20120505082910'
  ,
    name: 'Green'
    id: 'GREEN'
    imgUrl: 'http://s3.amazonaws.com/colorcombos-images/users/1/color-schemes/color-scheme-375-main.png?v=20120505082910'
  ,
    name: 'Orange'
    id: 'Orange'
    imgUrl: 'http://s3.amazonaws.com/colorcombos-images/users/1/color-schemes/color-scheme-375-main.png?v=20120505082910'
  ]

  service.icons = [
    name: 'Flat Colors'
    description: 'Lorem ipsum dolor sit amet'
    id: 'FLAT_COLORS'
    selected: false
    img: 'flat-colors'
  ,
    name: 'Thin Line'
    description: 'Lorem ipsum dolor sit amet'
    id: 'THIN_LINE'
    selected: false
    img: 'thin-line'
  ,
    name: 'Solid Line'
    description: 'Lorem ipsum dolor sit amet'
    id: 'SOLID_LINE'
    selected: false
    img: 'solid-line'
  ]

  service

srv.$inject = []

angular.module('appirio-tech-ng-submit-work').factory 'RequirementService', srv