'use strict'

srv = () ->
  service = {}

  service.projectTypes = [
    name: 'Design'
    description: 'Do you have an idea or requirements that you would like visualized? You will receive design mockups that will illustrate your app in detail and be ready to be turned into code.'
    id: 'DESIGN'
    selected: false
  ,
    name: 'Design & Development'
    description: 'Do you have an idea, sketch, or design that you would like turned into an app that can appear in the app store? You will receive a fully functioning app, along with the source code. '
    id: 'DESIGN_AND_CODE'
    selected: false
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
    id: 'ONBOARDING'
    title: 'Onboarding'
    description: 'Virtually walk your users through your application. This functionality is especially useful if you need new users to set up an account or express preferences.',
    notes: null
    custom: null
    icon: '/images/help-me.svg'
    selected: false
  ,
    id: 'LOGIN'
    title: 'Login'
    description: 'Allow users to register and log in using their email address and a password. Users can also change their password or recover a forgotten one.'
    notes: null
    custom: null
    icon: '/images/security-minimal.svg'
    selected: false
  ,
    id: 'REGISTRATION',
    title: 'Registration',
    description: ' Allow users to register and log in using third-party services such as Facebook, Twitter, and Google. Please specify below the ones that you would like to use.',
    notes: null,
    custom: null,
    icon: '/images/login-reg.svg'
    selected: false
  ,
    id: 'LOCATION',
    title: 'Location',
    description: 'Add this feature if your app has any geographic location-based functionality, such as showing store locations on a map or illustrating the progress of a delivery. Please specify your desired functionality below.',
    notes: null,
    custom: null,
    icon: '/images/location.svg'
    selected: false
  ,
    id: 'Social'
    title: 'Social'
    description: 'Show your users an activity feed of some kind, as they’re used to seeing on Facebook and Twitter, for example. Please specify below your desired usage and the information that a user should see in the activity feed.'
    notes: null
    custom: null
    icon: '/images/social.svg'
    selected: false
  ,
    id: 'Ecommerce'
    title: 'Ecommerce'
    description: 'Allow users to buy, sell, or rent products or services. Please provide details below regarding how your marketplace should work.'
    notes: null
    custom: null
    icon: '/images/ecommerce.svg'
    selected: false
  ,
    id: 'Payments & Billing'
    title: 'Payments & Billing'
    description: 'Allow users to pay in some way; for example, using credit cards, PayPal, or Bitcoin. Please specify your desired functionality below.'
    notes: null
    custom: null
    icon: '/images/payments.svg'
    selected: false
  ,
    id: 'Notifications'
    title: 'Notifications'
    description: 'Take advantage of mobile notifications; for example, remind users to do certain tasks or update them on new content. Please specify your desired functionality below.'
    notes: null
    custom: null
    icon: '/images/notifications.svg'
    selected: false
  ,
    id: 'Audio'
    title: 'Audio'
    description: 'Add this feature if your app will require using the camera to capture audio or video. Please specify your desired usage below.'
    notes: null
    custom: null
    icon: '/images/audio.svg'
    selected: false

  ]

  service.fonts = [
    name: 'Serif'
    description: 'Classic font families that work well for stylized headlines, as well as paragraphs of text.'
    id: 'SERIF'
    selected: false
  ,
    name: 'Sans Serif'
    id: 'SANS_SERIF'
    description: 'Modern font families known for their versatility.'
    selected: false
  ]

  service.colors = [
    name: 'Blue'
    id: 'BLUE'
    imgUrl: 'http://s3.amazonaws.com/colorcombos-images/users/1/color-schemes/color-scheme-375-main.png?v=20120505082910'
    selected: false
  ,
    name: 'Red'
    id: 'RED'
    imgUrl: 'http://s3.amazonaws.com/colorcombos-images/users/1/color-schemes/color-scheme-375-main.png?v=20120505082910'
    selected: false
  ,
    name: 'Green'
    id: 'GREEN'
    imgUrl: 'http://s3.amazonaws.com/colorcombos-images/users/1/color-schemes/color-scheme-375-main.png?v=20120505082910'
    selected: false
  ,
    name: 'Orange'
    id: 'ORANGE'
    imgUrl: 'http://s3.amazonaws.com/colorcombos-images/users/1/color-schemes/color-scheme-375-main.png?v=20120505082910'
    selected: false
  ]

  service.icons = [
    name: 'Flat Color'
    description: 'A one dimensional, modern and colorful icon style.'
    id: 'FLAT_COLORS'
    selected: false
    img: 'flat-colors'
  ,
    name: 'Thin Line'
    description: 'A lighter weight and modern icon style.'
    id: 'THIN_LINE'
    selected: false
    img: 'thin-line'
  ,
    name: 'Solid Line'
    description: 'A bold and visually powerful icon style.'
    id: 'SOLID_LINE'
    selected: false
    img: 'solid-line'
  ]

  service

srv.$inject = []

angular.module('appirio-tech-ng-submit-work').factory 'RequirementService', srv