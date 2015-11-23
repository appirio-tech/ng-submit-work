'use strict'

srv = () ->
  service = {}

  service.projectTypes = [
    name: 'Design'
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    id: 'DESIGN'
    selected: false
  ,
    name: 'Design & Development'
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
    category: 'Login & Registration'
    id: 'EMAIL LOGIN'
    title: 'Email Login'
    description: 'Allow users to register and log in using their email address and a password. Users can also change their password or recover a forgotten one.',
    notes: null
    custom: null
    icon: '/images/help-me.svg'
    selected: false
  ,
    category: 'Login & Registration'
    id: 'SOCIAL LOGIN'
    title: 'Social Login'
    description: 'Allow users to register and log in using third-party services such as Facebook, Twitter, and Google. Please specify below the ones that you would like to use.'
    notes: null
    custom: null
    icon: '/images/security-minimal.svg'
    selected: false
  ,
    category: 'Login & Registration'
    id: 'INVITATIONS',
    title: 'Invitations',
    description: 'Allow users to invite others to use your app. This functionality is especially useful if you are building a social application or provide incentives for users to invite their friends. Invitations can be sent via email or text message. Please specify your preference below.',
    notes: null,
    custom: null,
    icon: '/images/login-reg.svg'
    selected: false
  ,
    category: 'Login & Registration'
    id: 'INTRODUCTIONS',
    title: 'Introductions',
    description: 'Present your app and inform users of core functionality using a series of introductory screens.',
    notes: null,
    custom: null,
    icon: '/images/location.svg'
    selected: false
  ,
    category: 'Login & Registration'
    id: 'ONBOARDING'
    title: 'Onboarding'
    description: 'Virtually walk your users through your application. This functionality is especially useful if you need new users to set up an account or express preferences.'
    notes: null
    custom: null
    icon: '/images/social.svg'
    selected: false
  ,
    category: 'General Building Blocks'
    id: 'SEARCH'
    title: 'Search'
    description: 'Provide the ability to search your app for specific content, such as products, members, or locations. Please specify below if you also would like autocomplete--suggesting appropriate search terms as a user starts typing.'
    notes: null
    custom: null
    icon: '/images/ecommerce.svg'
    selected: false
  ,
    category: 'General Building Blocks'
    id: 'GEOLOCATION FEATURES'
    title: 'Geolocation Features'
    description: 'Add this feature if your app has any geographic location-based functionality, such as showing store locations on a map or illustrating the progress of a delivery. Please specify your desired functionality below.'
    notes: null
    custom: null
    icon: '/images/payments.svg'
    selected: false
  ,
    category: 'General Building Blocks'
    id: 'CAMERA (AUDIO & VIDEO)'
    title: 'Camera (Audio & Video)'
    description: 'Add this feature if your app will require using the camera to capture audio or video. Please specify your desired usage below.'
    notes: null
    custom: null
    icon: '/images/notifications.svg'
    selected: false
  ,
    category: 'General Building Blocks'
    id: 'FILE UPLOAD'
    title: 'File Upload'
    description: 'Allow users to upload photos or other files from their phone. Please specify your desired usage below.'
    notes: null
    custom: null
    icon: '/images/audio.svg'
    selected: false
  ,
    category: 'General Building Blocks'
    id: 'NOTIFICATIONS'
    title: 'Notifications'
    description: 'Take advantage of mobile notifications; for example, remind users to do certain tasks or update them on new content. Please specify your desired functionality below.'
    notes: null
    custom: null
    icon: '/images/audio.svg'
    selected: false
  ,
    category: 'General Building Blocks'
    id: 'SHARING'
    title: 'Sharing'
    description: 'Allow users to share content from your app using common options, such as email, text message, or Facebook. Please specify your desired usage below.'
    notes: null
    custom: null
    icon: '/images/audio.svg'
    selected: false
  ,
    category: 'General Building Blocks'
    id: 'TAGS'
    title: 'Tags'
    description: 'Allow users to tag products, people or content; for example, in order to classify and easily retrieve notes. Please specify your desired functionality below.'
    notes: null
    custom: null
    icon: '/images/audio.svg'
    selected: false
  ,
    category: 'General Building Blocks'
    id: 'ADMIN FUNCTIONALITY'
    title: 'Admin Functionality'
    description: 'Add this feature if your app will have users that serve as administrators and require special access rights. Please specify your desired usage below.'
    notes: null
    custom: null
    icon: '/images/audio.svg'
    selected: false
  ,
    category: 'General Building Blocks'
    id: 'ACCOUNT SETTINGS'
    title: 'Account Settings'
    description: 'Allow your users to adjust settings or specify preferences, such as communication frequency. Please specify your desired functionality below.'
    notes: null
    custom: null
    icon: '/images/audio.svg'
    selected: false
  ,
    category: 'General Building Blocks'
    id: 'DASHBOARD'
    title: 'Dashboard'
    description: 'Customize your users’ home screen with personalized content or basic performance indicators, such as number of wins or progress toward a goal. Please specify your desired usage below.'
    notes: null
    custom: null
    icon: '/images/audio.svg'
    selected: false
  ,
    category: 'General Building Blocks'
    id: 'HELP'
    title: 'Help'
    description: 'Include a section dedicated to FAQ or Help content.'
    notes: null
    custom: null
    icon: '/images/audio.svg'
    selected: false
  ,
    category: 'Ecommerce'
    id: 'MARKETPLACE'
    title: 'Marketplace'
    description: 'Allow users to buy, sell, or rent products or services. Please provide details below regarding how your marketplace should work. '
    notes: null
    custom: null
    icon: '/images/audio.svg'
    selected: false
  ,
    category: 'Ecommerce'
    id: 'RATINGS & REVIEWS'
    title: 'Ratings & Reviews'
    description: 'Let users rate or review people, products, or services. Please specify your desired usage below.'
    notes: null
    custom: null
    icon: '/images/audio.svg'
    selected: false
  ,
    category: 'Ecommerce'
    id: 'PAYMENTS'
    title: 'Payments'
    description: 'Allow users to pay in some way; for example, using credit cards, PayPal, or Bitcoin. Please specify your desired functionality below.'
    notes: null
    custom: null
    icon: '/images/audio.svg'
    selected: false
  ,
    category: 'Ecommerce'
    id: 'SHOPPING CART'
    title: 'Shopping Cart'
    description: 'Allow users to save items before purchasing. Please specify your desired usage below.'
    notes: null
    custom: null
    icon: '/images/audio.svg'
    selected: false
  ,
    category: 'Ecommerce'
    id: 'PRODUCT LISTING'
    title: 'Product Listing'
    description: 'Add this feature to shows lists of product or services, with individual detail pages for each one. Please specify below your desired usage and the information you would like in a product listing.'
    notes: null
    custom: null
    icon: '/images/audio.svg'
    selected: false
  ,
    category: 'Social'
    id: 'ACTIVITY FEED'
    title: 'Activity Feed'
    description: 'Show your users an activity feed of some kind, as they’re used to seeing on Facebook and Twitter, for example. Please specify below your desired usage and the information that a user should see in the activity feed.'
    notes: null
    custom: null
    icon: '/images/audio.svg'
    selected: false
  ,
    category: 'Social'
    id: 'PROFILES'
    title: 'Profiles'
    description: 'Add this feature if your app requires users to have a profile, including the ability to edit it. Please specify below your desired usage and the information you need in the profile.'
    notes: null
    custom: null
    icon: '/images/audio.svg'
    selected: false
  ,
    category: 'Social'
    id: 'MESSAGING'
    title: 'Messaging'
    description: 'Allow direct communication between two or more users. Please specify your desired functionality below.'
    notes: null
    custom: null
    icon: '/images/audio.svg'
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