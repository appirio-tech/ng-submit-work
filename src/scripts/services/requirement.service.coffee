'use strict'

srv = ->
  service = {}

  service.projectTypes = [
    name: 'Design'
    description: 'Have an idea or requirements for an app that you would like designed? Get design mockups that are ready to be turned into code.'
    id: 'DESIGN'
    selected: false
  ,
    name: 'Design & Development'
    description: 'Have an idea, sketch, or designs for an app? Get a fully functioning app built, along with the source code.'
    id: 'DESIGN_AND_CODE'
    selected: false
  ]

  service.platforms = [
      name: 'iOS'
      id: 'IOS'
      selected: false
    ,
      name: 'Android'
      id: 'ANDROID'
      selected: false
  ]

  service.devices = [
    name: 'Watch'
    id: 'WATCH'
    selected: false
  ,
    name: 'Tablet'
    id: 'TABLET'
    selected: false
  ,
    name: 'Phone'
    id: 'PHONE'
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
    category: 'Login & Registration'
    id: 'EMAIL LOGIN'
    title: 'Email Login'
    description: 'Allow users to register and log in using their email address and a password. Users can also change their password or recover a forgotten one.',
    notes: null
    custom: null
    icon: require './../../images/help-me.svg'
    selected: false
  ,
    category: 'Login & Registration'
    id: 'SOCIAL LOGIN'
    title: 'Social Login'
    description: 'Allow users to register and log in using third-party services such as Facebook, Twitter, and Google. Please specify below the ones that you would like to use.'
    notes: null
    custom: null
    icon: require './../../images/security-minimal.svg'
    selected: false
  ,
    category: 'Login & Registration'
    id: 'INVITATIONS',
    title: 'Invitations',
    description: 'Allow users to invite others to use your app. This functionality is especially useful if you are building a social application or provide incentives for users to invite their friends. Invitations can be sent via email or text message. Please specify your preference below.',
    notes: null,
    custom: null,
    icon: require './../../images/login-reg.svg'
    selected: false
  ,
    category: 'Login & Registration'
    id: 'INTRODUCTIONS',
    title: 'Introductions',
    description: 'Present your app and inform users of core functionality using a series of introductory screens before they sign up.',
    notes: null,
    custom: null,
    icon: require './../../images/location.svg'
    selected: false
  ,
    category: 'Login & Registration'
    id: 'ONBOARDING'
    title: 'Onboarding'
    description: 'Virtually walk your users through your application. This functionality is especially useful if you need new users to set up an account or express preferences after they sign up.'
    notes: null
    custom: null
    icon: require './../../images/social.svg'
    selected: false
  ,
    category: 'General Building Blocks'
    id: 'SEARCH'
    title: 'Search'
    description: 'Provide the ability to search your app for specific content, such as products, members, or locations. Please specify below if you also would like autocomplete--suggesting appropriate search terms as a user starts typing.'
    notes: null
    custom: null
    icon: require './../../images/ecommerce.svg'
    selected: false
  ,
    category: 'General Building Blocks'
    id: 'GEOLOCATION FEATURES'
    title: 'Geolocation Features'
    description: 'Add this feature if your app has any geographic location-based functionality, such as showing store locations on a map or illustrating the progress of a delivery. Please specify your desired functionality below.'
    notes: null
    custom: null
    icon: require './../../images/payments.svg'
    selected: false
  ,
    category: 'General Building Blocks'
    id: 'CAMERA (AUDIO & VIDEO)'
    title: 'Camera (Audio & Video)'
    description: 'Add this feature if your app will require using the camera to capture audio or video. Please specify your desired usage below.'
    notes: null
    custom: null
    icon: require './../../images/notifications.svg'
    selected: false
  ,
    category: 'General Building Blocks'
    id: 'FILE UPLOAD'
    title: 'File Upload'
    description: 'Allow users to upload photos or other files from their phone. Please specify your desired usage below.'
    notes: null
    custom: null
    icon: require './../../images/audio.svg'
    selected: false
  ,
    category: 'General Building Blocks'
    id: 'NOTIFICATIONS'
    title: 'Notifications'
    description: 'Take advantage of mobile notifications; for example, remind users to do certain tasks or update them on new content. Please specify your desired functionality below.'
    notes: null
    custom: null
    icon: require './../../images/audio.svg'
    selected: false
  ,
    category: 'General Building Blocks'
    id: 'SHARING'
    title: 'Sharing'
    description: 'Allow users to share content from your app using common options, such as email, text message, or Facebook. Please specify your desired usage below.'
    notes: null
    custom: null
    icon: require './../../images/audio.svg'
    selected: false
  ,
    category: 'General Building Blocks'
    id: 'TAGS'
    title: 'Tags'
    description: 'Allow users to tag products, people or content; for example, in order to classify and easily retrieve notes. Please specify your desired functionality below.'
    notes: null
    custom: null
    icon: require './../../images/audio.svg'
    selected: false
  ,
    category: 'General Building Blocks'
    id: 'ADMIN FUNCTIONALITY'
    title: 'Admin Functionality'
    description: 'Add this feature if your app will have users that serve as administrators and require special access rights. Please specify your desired usage below.'
    notes: null
    custom: null
    icon: require './../../images/audio.svg'
    selected: false
  ,
    category: 'General Building Blocks'
    id: 'ACCOUNT SETTINGS'
    title: 'Account Settings'
    description: 'Allow your users to adjust settings or specify preferences, such as communication frequency. Please specify your desired functionality below.'
    notes: null
    custom: null
    icon: require './../../images/audio.svg'
    selected: false
  ,
    category: 'General Building Blocks'
    id: 'DASHBOARD'
    title: 'Dashboard'
    description: 'Customize your users’ home screen with personalized content or basic performance indicators, such as number of wins or progress toward a goal. Please specify your desired usage below.'
    notes: null
    custom: null
    icon: require './../../images/audio.svg'
    selected: false
  ,
    category: 'General Building Blocks'
    id: 'HELP'
    title: 'Help'
    description: 'Include a section dedicated to FAQ or Help content.'
    notes: null
    custom: null
    icon: require './../../images/audio.svg'
    selected: false
  ,
    category: 'Ecommerce'
    id: 'MARKETPLACE'
    title: 'Marketplace'
    description: 'Allow users to buy, sell, or rent products or services. Please provide details below regarding how your marketplace should work. '
    notes: null
    custom: null
    icon: require './../../images/audio.svg'
    selected: false
  ,
    category: 'Ecommerce'
    id: 'RATINGS & REVIEWS'
    title: 'Ratings & Reviews'
    description: 'Let users rate or review people, products, or services. Please specify your desired usage below.'
    notes: null
    custom: null
    icon: require './../../images/audio.svg'
    selected: false
  ,
    category: 'Ecommerce'
    id: 'PAYMENTS'
    title: 'Payments'
    description: 'Allow users to pay in some way; for example, using credit cards, PayPal, or Bitcoin. Please specify your desired functionality below.'
    notes: null
    custom: null
    icon: require './../../images/audio.svg'
    selected: false
  ,
    category: 'Ecommerce'
    id: 'SHOPPING CART'
    title: 'Shopping Cart'
    description: 'Allow users to save items before purchasing. Please specify your desired usage below.'
    notes: null
    custom: null
    icon: require './../../images/audio.svg'
    selected: false
  ,
    category: 'Ecommerce'
    id: 'PRODUCT LISTING'
    title: 'Product Listing'
    description: 'Add this feature to shows lists of product or services, with individual detail pages for each one. Please specify below your desired usage and the information you would like in a product listing.'
    notes: null
    custom: null
    icon: require './../../images/audio.svg'
    selected: false
  ,
    category: 'Social'
    id: 'ACTIVITY FEED'
    title: 'Activity Feed'
    description: 'Show your users an activity feed of some kind, as they’re used to seeing on Facebook and Twitter, for example. Please specify below your desired usage and the information that a user should see in the activity feed.'
    notes: null
    custom: null
    icon: require './../../images/audio.svg'
    selected: false
  ,
    category: 'Social'
    id: 'PROFILES'
    title: 'Profiles'
    description: 'Add this feature if your app requires users to have a profile, including the ability to edit it. Please specify below your desired usage and the information you need in the profile.'
    notes: null
    custom: null
    icon: require './../../images/audio.svg'
    selected: false
  ,
    category: 'Social'
    id: 'MESSAGING'
    title: 'Messaging'
    description: 'Allow direct communication between two or more users. Please specify your desired functionality below.'
    notes: null
    custom: null
    icon: require './../../images/audio.svg'
    selected: false
  ]

  service.fonts = [
    name: 'Serif'
    description: 'Classic design, good legibility for large and small text.'
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
    selected: false
    img: require './../../images/Blue'
  ,
    name: 'Red'
    id: 'RED'
    selected: false
    img: require './../../images/Red'
  ,
    name: 'Green'
    id: 'GREEN'
    selected: false
    img: require './../../images/Green'
  ,
    name: 'Orange'
    id: 'ORANGE'
    selected: false
    img: require './../../images/Orange'
  ,
    name: 'Black'
    id: 'BLACK'
    selected: false
    img: require './../../images/Black'
  ]

  service.icons = [
    name: 'Flat Color'
    description: 'A one dimensional, colorful icon style.'
    id: 'FLAT_COLORS'
    selected: false
    img: require './../../images/flat-colors.svg'
  ,
    name: 'Thin Line'
    description: 'A lighter weight and modern icon style.'
    id: 'THIN_LINE'
    selected: false
    img: require './../../images/thin-line.svg'
  ,
    name: 'Solid Line'
    description: 'A bold and visually powerful icon style.'
    id: 'SOLID_LINE'
    selected: false
    img: require './../../images/solid-line.svg'
  ]

  service

srv.$inject = []

angular.module('appirio-tech-ng-submit-work').factory 'RequirementService', srv