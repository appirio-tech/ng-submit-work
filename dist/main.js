(function() {
  'use strict';
  var dependencies;

  dependencies = ['ui.router', 'ngResource', 'app.constants', 'appirio-tech-ng-api-services', 'appirio-tech-ng-optimist', 'duScroll'];

  angular.module('appirio-tech-ng-submit-work', dependencies);

}).call(this);

angular.module("appirio-tech-ng-submit-work").run(["$templateCache", function($templateCache) {$templateCache.put("views/submit-work-type.directive.html","<header class=\"flex column center\"><h1>Let\'s Start Creating Your App</h1><p>Welcome to our step-by-step guide for gathering  your requirements. Tell us about your feature requirements and design preferences, and we’ll start creating your app.</p></header><form ng-submit=\"vm.validateAllSections()\"><div flush-height=\"lock\" class=\"flush-height flex column\"><div id=\"app-name\" class=\"dark-bg flex column center middle flex-grow\"><input type=\"text\" placeholder=\"Name your project...\" ng-change=\"vm.validateSection(\'platform-details\', \'name\', false)\" ng-keydown=\"vm.interceptSubmit($event)\" ng-model=\"vm.name\" ng-class=\"{error: vm.nameError &amp;&amp; !vm.name.length}\" autofocus=\"autofocus\"/><p ng-class=\"{ show: vm.nameError &amp;&amp; !vm.name.length }\" class=\"error transition\">Please name your project.</p></div><div class=\"continue-buttons\"><button type=\"button\" ng-click=\"vm.validateSection(\'platform-details\', \'name\', true)\">continue</button></div></div><div full-height=\"full-height\" class=\"full-height flex column\"><div id=\"platform-details\" class=\"dark-bg flex column center flex-grow\"><h2>iOS <strong>platform details</strong></h2><ul class=\"target-platforms\"><li><h5>Choose the <strong>devices</strong> on which you’d like your app to run </h5><ul><li ng-repeat=\"device in vm.devices\"><checkbox label=\"{{device.name}}\" ng-model=\"device.selected\" ng-click=\"vm.validateSection(\'type-details\', [\'devices\'])\"></checkbox></li></ul></li><li ng-class=\"{invisible: !vm.showOrientation()}\"><h5>What <strong>screen</strong> orientations would you like to support?</h5><ul><li ng-repeat=\"orientation in vm.orientations\"><checkbox label=\"{{orientation.name}}\" ng-model=\"orientation.selected\" ng-click=\"vm.validateSection(\'type-details\', [\'orientations\'])\"></checkbox></li></ul></li></ul><p ng-class=\"{ show: vm.devicesError }\" class=\"error transition\">Please choose a device.</p><p ng-class=\"{ show: vm.orientationsError }\" class=\"error transition\">Please choose an orientation.</p></div><div class=\"continue-buttons\"><button type=\"button\" ng-click=\"vm.validateSection(\'type-details\', [\'devices\', \'orientations\'], true)\">continue</button></div></div><div full-height=\"full-height\" class=\"full-height flex column\"><div id=\"type-details\" class=\"type dark-bg flex column center flex-grow\"><h2>What <strong>type of work</strong> are you looking for?</h2><ul class=\"type flex center\"><li ng-repeat=\"projectType in vm.projectTypes\"><div ng-class=\"{ selected: vm.projectType == projectType.id }\" ng-if=\"projectType.id == \'DESIGN\'\" class=\"house flex column center middle\"><img src=\"/images/design-thin.svg\" class=\"inactive\"/><img src=\"/images/design-white-thin.svg\" class=\"active\"/></div><div ng-class=\"{ selected: vm.projectType == projectType.id }\" ng-if=\"projectType.id == \'DESIGN_AND_CODE\'\" class=\"house flex column center middle\"><img src=\"/images/design-development.svg\" class=\"inactive\"/><img src=\"/images/design-development-active.svg\" class=\"active\"/></div><h4>{{projectType.name}}</h4><p>{{ projectType.description }}</p><button type=\"button\" selectable=\"true\" ng-model=\"vm.projectType\" ng-click=\"vm.validateSection(\'brief-details\', \'projectType\')\" value=\"projectType.id\" class=\"action\"></button></li></ul><p ng-class=\"{ show: vm.projectTypeError }\" class=\"error transition\">Please choose a type of work.</p></div><div class=\"continue-buttons\"><button type=\"button\" ng-click=\"vm.validateSection(\'brief-details\', \'projectType\', true)\">continue</button></div></div><div full-height=\"full-height\" class=\"full-height flex column has-loader\"><loader ng-if=\"vm.loading\"></loader><div id=\"brief-details\" class=\"dark-bg flex column center flex-grow\"><h2><strong>share a brief</strong> overview</h2><textarea placeholder=\"You can include a short pitch for your app or just quickly describe how it will be used and by whom. Don\'t worry, you will get a chance to add more details later in the process.\" ng-model=\"vm.brief\" ng-change=\"vm.validateSection(\'brief-details\', \'brief\')\" class=\"brief\"></textarea><p ng-class=\"{ show: vm.briefError }\" class=\"error transition\">Please enter project details.</p><div class=\"continue-buttons\"><button type=\"submit\" class=\"action\">Create Project</button></div></div></div></form><modal show=\"vm.showSuccessModal\" background-click-close=\"background-click-close\"><div class=\"success\"><h2>Awesome!</h2><p>Your {{ vm.name }} is set up now</p><p>Share your email to signup and we\'ll be sure to send a project link.</p><form><input type=\"email\" required=\"required\"/><button type=\"submit\">Submit</button></form></div></modal>");
$templateCache.put("views/submit-work-features.directive.html","<header><ul class=\"navs flex center\"><li ng-class=\"{ active: vm.section == 1 }\"><a ui-sref=\"submit-work-features({ id: vm.workId })\">Features</a></li><li ng-class=\"{ active: vm.section == 2 }\"><a ui-sref=\"submit-work-visuals({ id: vm.workId })\">Visual Design</a></li><li ng-if=\"vm.projectType == \'DESIGN_AND_CODE\'\" ng-class=\"{ active: vm.section == 3 }\"><a ui-sref=\"submit-work-development({ id: vm.workId })\">Development</a></li></ul><progress value=\"{{ vm.section }}\" max=\"{{ vm.numberOfSections }}\"></progress><img src=\"/images/features-white.svg\"/><h1>Feature Requirements</h1><p>Tell us the features that you would like in your app</p></header><div flush-height=\"lock\" class=\"flush-height flex column\"><ul class=\"dark-bg flex center middle flex-grow selectable-choices\"><li><img ng-if=\"!vm.featuresDefined\" src=\"/images/define-feature.svg\" class=\"icon biggest\"/><img ng-if=\"vm.featuresDefined\" src=\"/images/define-feature-selected.svg\" class=\"icon biggest\"/><h4>Define features</h4><p>Use our wizard to pick common features or add your own.</p><button ng-click=\"vm.showFeatures()\" class=\"action\">select</button></li><li><img ng-if=\"!vm.uploaderHasFiles || vm.uploaderHasErrors || vm.uploaderUploading\" src=\"/images/upload.svg\" class=\"icon biggest\"/><img ng-if=\"vm.uploaderHasFiles &amp;&amp; !vm.uploaderHasErrors &amp;&amp; !vm.uploaderUploading\" src=\"/images/upload-selected.svg\" class=\"icon biggest\"/><h4>Upload Requirements</h4><p>Upload a brief, requirements, specs, or feature list.</p><button ng-click=\"vm.showUpload()\" class=\"action\">select</button></li></ul><div class=\"continue-buttons\"><a ui-sref=\"submit-work-visuals({ id: vm.workId })\" class=\"button\">go to design</a></div></div><modal show=\"vm.showFeaturesModal\" ng-if=\"vm.showFeaturesModal\" background-click-close=\"background-click-close\" class=\"full define-features\"><h2><strong>features</strong></h2><main class=\"flex flex-grow stretch\"><ul class=\"features flex column\"><li lock-height=\"lock-height\" ignore-content=\"true\" class=\"flex-grow\"><ul class=\"feature-categories-list\"><li ng-repeat=\"featureCategory in vm.categoriesList\" ng-if=\"vm.filterByCategory(vm.features, featureCategory.category).length &gt; 0\"><feature-list icon=\"{{featureCategory.icon}}\" active-feature=\"vm.activeFeature\" header-text=\"{{featureCategory.category}}\" features=\"vm.features\" activate-feature=\"vm.activateFeature(feature)\"></feature-list></li></ul></li><li><button ng-click=\"vm.toggleDefineFeatures()\" class=\"clean\"><span>Define a new feature</span><div class=\"icon\">+</div></button></li></ul><ul class=\"contents flex column flex-grow\"><li class=\"flex flex-grow\"><div ng-hide=\"vm.showDefineFeaturesForm\" ng-if=\"!vm.activeFeature\" ng-class=\"{active: !vm.activeFeature}\" class=\"default active\"><h5>Select and define features for your app</h5><p>Select from the most popular features, listed on the left, or define your own custom features.</p></div><div ng-hide=\"vm.showDefineFeaturesForm\" ng-if=\"vm.activeFeature\" ng-class=\"{active: vm.activeFeature}\" class=\"description\"><h5>{{ vm.activeFeature.title }}</h5><p>{{vm.activeFeature.description}}</p><textarea placeholder=\"Notes...\" ng-model=\"vm.activeFeature.notes\"></textarea><button ng-if=\"!vm.activeFeature.selected\" ng-click=\"vm.applyFeature()\" class=\"action\">Add this feature</button><button ng-if=\"vm.activeFeature.selected\" ng-click=\"vm.removeFeature()\" class=\"action\">remove feature</button><button ng-if=\"vm.activeFeatureChangedNotes(vm.activeFeature)\" ng-click=\"vm.saveNotes()\" class=\"action\">save notes</button></div><form ng-submit=\"vm.addCustomFeature()\" ng-class=\"{active: vm.showDefineFeaturesForm}\" class=\"new-feature\"><h5>Define a new feature</h5><label>Feature name</label><input type=\"text\" ng-model=\"vm.customFeature.title\" ng-change=\"vm.customNameUnique()\" required=\"required\"/><p ng-if=\"vm.featureTitleError\" class=\"error\">This feature name already exists, please try another.</p><label>Feature description</label><textarea ng-model=\"vm.customFeature.description\" required=\"required\" placeholder=\"Briefly describe the feature, including how it will be used, and provide examples that will help designers and developers understand it.\"></textarea><button type=\"submit\" class=\"action\">add</button><button type=\"button\" ng-click=\"vm.hideCustomFeatures()\" class=\"cancel\">Cancel</button></form><div class=\"example flex-grow\"><img ng-if=\"vm.activeFeature &amp;&amp; !vm.activeFeature.custom\" src=\"/images/{{ vm.activePreview }}.png\"/><img ng-if=\"vm.activeFeature &amp;&amp; vm.activeFeature.custom\" src=\"/images/Custom-feature.png\"/><img ng-if=\"!vm.activeFeature &amp;&amp; vm.addingCustomFeature\" src=\"/images/Custom-feature.png\"/><img ng-if=\"!vm.activeFeature &amp;&amp; !vm.addingCustomFeature\" src=\"/images/Default-preview.png\"/></div></li><li class=\"flex middle space-between\"><div class=\"count\">{{vm.selectedFeaturesCount}} features added</div><button ng-click=\"vm.save()\" class=\"action\">Save</button></li></ul></main></modal><modal show=\"vm.showUploadModal\" background-click-close=\"background-click-close\" class=\"upload-documents\"><main><img src=\"/images/upload.svg\" class=\"upload-icon\"/><h2>Upload <strong>Requirements</strong></h2><p>Upload a brief, requirements, specs, or feature list.</p><ap-uploader config=\"vm.uploaderConfig\" uploading=\"vm.uploaderUploading\" has-errors=\"vm.uploaderHasErrors\" has-files=\"vm.uploaderHasFiles\"></ap-uploader></main></modal>");
$templateCache.put("views/submit-work-visuals.directive.html","<loader ng-if=\"vm.loading\"></loader><header><ul class=\"navs flex center\"><li ng-class=\"{ active: vm.section == 1 }\"><a ui-sref=\"submit-work-features({ id: vm.workId })\">Features</a></li><li ng-class=\"{ active: vm.section == 2 }\"><a ui-sref=\"submit-work-visuals({ id: vm.workId })\">Visual Design</a></li><li ng-if=\"vm.projectType == \'DESIGN_AND_CODE\'\" ng-class=\"{ active: vm.section == 3 }\"><a ui-sref=\"submit-work-development({ id: vm.workId })\">Development</a></li></ul><progress value=\"{{ vm.section }}\" max=\"{{ vm.numberOfSections }}\"></progress><img src=\"/images/design-white-thin.svg\"/><h1>Let\'s design your app!</h1><p>Help define the visual style for your app</p></header><div flush-height=\"lock\" class=\"flush-height flex column\"><ul ng-class=\"{active: vm.showPaths}\" class=\"dark-bg flex center flex-grow middle selectable-choices\"><li><img ng-if=\"!vm.specsDefined\" src=\"/images/brand-reqs.svg\" class=\"icon big biggest\"/><img ng-if=\"vm.specsDefined\" src=\"/images/brand-reqs-selected.svg\" class=\"icon big biggest\"/><h4>define my designs</h4><p>Choose fonts, colors, and icons.</p><button ng-click=\"vm.showChooseStyles()\" class=\"action\">select</button></li><li><img src=\"/images/upload.svg\" class=\"icon big biggest\"/><h4>use brand guidelines</h4><p>Link to your brand style guide or upload any design guidelines.</p><button ng-click=\"vm.scrollTo(\'secondary\')\" class=\"action\">select</button></li></ul><div class=\"continue-buttons\"><a ng-if=\"vm.projectType == \'DESIGN_AND_CODE\'\" ui-sref=\"submit-work-development({ id: vm.workId })\" class=\"button\">go to development</a><button ng-if=\"vm.projectType != \'DESIGN_AND_CODE\'\" ng-click=\"vm.save(true, false)\" class=\"save\">save</button><button ng-if=\"vm.projectType != \'DESIGN_AND_CODE\'\" ng-click=\"vm.save(true, true)\" class=\"kick-off action\">kick off project</button></div></div><div id=\"secondary\" full-height=\"lock\" class=\"flush-height flex column\"><ul ng-class=\"{active: vm.showPaths}\" class=\"dark-bg flex center flex-grow middle selectable-choices\"><li><img ng-if=\"!vm.uploaderHasFiles || vm.uploaderHasErrors || vm.uploaderUploading\" src=\"/images/upload.svg\" class=\"icon big biggest\"/><img ng-if=\"vm.uploaderHasFiles &amp;&amp; !vm.uploaderHasErrors &amp;&amp; !vm.uploaderUploading\" src=\"/images/upload-selected.svg\" class=\"icon big biggest\"/><h4>upload brand guidelines</h4><p>Upload any guidelines, style guides, or prior designs.</p><button ng-click=\"vm.showUploadStyles()\" class=\"action\">select</button></li><li><img ng-if=\"!vm.urlAdded || urlForm.addressInput.$error.pattern\" src=\"/images/url-styles.svg\" class=\"icon big biggest\"/><img ng-if=\"vm.urlAdded &amp;&amp; !urlForm.addressInput.$error.pattern\" src=\"/images/url-styles-selected.svg\" class=\"icon big biggest\"/><h4>Get style from url</h4><p>Link to your brand website.</p><button ng-click=\"vm.showUrlStyles()\" class=\"action\">select</button></li></ul><div class=\"continue-buttons\"><a ng-if=\"vm.projectType == \'DESIGN_AND_CODE\'\" ui-sref=\"submit-work-development({ id: vm.workId })\" class=\"button\">go to development</a><button ng-if=\"vm.projectType != \'DESIGN_AND_CODE\'\" ng-click=\"vm.save(true, false)\" class=\"save\">save</button><button ng-if=\"vm.projectType != \'DESIGN_AND_CODE\'\" ng-click=\"vm.save(true, true)\" class=\"kick-off action\">kick off project</button></div></div><modal show=\"vm.showUploadStylesModal\" background-click-close=\"background-click-close\" class=\"upload-documents\"><main><img src=\"/images/upload.svg\" class=\"upload-icon\"/><h2>Upload brand guidelines</h2><p>Upload any guidelines, style guides, or prior designs.</p><ap-uploader config=\"vm.uploaderConfig\" uploading=\"vm.uploaderUploading\" has-errors=\"vm.uploaderHasErrors\" has-files=\"vm.uploaderHasFiles\"></ap-uploader></main></modal><modal show=\"vm.showUrlStylesModal\" background-click-close=\"background-click-close\" class=\"enter-url\"><main><img src=\"/images/url-styles.svg\"/><h2>Enter your brand URL</h2><p>Enter the URL where we can see your company’s design style or brand guidelines.</p><form ng-submit=\"vm.save()\" name=\"urlForm\"><input type=\"text\" name=\"addressInput\" ng-pattern=\"vm.urlRegEx\" ng-change=\"vm.checkAddressValidity()\" placeholder=\"http://www.example.com\" ng-model=\"vm.url\" required=\"required\"/><p ng-class=\"{show: urlForm.addressInput.$error.pattern }\" class=\"error transition\">Please enter a valid address.</p><button type=\"submit\" class=\"action\">save</button></form></main></modal><modal show=\"vm.showChooseStylesModal\" background-click-close=\"background-click-close\" class=\"full choose-styles\"><ul class=\"nav\"><li><button ng-click=\"vm.viewPrevious()\" class=\"clean\"><div class=\"icon arrow smallest\"></div></button></li><li><button ng-click=\"vm.activateModal(\'fonts\')\" ng-class=\"{active: vm.activeStyleModal == \'fonts\'}\" class=\"clean\">fonts</button></li><li><button ng-click=\"vm.activateModal(\'colors\')\" ng-class=\"{active: vm.activeStyleModal == \'colors\'}\" class=\"clean\">colors</button></li><li><button ng-click=\"vm.activateModal(\'icons\')\" ng-class=\"{active: vm.activeStyleModal == \'icons\'}\" class=\"clean\">icons</button></li><li><button ng-click=\"vm.viewNext()\" class=\"clean\"><div class=\"icon arrow smallest right\"></div></button></li></ul><main ng-show=\"vm.activeStyleModal == \'fonts\' \" class=\"dark-bg fonts flex column center flex-grow\"><h2>Pick the <strong>font style</strong> that you prefer</h2><p>Our community will offer choices within these broad font styles. Feel free to skip this step if you don\'t have a preference.</p><ul class=\"or-choices flex middle center\"><li class=\"serif\"><img src=\"/images/serif-header.svg\" class=\"header\"/><p>Classic design, good legibility for large and small text.</p><hr/><img src=\"/images/serif.png\"/><button selectable=\"selectable\" type=\"button\" ng-model=\"vm.font\" value=\"vm.serif\" class=\"action\"></button></li><li ng-repeat-end=\"ng-repeat-end\" ng-if=\"font.name == \'Serif\' \" class=\"or\"><div class=\"house\">OR</div></li><li class=\"sans-serif\"><img src=\"/images/sans-serif-header.svg\" class=\"header\"/><p>Classic design, good legibility for large and small text.</p><hr/><img src=\"/images/sans.png\"/><button selectable=\"selectable\" type=\"button\" ng-model=\"vm.font\" value=\"vm.sansSerif\" class=\"action\"></button></li></ul></main><main ng-show=\"vm.activeStyleModal == \'colors\' \" class=\"dark-bg colors flex column center flex-grow\"><h2>Pick <strong>the colors</strong> that you prefer</h2><p>Our community will use these choices to pick the appropriate shade. Feel free to skip this step if you don’t have a preference.</p><ul class=\"flex center\"><li ng-repeat=\"color in vm.colors\"><h6>{{ color.name }}</h6><img src=\"/images/{{ color.name.toLowerCase() }}.png\"/><button type=\"button\" selectable=\"selectable\" ng-model=\"color.selected\" class=\"action\"></button></li></ul></main><main ng-show=\"vm.activeStyleModal == \'icons\' \" class=\"dark-bg icons flex column center flex-grow\"><h2>Pick the <strong>icon styles</strong> that you prefer</h2><p>Feel free to skip this step if you don\'t have a preference.</p><ul class=\"flex center\"><li ng-repeat=\"icon in vm.icons\"><img src=\"/images/{{icon.img}}.svg\"/><h6>{{icon.name}}</h6><p>{{icon.description}}</p><button type=\"button\" selectable=\"selectable\" ng-model=\"vm.icon\" value=\"icon.id\" class=\"action\"></button></li></ul></main><footer><button ng-hide=\"vm.backButtonDisabled\" ng-click=\"vm.viewPrevious()\">back</button><button ng-hide=\"vm.nextButtonDisabled\" ng-click=\"vm.viewNext()\" class=\"action action\">next</button><button ng-show=\"vm.showFinishDesignButton\" ng-click=\"vm.save()\" class=\"action\">Save</button></footer></modal>");
$templateCache.put("views/submit-work-development.directive.html","<header><ul class=\"navs flex center\"><li ng-class=\"{ active: vm.section == 1 }\"><a ui-sref=\"submit-work-features({ id: vm.workId })\">Features</a></li><li ng-class=\"{ active: vm.section == 2 }\"><a ui-sref=\"submit-work-visuals({ id: vm.workId })\">Visual Design</a></li><li ng-if=\"vm.projectType == \'DESIGN_AND_CODE\'\" ng-class=\"{ active: vm.section == 3 }\"><a ui-sref=\"submit-work-development({ id: vm.workId })\">Development</a></li></ul><progress value=\"{{ vm.section }}\" max=\"{{ vm.numberOfSections }}\"></progress><img src=\"/images/development-active.svg\"/><h1>Let\'s build your app!</h1><p>Help define the technical requirements for your app</p></header><div flush-height=\"lock\" class=\"flush-height flex column\"><ul class=\"dark-bg flex center middle flex-grow selectable-choices\"><li><img ng-if=\"!vm.specsDefined\" src=\"/images/define-dev-specs.svg\" class=\"icon biggest\"/><img ng-if=\"vm.specsDefined\" src=\"/images/define-dev-specs-selected.svg\" class=\"icon biggest\"/><h4>Define Requirements</h4><p>Answer questions to help us estimate cost and time.</p><button type=\"button\" ng-click=\"vm.showDefineSpecs()\" class=\"action\">select</button></li><li><img ng-if=\"!vm.uploaderHasFiles || vm.uploaderHasErrors || vm.uploaderUploading\" src=\"/images/upload.svg\" class=\"icon biggest\"/><img ng-if=\"vm.uploaderHasFiles &amp;&amp; !vm.uploaderHasErrors &amp;&amp; !vm.uploaderUploading\" src=\"/images/upload-selected.svg\" class=\"icon biggest\"/><h4>Upload Requirements</h4><p>Please upload any technical requirements.</p><button ng-click=\"vm.uploadSpecs()\" class=\"action\">select</button></li></ul><div class=\"continue-buttons\"><button ng-click=\"vm.save(true, false)\" class=\"save\">save</button><button ng-click=\"vm.save(true, true)\" class=\"kick-off action\">kick off project</button></div></div><modal show=\"vm.showDefineSpecsModal\" background-click-close=\"background-click-close\" class=\"full define-development\"><ul class=\"nav\"><li><button ng-click=\"vm.viewPrevious()\" class=\"clean\"><div class=\"icon arrow smallest\"></div></button></li><li><button ng-click=\"vm.activateModal(\'offlineAccess\')\" ng-class=\"{active: vm.activeDevelopmentModal == \'offlineAccess\'}\" class=\"clean\">offline access</button></li><li><button ng-click=\"vm.activateModal(\'personalInformation\')\" ng-class=\"{active: vm.activeDevelopmentModal == \'personalInformation\'}\" class=\"clean\">personal information</button></li><li><button ng-click=\"vm.activateModal(\'security\')\" ng-class=\"{active: vm.activeDevelopmentModal == \'security\'}\" class=\"clean\">security level</button></li><li><button ng-click=\"vm.activateModal(\'thirdPartyIntegrations\')\" ng-class=\"{active: vm.activeDevelopmentModal == \'thirdPartyIntegrations\'}\" class=\"clean\">third party integrations</button></li><li><button ng-click=\"vm.viewNext()\" class=\"clean\"><div class=\"icon arrow smallest right\"></div></button></li></ul><main ng-show=\"vm.activeDevelopmentModal == \'offlineAccess\'\" class=\"dark-bg flex column center flex-grow\"><h2>Does your application need offline access? </h2><p>Do your users need to be able to interact with the application when they are unable to connect to the internet (over the air or via wifi)?</p><ul class=\"or-choices flex center\"><li><button ng-model=\"vm.work.offlineAccess\" label=\"yes\" value=\"true\" selectable=\"action\" type=\"button\" class=\"big\"></button><p>Users will need to use the app even when they’re offline. This feature increases complexity and cost.</p></li><li class=\"or\"><div class=\"house\">OR</div></li><li><button ng-model=\"vm.work.offlineAccess\" label=\"no\" value=\"false\" selectable=\"action\" type=\"button\" class=\"big\"></button><p>The application will gracefully present a message to users to please connect to the internet.</p></li></ul></main><main ng-show=\"vm.activeDevelopmentModal == \'personalInformation\'\" class=\"dark-bg flex column center flex-grow\"><h2>Personal information</h2><p>Is there any personal user information that is stored or transmitted?</p><ul class=\"or-choices flex center\"><li><button ng-model=\"vm.work.usesPersonalInformation\" label=\"yes\" value=\"true\" selectable=\"action\" type=\"button\" class=\"big\"></button><p>Storing or transmitting personal information requires security and encryption, adding complexity and cost.</p></li><li class=\"or\"><div class=\"house\">OR</div></li><li><button ng-model=\"vm.work.usesPersonalInformation\" label=\"no\" value=\"false\" selectable=\"action\" type=\"button\" class=\"big\"></button><p>The app is not transferring or storing personal information.</p></li></ul></main><main ng-show=\"vm.activeDevelopmentModal == \'security\'\" class=\"dark-bg security flex column center flex-grow\"><h2>What level of security do you need?</h2><ul class=\"selectable-choices flex center\"><li><img src=\"/images/security-none.svg\"/><h6>Standard</h6><p>Standard measures, including https, that are sufficient for the majority of the apps.</p><button selectable=\"selectable\" type=\"button\" ng-model=\"vm.work.securityLevel\" value=\"vm.securityLevels.none\" class=\"action\"></button></li><li><img src=\"/images/security-minimal.svg\"/><h6>Enhanced</h6><p>Includes encrypting data stored on devices and other precautions needed when viewing sensitive data in an app.</p><button selectable=\"selectable\" type=\"button\" ng-model=\"vm.work.securityLevel\" value=\"vm.securityLevels.minimal\" class=\"action\"></button></li><li><img src=\"/images/security-complete.svg\"/><h6>Maximum security</h6><p>Includes custom certificates for all service calls and other measures needed for highly-secure apps.</p><button selectable=\"selectable\" type=\"button\" ng-model=\"vm.work.securityLevel\" value=\"vm.securityLevels.complete\" class=\"action\"></button></li></ul></main><main ng-show=\"vm.activeDevelopmentModal == \'thirdPartyIntegrations\'\" class=\"dark-bg third-party-integrations flex column center flex-grow\"><h2>How many 3rd party integrations</strong>?</h2><p>Enter the number of required 3rd party integrations. Examples include: Facebook, Twitter, Yelp, Google Maps, and Docusign.</p><input type=\"number\" min=\"1\" max=\"6\" ng-model=\"vm.work.numberOfApiIntegrations\"/></main><footer><button ng-hide=\"vm.backButtonDisabled\" ng-click=\"vm.viewPrevious()\">back</button><button ng-hide=\"vm.nextButtonDisabled\" ng-click=\"vm.viewNext()\" class=\"action action\">next</button><button ng-show=\"vm.showFinishDevelopmentButton\" ng-click=\"vm.save()\" class=\"action\">Save</button></footer></modal><modal show=\"vm.showUploadSpecs\" background-click-close=\"background-click-close\" class=\"upload-documents\"><main><img src=\"/images/upload.svg\" class=\"upload-icon\"/><h2>Upload documents</h2><ap-uploader config=\"vm.uploaderConfig\" uploading=\"vm.uploaderUploading\" has-errors=\"vm.uploaderHasErrors\" has-files=\"vm.uploaderHasFiles\"></ap-uploader></main></modal>");
$templateCache.put("views/submit-work-complete.directive.html","<modal show=\"vm.show\" class=\"full\"><main class=\"flex column middle center flex-grow\"><div class=\"icon-house\"><div class=\"icon biggest checkmark-white\"></div></div><h1>Project submitted!</h1><p>Your project has been submitted for review. A copilot from our community will look over your requirements and be in touch shortly with updates or questions. Please keep an eye out for an email.</p><button ui-sref=\"view-work-multiple\" ng-click=\"vm.show = false\" class=\"action\">Go to your dashboard</button></main></modal>");
$templateCache.put("views/feature-list.directive.html","<header class=\"flex middle\"><img ng-src=\"{{ icon }}\"/><h6>{{ headerText }}</h6></header><ul><li ng-repeat=\"feature in vm.features\" ng-if=\"feature.category == vm.headerText\" ng-class=\"{ active: feature.title == vm.activeFeature.title }\"><button ng-click=\"vm.activateFeature({feature: feature})\" class=\"clean\"><div class=\"flex\"><img src=\"/images/icon-check-solid.svg\" ng-class=\"{ invisible: !feature.selected }\"/><p>{{ feature.title }}</p></div></button></li></ul>");}]);
(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submit-work-type.directive.html',
      controller: 'SubmitWorkTypeController as vm',
      scope: {
        workId: '@workId'
      }
    };
  };

  angular.module('appirio-tech-ng-submit-work').directive('submitWorkType', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submit-work-features.directive.html',
      controller: 'SubmitWorkFeaturesController as vm',
      scope: {
        workId: '@workId'
      }
    };
  };

  angular.module('appirio-tech-ng-submit-work').directive('submitWorkFeatures', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submit-work-visuals.directive.html',
      controller: 'SubmitWorkVisualController as vm',
      scope: {
        workId: '@workId'
      }
    };
  };

  angular.module('appirio-tech-ng-submit-work').directive('submitWorkVisuals', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submit-work-development.directive.html',
      controller: 'SubmitWorkDevelopmentController as vm',
      scope: {
        workId: '@workId'
      }
    };
  };

  angular.module('appirio-tech-ng-submit-work').directive('submitWorkDevelopment', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/submit-work-complete.directive.html',
      controller: 'SubmitWorkCompleteController as vm',
      scope: {
        workId: '@workId'
      }
    };
  };

  angular.module('appirio-tech-ng-submit-work').directive('submitWorkComplete', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/feature-list.directive.html',
      controller: 'FeaturelistController as vm',
      scope: {
        activateFeature: '&',
        activeFeature: '=',
        headerText: '@',
        icon: '@',
        features: '='
      }
    };
  };

  angular.module('appirio-tech-ng-submit-work').directive('featureList', directive);

}).call(this);

(function() {
  'use strict';
  var SubmitWorkTypeController;

  SubmitWorkTypeController = function($scope, $rootScope, $state, $document, SubmitWorkService, RequirementService) {
    var getUpdates, isValid, localStorageKey, recent, vm;
    vm = this;
    vm.loading = false;
    vm.showSuccessModal = false;
    vm.nameError = false;
    vm.devicesError = false;
    vm.orientationError = false;
    vm.projectTypeError = false;
    vm.briefError = false;
    if ($scope.workId) {
      localStorageKey = "recentSubmitWorkSection-" + $scope.workId;
      recent = localStorage[localStorageKey] || 'features';
      $state.go("submit-work-" + recent, {
        id: $scope.workId
      });
    }
    vm.name = '';
    vm.devices = angular.copy(RequirementService.devices);
    vm.orientations = angular.copy(RequirementService.orientations);
    vm.projectTypes = angular.copy(RequirementService.projectTypes);
    vm.brief = '';
    vm.showOrientation = function() {
      var ref, selected, selectedName, showOrientation;
      showOrientation = true;
      selected = vm.devices.filter(function(device) {
        return device.selected;
      });
      selectedName = (ref = selected[0]) != null ? ref.name : void 0;
      if (selected.length === 0 || (selected.length === 1 && selectedName === 'iWatch')) {
        showOrientation = false;
      }
      return showOrientation;
    };
    vm.interceptSubmit = function(event) {
      var scrollElement;
      if (event.keyCode === 13 || event.which === 13) {
        event.preventDefault();
        event.stopPropagation();
        if (vm.name.length > 0) {
          scrollElement = angular.element(document.getElementById('platform-details'));
          return $document.scrollToElementAnimated(scrollElement);
        } else {
          return vm.validateSection('platform-details', 'name', true);
        }
      }
    };
    vm.validateSection = function(nextId, models, scrollActivated) {
      var foundErrors, foundModelErrors, model, modelError, nextSection, ref;
      nextSection = angular.element(document.getElementById(nextId));
      foundErrors = false;
      if (Array.isArray(models)) {
        foundModelErrors = false;
        models.forEach(function(model) {
          var modelError, selected;
          modelError = model + "Error";
          selected = vm[model].filter(function(individualModel) {
            return individualModel.selected;
          });
          if (selected.length === 0) {
            vm[modelError] = true;
            return foundModelErrors = true;
          } else {
            return vm[modelError] = false;
          }
        });
        if (foundModelErrors) {
          foundErrors = true;
        } else {
          foundErrors = false;
        }
      } else {
        model = models;
        modelError = model + "Error";
        if ((ref = vm[model]) != null ? ref.length : void 0) {
          vm[modelError] = false;
          foundErrors = false;
        } else {
          vm[modelError] = true;
          foundErrors = true;
        }
      }
      if (scrollActivated) {
        if (!foundErrors) {
          return $document.scrollToElementAnimated(nextSection);
        }
      }
    };
    vm.validateAllSections = function() {
      var errorElement, foundErrors;
      vm.validateSection('platform-details', 'name');
      vm.validateSection('type-details', ['devices', 'orientations']);
      vm.validateSection('brief-details', 'projectType');
      vm.validateSection('brief-details', 'brief');
      foundErrors = false;
      errorElement = null;
      if (vm.briefError) {
        foundErrors = true;
        errorElement = angular.element(document.getElementById('brief-details'));
        $document.scrollToElementAnimated(errorElement);
      }
      if (vm.projectTypeError) {
        foundErrors = true;
        errorElement = angular.element(document.getElementById('type-details'));
        $document.scrollToElementAnimated(errorElement);
      }
      if (vm.devicesError || vm.orientationError) {
        foundErrors = true;
        errorElement = angular.element(document.getElementById('platform-details'));
        $document.scrollToElementAnimated(errorElement);
      }
      if (vm.nameError) {
        foundErrors = true;
        errorElement = angular.element(document.getElementById('app-name'));
        $document.scrollTopAnimated(0);
      }
      if (!foundErrors) {
        return vm.create();
      }
    };
    vm.create = function() {
      var promise, updates;
      updates = getUpdates();
      updates.status = 'INCOMPLETE';
      if (isValid(updates)) {
        vm.loading = true;
        promise = SubmitWorkService.create(updates);
        return promise.then(function() {
          var work;
          work = SubmitWorkService.get();
          return $state.go('submit-work-features', {
            id: work.id
          });
        });
      }
    };
    isValid = function(updates) {
      var valid;
      valid = true;
      if (!(updates.projectType === 'DESIGN' || updates.projectType === 'DESIGN_AND_CODE')) {
        valid = false;
      }
      if (!(updates.name.length > 0)) {
        valid = false;
      }
      if (!(updates.brief.length > 0)) {
        valid = false;
      }
      if (!(updates.deviceIds.length > 0)) {
        valid = false;
      }
      if (!(updates.orientationIds.length > 0)) {
        valid = false;
      }
      return valid;
    };
    getUpdates = function() {
      var getId, isSelected, updates;
      isSelected = function(item) {
        return item.selected;
      };
      getId = function(item) {
        return item.id;
      };
      return updates = {
        projectType: vm.projectType.trim(),
        name: vm.name.trim(),
        brief: vm.brief.trim(),
        deviceIds: vm.devices.filter(isSelected).map(getId),
        orientationIds: vm.orientations.filter(isSelected).map(getId)
      };
    };
    return vm;
  };

  SubmitWorkTypeController.$inject = ['$scope', '$rootScope', '$state', '$document', 'SubmitWorkService', 'RequirementService'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkTypeController', SubmitWorkTypeController);

}).call(this);

(function() {
  'use strict';
  var SubmitWorkVisualController;

  SubmitWorkVisualController = function($scope, $rootScope, $state, $document, SubmitWorkService, SubmitWorkUploaderService, RequirementService) {
    var activate, configureUploader, getUpdates, isSelected, localStorageKey, onChange, transformToUrl, updateButtons, vm;
    if ($scope.workId) {
      localStorageKey = "recentSubmitWorkSection-" + $scope.workId;
      localStorage[localStorageKey] = 'visuals';
    }
    vm = this;
    vm.workId = $scope.workId;
    vm.loading = true;
    vm.uploaderUploading = null;
    vm.uploaderHasErrors = null;
    vm.uploaderHasFiles = null;
    vm.showPaths = true;
    vm.showChooseStylesModal = false;
    vm.showUploadStylesModal = false;
    vm.showUrlStylesModal = false;
    vm.activeStyleModal = null;
    vm.nextButtonDisabled = false;
    vm.backButtonDisabled = false;
    vm.specsDefined = false;
    vm.urlAdded = false;
    vm.styleModals = ['fonts', 'colors', 'icons'];
    vm.urlRegEx = /^(http(s?):\/\/)?(www\.)?[a-zA-Z0-9\.\-\_]+(\.[a-zA-Z]{2,3})+(\/[a-zA-Z0-9\_\-\s\.\/\?\%\#\&\=]*)?$/;
    vm.serif = 'SERIF';
    vm.sansSerif = 'SANS_SERIF';
    vm.scrollTo = function(id) {
      var element;
      element = angular.element(document.getElementById(id));
      return $document.scrollToElementAnimated(element);
    };
    vm.showChooseStyles = function() {
      vm.showPaths = false;
      vm.showChooseStylesModal = true;
      vm.backButtonDisabled = true;
      return vm.activateModal('fonts');
    };
    vm.hideChooseStyles = function() {
      vm.showPaths = true;
      return vm.showChooseStylesModal = false;
    };
    vm.hideUrlStyles = function() {
      return vm.showUrlStylesModal = false;
    };
    vm.showUploadStyles = function() {
      return vm.showUploadStylesModal = true;
    };
    vm.showUrlStyles = function() {
      return vm.showUrlStylesModal = true;
    };
    vm.activateModal = function(modal) {
      vm.activeStyleModal = modal;
      return updateButtons();
    };
    vm.viewNext = function() {
      var currentIndex, isValid, nextModal;
      currentIndex = vm.styleModals.indexOf(vm.activeStyleModal);
      isValid = currentIndex < vm.styleModals.length - 1;
      if (isValid) {
        nextModal = vm.styleModals[currentIndex + 1];
        return vm.activateModal(nextModal);
      }
    };
    vm.viewPrevious = function() {
      var currentIndex, isValid, previousModal;
      currentIndex = vm.styleModals.indexOf(vm.activeStyleModal);
      isValid = currentIndex > 0;
      if (isValid) {
        previousModal = vm.styleModals[currentIndex - 1];
        return vm.activateModal(previousModal);
      }
    };
    vm.save = function(done, kickoff) {
      var updates;
      if (done == null) {
        done = false;
      }
      if (kickoff == null) {
        kickoff = false;
      }
      updates = getUpdates();
      updates.status = kickoff ? 'SUBMITTED' : 'INCOMPLETE';
      return SubmitWorkService.save(updates).then(function() {
        if (done && kickoff) {
          return $state.go('submit-work-complete', {
            id: vm.workId
          });
        } else if (done) {
          return $state.go('view-work-multiple');
        } else if (vm.showChooseStylesModal) {
          return vm.hideChooseStyles();
        } else if (vm.showUrlStylesModal) {
          if (!$scope.urlForm.addressInput.$error.pattern) {
            return vm.hideUrlStyles();
          }
        }
      });
    };
    transformToUrl = function(address) {
      if (address.substr(0, 4) !== 'http') {
        return "http://" + address;
      } else {
        return address;
      }
    };
    getUpdates = function() {
      var getId, updates;
      getId = function(item) {
        return item.id;
      };
      updates = {
        fontIds: vm.font ? [vm.font] : null,
        colorSwatchIds: vm.colors.filter(isSelected).map(getId),
        iconsetIds: vm.icon ? [vm.icon] : null,
        designUrls: vm.url ? [transformToUrl(vm.url)] : null
      };
      return updates;
    };
    vm.navigateDevelopment = function() {
      return $state.go("submit-work-development", {
        id: vm.workId
      });
    };
    isSelected = function(item) {
      return item.selected;
    };
    updateButtons = function() {
      var currentIndex, isFirst, isLast;
      currentIndex = vm.styleModals.indexOf(vm.activeStyleModal);
      isFirst = currentIndex === 0;
      isLast = currentIndex === vm.styleModals.length - 1;
      if (isFirst) {
        vm.nextButtonDisabled = false;
        vm.showFinishDesignButton = false;
        return vm.backButtonDisabled = true;
      } else if (isLast) {
        vm.nextButtonDisabled = true;
        vm.backButtonDisabled = false;
        return vm.showFinishDesignButton = true;
      } else {
        vm.nextButtonDisabled = false;
        vm.backButtonDisabled = false;
        return vm.showFinishDesignButton = false;
      }
    };
    configureUploader = function() {
      return vm.uploaderConfig = SubmitWorkUploaderService.generateConfig(vm.workId, 'visuals');
    };
    onChange = function() {
      var ref, ref1, ref2, work;
      work = SubmitWorkService.get();
      if (work._pending) {
        vm.loading = true;
        return false;
      }
      vm.loading = false;
      vm.font = vm.font || ((ref = work.fontIds) != null ? ref[0] : void 0);
      vm.icon = vm.icon || ((ref1 = work.iconsetIds) != null ? ref1[0] : void 0);
      vm.url = vm.url || ((ref2 = work.designUrls) != null ? ref2[0] : void 0);
      vm.fonts = angular.copy(RequirementService.fonts);
      vm.colors = angular.copy(RequirementService.colors);
      vm.icons = angular.copy(RequirementService.icons);
      vm.colors.forEach(function(color) {
        var ref3;
        if (((ref3 = work.colorSwatchIds) != null ? ref3.indexOf(color.id) : void 0) >= 0) {
          return color.selected = true;
        }
      });
      if ((vm.font != null) || (vm.icon != null) || vm.colors.filter(isSelected).length > 0) {
        vm.specsDefined = true;
      } else {
        vm.specsDefined = false;
      }
      if (vm.url != null) {
        vm.urlAdded = true;
      } else {
        vm.urlAdded = false;
      }
      vm.projectType = work.projectType;
      vm.section = 2;
      return vm.numberOfSections = work.projectType === 'DESIGN_AND_CODE' ? 3 : 2;
    };
    activate = function() {
      var destroyWorkListener;
      destroyWorkListener = $rootScope.$on("SubmitWorkService.work:changed", function() {
        return onChange();
      });
      $scope.$on('$destroy', function() {
        return destroyWorkListener();
      });
      SubmitWorkService.fetch(vm.workId);
      configureUploader();
      return vm;
    };
    return activate();
  };

  SubmitWorkVisualController.$inject = ['$scope', '$rootScope', '$state', '$document', 'SubmitWorkService', 'SubmitWorkUploaderService', 'RequirementService'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkVisualController', SubmitWorkVisualController);

}).call(this);

(function() {
  'use strict';
  var SubmitWorkFeaturesController;

  SubmitWorkFeaturesController = function($scope, $rootScope, SubmitWorkService, SubmitWorkAPIService, SubmitWorkUploaderService, RequirementService) {
    var activate, config, configureUploader, getUpdates, localStorageKey, onChange, vm;
    if ($scope.workId) {
      localStorageKey = "recentSubmitWorkSection-" + $scope.workId;
      localStorage[localStorageKey] = 'features';
    }
    vm = this;
    vm.workId = $scope.workId;
    vm.loading = true;
    vm.featureTitleError = false;
    vm.showFeaturesModal = false;
    vm.showUploadModal = false;
    vm.showDefineFeaturesForm = false;
    vm.featuresDefined = false;
    vm.urlAdded = false;
    vm.addingCustomFeature = false;
    vm.activeFeature = null;
    vm.uploaderUploading = null;
    vm.uploaderHasErrors = null;
    vm.uploaderHasFiles = null;
    vm.features = [];
    config = {
      customFeatureTemplate: {
        category: 'Custom Features',
        id: null,
        title: null,
        description: null,
        notes: null,
        custom: true,
        fileIds: []
      }
    };
    vm.categoriesList = [
      {
        category: 'Custom Features',
        icon: '/images/custom-features.svg'
      }, {
        category: 'Login & Registration',
        icon: '/images/login-reg.svg'
      }, {
        category: 'General Building Blocks',
        icon: '/images/general-building-blocks.svg'
      }, {
        category: 'Ecommerce',
        icon: '/images/ecommerce.svg'
      }, {
        category: 'Social',
        icon: '/images/social.svg'
      }
    ];
    vm.filterByCategory = function(list, category) {
      var featureList;
      featureList = list != null ? list.filter(function(feature) {
        return feature.category === category;
      }) : void 0;
      return featureList;
    };
    vm.activeFeatureChangedNotes = function(activeFeature) {
      var changedNotes, ref;
      changedNotes = false;
      if ((ref = vm.updatedFeatures) != null) {
        ref.forEach(function(feature) {
          if (feature.id === (activeFeature != null ? activeFeature.id : void 0) && feature.notes !== (activeFeature != null ? activeFeature.notes : void 0)) {
            return changedNotes = true;
          }
        });
      }
      return changedNotes;
    };
    vm.showFeatures = function() {
      return vm.showFeaturesModal = true;
    };
    vm.showUpload = function() {
      return vm.showUploadModal = true;
    };
    vm.toggleDefineFeatures = function() {
      vm.activeFeature = null;
      vm.addingCustomFeature = true;
      return vm.showDefineFeaturesForm = !vm.showDefineFeaturesForm;
    };
    vm.hideCustomFeatures = function() {
      return vm.showDefineFeaturesForm = false;
    };
    vm.activateFeature = function(feature) {
      vm.showDefineFeaturesForm = false;
      vm.addingCustomFeature = false;
      vm.activePreview = feature.title;
      return vm.activeFeature = feature;
    };
    vm.saveNotes = function() {
      return vm.updatedFeatures.forEach(function(updatedFeature) {
        if (updatedFeature.id === vm.activeFeature.id) {
          return updatedFeature.notes = vm.activeFeature.notes;
        }
      });
    };
    vm.applyFeature = function() {
      vm.activeFeature.selected = true;
      vm.features.forEach(function(feature) {
        if (feature.id === vm.activeFeature.id) {
          return vm.updatedFeatures.push(feature);
        }
      });
      return onChange();
    };
    vm.removeFeature = function() {
      vm.updatedFeatures.forEach(function(feature, index) {
        if (feature.title === vm.activeFeature.title) {
          return vm.updatedFeatures.splice(index, 1);
        }
      });
      vm.activeFeature = null;
      return onChange();
    };
    vm.customNameUnique = function() {
      var unique;
      vm.featureTitleError = false;
      unique = true;
      vm.features.forEach(function(feature) {
        var ref;
        if (((ref = vm.customFeature.title) != null ? ref.toLowerCase() : void 0) === feature.title.toLowerCase()) {
          vm.featureTitleError = true;
          return unique = false;
        }
      });
      return unique;
    };
    vm.addCustomFeature = function() {
      var customFeatureValid;
      customFeatureValid = vm.customFeature.title && vm.customFeature.description && vm.customNameUnique();
      if (customFeatureValid) {
        vm.updatedFeatures.push(vm.customFeature);
        vm.hideCustomFeatures();
        return onChange();
      }
    };
    vm.save = function() {
      var updates, uploaderValid;
      uploaderValid = !vm.uploaderUploading && !vm.uploaderHasErrors;
      updates = getUpdates();
      if (uploaderValid) {
        return SubmitWorkService.save(updates).then(function() {
          return vm.showFeaturesModal = false;
        });
      }
    };
    getUpdates = function() {
      var ref, updates;
      updates = {
        features: []
      };
      if ((ref = vm.updatedFeatures) != null) {
        ref.forEach(function(feature) {
          return updates.features.push({
            category: feature.category,
            id: feature.id,
            title: feature.title,
            description: feature.description,
            notes: feature.notes,
            custom: feature.custom,
            fileIds: feature.fileIds
          });
        });
      }
      return updates;
    };
    configureUploader = function() {
      return vm.uploaderConfig = SubmitWorkUploaderService.generateConfig(vm.workId, 'features');
    };
    onChange = function() {
      var work;
      work = SubmitWorkService.get();
      if (work._pending) {
        vm.loading = true;
        return false;
      }
      vm.loading = false;
      vm.appName = work.name;
      vm.customFeature = angular.copy(config.customFeatureTemplate);
      vm.featureTitleError = false;
      vm.selectedFeaturesCount = 0;
      vm.features = angular.copy(RequirementService.features);
      if (!vm.updatedFeatures) {
        vm.updatedFeatures = work.features;
      }
      vm.updatedFeatures.forEach(function(feature) {
        if (feature.custom) {
          feature.selected = true;
          feature.category = 'Custom Features';
          vm.features.push(feature);
          return vm.selectedFeaturesCount++;
        } else {
          return vm.features.forEach(function(vmFeature) {
            if (feature.id === vmFeature.id) {
              vmFeature.selected = true;
              vmFeature.notes = feature.notes;
              return vm.selectedFeaturesCount++;
            }
          });
        }
      });
      vm.featuresDefined = vm.selectedFeaturesCount > 0;
      vm.projectType = work.projectType;
      vm.section = 1;
      return vm.numberOfSections = work.projectType === 'DESIGN_AND_CODE' ? 3 : 2;
    };
    activate = function() {
      var destroyWorkListener;
      $scope.$watch('vm.showFeaturesModal', function(newValue, oldValue) {
        if (oldValue && !newValue) {
          return vm.save();
        }
      });
      destroyWorkListener = $rootScope.$on("SubmitWorkService.work:changed", function() {
        return onChange();
      });
      $scope.$on('$destroy', function() {
        return destroyWorkListener();
      });
      SubmitWorkService.fetch(vm.workId);
      return configureUploader();
    };
    activate();
    return vm;
  };

  SubmitWorkFeaturesController.$inject = ['$scope', '$rootScope', 'SubmitWorkService', 'SubmitWorkAPIService', 'SubmitWorkUploaderService', 'RequirementService'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkFeaturesController', SubmitWorkFeaturesController);

}).call(this);

(function() {
  'use strict';
  var SubmitWorkDevelopmentController;

  SubmitWorkDevelopmentController = function($scope, $rootScope, $state, SubmitWorkService, SubmitWorkUploaderService) {
    var activate, configureUploader, localStorageKey, onChange, someSpecsSelected, updateButtons, vm;
    if ($scope.workId) {
      localStorageKey = "recentSubmitWorkSection-" + $scope.workId;
      localStorage[localStorageKey] = 'development';
    }
    vm = this;
    vm.loading = true;
    vm.workId = $scope.workId;
    vm.showUploadSpecs = false;
    vm.showDefineSpecsModal = false;
    vm.uploaderUploading = false;
    vm.uploaderHasErrors = false;
    vm.uploaderHasFiles = false;
    vm.specsDefined = false;
    vm.activeDevelopmentModal = null;
    vm.projectType = null;
    vm.developmentModals = ['offlineAccess', 'personalInformation', 'security', 'thirdPartyIntegrations'];
    vm.securityLevels = {
      none: 'none',
      minimal: 'minimal',
      complete: 'complete'
    };
    vm.uploadSpecs = function() {
      return vm.showUploadSpecs = true;
    };
    vm.showDefineSpecs = function() {
      vm.showDefineSpecsModal = true;
      return vm.activateModal('offlineAccess');
    };
    vm.hideDefineSpecs = function() {
      return vm.showDefineSpecsModal = false;
    };
    vm.activateModal = function(modal) {
      vm.activeDevelopmentModal = modal;
      return updateButtons();
    };
    vm.viewNext = function() {
      var currentIndex, isValid, nextModal;
      currentIndex = vm.developmentModals.indexOf(vm.activeDevelopmentModal);
      isValid = currentIndex < vm.developmentModals.length - 1;
      if (isValid) {
        nextModal = vm.developmentModals[currentIndex + 1];
        return vm.activateModal(nextModal);
      }
    };
    vm.viewPrevious = function() {
      var currentIndex, isValid, previousModal;
      currentIndex = vm.developmentModals.indexOf(vm.activeDevelopmentModal);
      isValid = currentIndex > 0;
      if (isValid) {
        previousModal = vm.developmentModals[currentIndex - 1];
        return vm.activateModal(previousModal);
      }
    };
    vm.save = function(done, kickoff) {
      var name, prop, updates, uploaderValid;
      if (done == null) {
        done = false;
      }
      if (kickoff == null) {
        kickoff = false;
      }
      uploaderValid = !vm.uploaderUploading && !vm.uploaderHasErrors;
      updates = vm.work;
      updates.status = kickoff ? 'SUBMITTED' : 'INCOMPLETE';
      for (name in updates) {
        prop = updates[name];
        if (!prop) {
          prop = null;
        }
      }
      return SubmitWorkService.save(updates).then(function() {
        if (done && kickoff && uploaderValid) {
          return $state.go('submit-work-complete', {
            id: vm.workId
          });
        } else if (done) {
          return $state.go('view-work-multiple');
        } else {
          return vm.hideDefineSpecs();
        }
      });
    };
    updateButtons = function() {
      var currentIndex, isFirst, isLast;
      currentIndex = vm.developmentModals.indexOf(vm.activeDevelopmentModal);
      isFirst = currentIndex === 0;
      isLast = currentIndex === vm.developmentModals.length - 1;
      if (isFirst) {
        vm.nextButtonDisabled = false;
        vm.backButtonDisabled = true;
        return vm.showFinishDevelopmentButton = false;
      } else if (isLast) {
        vm.nextButtonDisabled = true;
        vm.backButtonDisabled = false;
        return vm.showFinishDevelopmentButton = true;
      } else {
        vm.backButtonDisabled = false;
        vm.nextButtonDisabled = false;
        return vm.showFinishDevelopmentButton = false;
      }
    };
    someSpecsSelected = function(updates) {
      var key, someCompleted, specKeys, value;
      someCompleted = false;
      specKeys = {
        offlineAccess: true,
        usesPersonalInformation: true,
        securityLevel: true,
        numberOfApiIntegrations: true
      };
      for (key in updates) {
        value = updates[key];
        if (specKeys[key] && (value != null)) {
          someCompleted = true;
        }
      }
      return someCompleted;
    };
    configureUploader = function() {
      return vm.uploaderConfig = SubmitWorkUploaderService.generateConfig(vm.workId, 'development');
    };
    onChange = function() {
      var work;
      work = SubmitWorkService.get();
      if (work._pending) {
        vm.loading = true;
        return false;
      }
      vm.loading = false;
      vm.work = {
        offlineAccess: work.offlineAccess,
        usesPersonalInformation: work.usesPersonalInformation,
        securityLevel: work.securityLevel,
        numberOfApiIntegrations: work.numberOfApiIntegrations
      };
      vm.specsDefined = someSpecsSelected(vm.work);
      vm.projectType = work.projectType;
      vm.section = 3;
      return vm.numberOfSections = 3;
    };
    activate = function() {
      var destroyWorkListener;
      destroyWorkListener = $rootScope.$on("SubmitWorkService.work:changed", function() {
        return onChange();
      });
      $scope.$on('$destroy', function() {
        return destroyWorkListener();
      });
      SubmitWorkService.fetch(vm.workId);
      return configureUploader();
    };
    activate();
    return vm;
  };

  SubmitWorkDevelopmentController.$inject = ['$scope', '$rootScope', '$state', 'SubmitWorkService', 'SubmitWorkUploaderService'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkDevelopmentController', SubmitWorkDevelopmentController);

}).call(this);

(function() {
  'use strict';
  var SubmitWorkCompleteController;

  SubmitWorkCompleteController = function($scope, $rootScope, $state) {
    var activate, vm;
    vm = this;
    vm.show = true;
    vm.appName = $rootScope.currentAppName;
    activate = function() {
      $scope.$watch('vm.show', function(newValue) {
        if (newValue === false) {
          return $state.go('view-work-multiple');
        }
      });
      return vm;
    };
    return activate();
  };

  SubmitWorkCompleteController.$inject = ['$scope', '$rootScope', '$state'];

  angular.module('appirio-tech-ng-submit-work').controller('SubmitWorkCompleteController', SubmitWorkCompleteController);

}).call(this);

(function() {
  'use strict';
  var FeaturelistController;

  FeaturelistController = function($scope) {
    var activate, vm;
    vm = this;
    vm.activateFeature = $scope.activateFeature;
    vm.headerText = $scope.headerText;
    vm.features = $scope.features;
    activate = function() {
      $scope.$watch('activeFeature', function(newValue) {
        return vm.activeFeature = newValue;
      });
      $scope.$watch('features', function(newValue) {
        return vm.features = newValue;
      });
      return vm;
    };
    return activate();
  };

  FeaturelistController.$inject = ['$scope'];

  angular.module('appirio-tech-ng-submit-work').controller('FeaturelistController', FeaturelistController);

}).call(this);

(function() {
  'use strict';
  var SubmitWorkService;

  SubmitWorkService = function($rootScope, OptimistModel, SubmitWorkAPIService, ProjectsAPIService, $q) {
    var create, currentWorkId, emitUpdates, fetch, get, getPromise, resetWork, save, subscribe, work, workTemplate;
    currentWorkId = null;
    work = null;
    workTemplate = {
      modelType: 'app-project',
      id: null,
      name: null,
      projectType: null,
      deviceIds: [],
      orientationIds: [],
      brief: null,
      features: [],
      fontIds: [],
      colorSwatchIds: [],
      iconsetIds: [],
      designUrls: [],
      offlineAccess: null,
      offlineAccessComment: null,
      usesPersonalInformation: null,
      securityLevel: null,
      numberOfApiIntegrations: null,
      threadId: null
    };
    emitUpdates = function() {
      return $rootScope.$emit('SubmitWorkService.work:changed');
    };
    resetWork = function() {
      return work = new OptimistModel({
        data: workTemplate,
        updateCallback: emitUpdates,
        propsToIgnore: {
          $promise: true,
          $resolved: true
        }
      });
    };
    get = function() {
      return work.get();
    };
    getPromise = function(workId) {
      if (work && workId === work.id) {
        return $q.when(work.get());
      } else {
        return fetch(workId).then(function() {
          return work.get();
        });
      }
    };
    subscribe = function(scope, onChange) {
      var destroyWorkListener;
      destroyWorkListener = $rootScope.$on('StepsService:changed', function() {
        return onChange();
      });
      scope.$on('$destroy', function() {
        return destroyWorkListener();
      });
      return onChange();
    };
    create = function(updates) {
      var apiCall, interceptResponse;
      resetWork();
      interceptResponse = function(res) {
        currentWorkId = res.id;
        work.set({
          updates: {
            id: res.id,
            threadId: res.threadId
          },
          updateValues: true
        });
        return res;
      };
      apiCall = function(model) {
        return ProjectsAPIService.post({}, model).$promise.then(interceptResponse);
      };
      return work.update({
        updates: updates,
        apiCall: apiCall
      });
    };
    fetch = function(workId) {
      var apiCall;
      if (workId !== currentWorkId) {
        resetWork();
        currentWorkId = workId;
      }
      apiCall = function() {
        var params;
        params = {
          id: currentWorkId
        };
        return SubmitWorkAPIService.get(params).$promise;
      };
      return work.fetch({
        apiCall: apiCall
      });
    };
    save = function(updates) {
      var apiCall;
      apiCall = function(model) {
        var params;
        params = {
          id: currentWorkId
        };
        return SubmitWorkAPIService.put(params, model).$promise;
      };
      return work.update({
        updates: updates,
        apiCall: apiCall
      });
    };
    return {
      get: get,
      getPromise: getPromise,
      subscribe: subscribe,
      create: create,
      fetch: fetch,
      save: save
    };
  };

  SubmitWorkService.$inject = ['$rootScope', 'OptimistModel', 'SubmitWorkAPIService', 'ProjectsAPIService', '$q'];

  angular.module('appirio-tech-ng-submit-work').factory('SubmitWorkService', SubmitWorkService);

}).call(this);

(function() {
  'use strict';
  var srv;

  srv = function() {
    var service;
    service = {};
    service.projectTypes = [
      {
        name: 'Design',
        description: 'Have an idea or requirements for an app that you would like designed? Get design mockups that are ready to be turned into code.',
        id: 'DESIGN',
        selected: false
      }, {
        name: 'Design & Development',
        description: 'Have an idea, sketch, or designs for an app? Get a fully functioning app built, along with the source code.',
        id: 'DESIGN_AND_CODE',
        selected: false
      }
    ];
    service.devices = [
      {
        name: 'iWatch',
        id: 'IWATCH',
        selected: false
      }, {
        name: 'iPhone',
        id: 'IPHONE',
        selected: false
      }, {
        name: 'iPad',
        id: 'IPAD',
        selected: false
      }
    ];
    service.orientations = [
      {
        name: 'Landscape',
        id: 'LANDSCAPE',
        selected: false
      }, {
        name: 'Portrait',
        id: 'PORTRAIT',
        selected: true
      }
    ];
    service.features = [
      {
        category: 'Login & Registration',
        id: 'EMAIL LOGIN',
        title: 'Email Login',
        description: 'Allow users to register and log in using their email address and a password. Users can also change their password or recover a forgotten one.',
        notes: null,
        custom: null,
        icon: '/images/help-me.svg',
        selected: false
      }, {
        category: 'Login & Registration',
        id: 'SOCIAL LOGIN',
        title: 'Social Login',
        description: 'Allow users to register and log in using third-party services such as Facebook, Twitter, and Google. Please specify below the ones that you would like to use.',
        notes: null,
        custom: null,
        icon: '/images/security-minimal.svg',
        selected: false
      }, {
        category: 'Login & Registration',
        id: 'INVITATIONS',
        title: 'Invitations',
        description: 'Allow users to invite others to use your app. This functionality is especially useful if you are building a social application or provide incentives for users to invite their friends. Invitations can be sent via email or text message. Please specify your preference below.',
        notes: null,
        custom: null,
        icon: '/images/login-reg.svg',
        selected: false
      }, {
        category: 'Login & Registration',
        id: 'INTRODUCTIONS',
        title: 'Introductions',
        description: 'Present your app and inform users of core functionality using a series of introductory screens.',
        notes: null,
        custom: null,
        icon: '/images/location.svg',
        selected: false
      }, {
        category: 'Login & Registration',
        id: 'ONBOARDING',
        title: 'Onboarding',
        description: 'Virtually walk your users through your application. This functionality is especially useful if you need new users to set up an account or express preferences.',
        notes: null,
        custom: null,
        icon: '/images/social.svg',
        selected: false
      }, {
        category: 'General Building Blocks',
        id: 'SEARCH',
        title: 'Search',
        description: 'Provide the ability to search your app for specific content, such as products, members, or locations. Please specify below if you also would like autocomplete--suggesting appropriate search terms as a user starts typing.',
        notes: null,
        custom: null,
        icon: '/images/ecommerce.svg',
        selected: false
      }, {
        category: 'General Building Blocks',
        id: 'GEOLOCATION FEATURES',
        title: 'Geolocation Features',
        description: 'Add this feature if your app has any geographic location-based functionality, such as showing store locations on a map or illustrating the progress of a delivery. Please specify your desired functionality below.',
        notes: null,
        custom: null,
        icon: '/images/payments.svg',
        selected: false
      }, {
        category: 'General Building Blocks',
        id: 'CAMERA (AUDIO & VIDEO)',
        title: 'Camera (Audio & Video)',
        description: 'Add this feature if your app will require using the camera to capture audio or video. Please specify your desired usage below.',
        notes: null,
        custom: null,
        icon: '/images/notifications.svg',
        selected: false
      }, {
        category: 'General Building Blocks',
        id: 'FILE UPLOAD',
        title: 'File Upload',
        description: 'Allow users to upload photos or other files from their phone. Please specify your desired usage below.',
        notes: null,
        custom: null,
        icon: '/images/audio.svg',
        selected: false
      }, {
        category: 'General Building Blocks',
        id: 'NOTIFICATIONS',
        title: 'Notifications',
        description: 'Take advantage of mobile notifications; for example, remind users to do certain tasks or update them on new content. Please specify your desired functionality below.',
        notes: null,
        custom: null,
        icon: '/images/audio.svg',
        selected: false
      }, {
        category: 'General Building Blocks',
        id: 'SHARING',
        title: 'Sharing',
        description: 'Allow users to share content from your app using common options, such as email, text message, or Facebook. Please specify your desired usage below.',
        notes: null,
        custom: null,
        icon: '/images/audio.svg',
        selected: false
      }, {
        category: 'General Building Blocks',
        id: 'TAGS',
        title: 'Tags',
        description: 'Allow users to tag products, people or content; for example, in order to classify and easily retrieve notes. Please specify your desired functionality below.',
        notes: null,
        custom: null,
        icon: '/images/audio.svg',
        selected: false
      }, {
        category: 'General Building Blocks',
        id: 'ADMIN FUNCTIONALITY',
        title: 'Admin Functionality',
        description: 'Add this feature if your app will have users that serve as administrators and require special access rights. Please specify your desired usage below.',
        notes: null,
        custom: null,
        icon: '/images/audio.svg',
        selected: false
      }, {
        category: 'General Building Blocks',
        id: 'ACCOUNT SETTINGS',
        title: 'Account Settings',
        description: 'Allow your users to adjust settings or specify preferences, such as communication frequency. Please specify your desired functionality below.',
        notes: null,
        custom: null,
        icon: '/images/audio.svg',
        selected: false
      }, {
        category: 'General Building Blocks',
        id: 'DASHBOARD',
        title: 'Dashboard',
        description: 'Customize your users’ home screen with personalized content or basic performance indicators, such as number of wins or progress toward a goal. Please specify your desired usage below.',
        notes: null,
        custom: null,
        icon: '/images/audio.svg',
        selected: false
      }, {
        category: 'General Building Blocks',
        id: 'HELP',
        title: 'Help',
        description: 'Include a section dedicated to FAQ or Help content.',
        notes: null,
        custom: null,
        icon: '/images/audio.svg',
        selected: false
      }, {
        category: 'Ecommerce',
        id: 'MARKETPLACE',
        title: 'Marketplace',
        description: 'Allow users to buy, sell, or rent products or services. Please provide details below regarding how your marketplace should work. ',
        notes: null,
        custom: null,
        icon: '/images/audio.svg',
        selected: false
      }, {
        category: 'Ecommerce',
        id: 'RATINGS & REVIEWS',
        title: 'Ratings & Reviews',
        description: 'Let users rate or review people, products, or services. Please specify your desired usage below.',
        notes: null,
        custom: null,
        icon: '/images/audio.svg',
        selected: false
      }, {
        category: 'Ecommerce',
        id: 'PAYMENTS',
        title: 'Payments',
        description: 'Allow users to pay in some way; for example, using credit cards, PayPal, or Bitcoin. Please specify your desired functionality below.',
        notes: null,
        custom: null,
        icon: '/images/audio.svg',
        selected: false
      }, {
        category: 'Ecommerce',
        id: 'SHOPPING CART',
        title: 'Shopping Cart',
        description: 'Allow users to save items before purchasing. Please specify your desired usage below.',
        notes: null,
        custom: null,
        icon: '/images/audio.svg',
        selected: false
      }, {
        category: 'Ecommerce',
        id: 'PRODUCT LISTING',
        title: 'Product Listing',
        description: 'Add this feature to shows lists of product or services, with individual detail pages for each one. Please specify below your desired usage and the information you would like in a product listing.',
        notes: null,
        custom: null,
        icon: '/images/audio.svg',
        selected: false
      }, {
        category: 'Social',
        id: 'ACTIVITY FEED',
        title: 'Activity Feed',
        description: 'Show your users an activity feed of some kind, as they’re used to seeing on Facebook and Twitter, for example. Please specify below your desired usage and the information that a user should see in the activity feed.',
        notes: null,
        custom: null,
        icon: '/images/audio.svg',
        selected: false
      }, {
        category: 'Social',
        id: 'PROFILES',
        title: 'Profiles',
        description: 'Add this feature if your app requires users to have a profile, including the ability to edit it. Please specify below your desired usage and the information you need in the profile.',
        notes: null,
        custom: null,
        icon: '/images/audio.svg',
        selected: false
      }, {
        category: 'Social',
        id: 'MESSAGING',
        title: 'Messaging',
        description: 'Allow direct communication between two or more users. Please specify your desired functionality below.',
        notes: null,
        custom: null,
        icon: '/images/audio.svg',
        selected: false
      }
    ];
    service.fonts = [
      {
        name: 'Serif',
        description: 'Classic design, good legibility for large and small text.',
        id: 'SERIF',
        selected: false
      }, {
        name: 'Sans Serif',
        id: 'SANS_SERIF',
        description: 'Modern font families known for their versatility.',
        selected: false
      }
    ];
    service.colors = [
      {
        name: 'Blue',
        id: 'BLUE',
        selected: false
      }, {
        name: 'Red',
        id: 'RED',
        selected: false
      }, {
        name: 'Green',
        id: 'GREEN',
        selected: false
      }, {
        name: 'Orange',
        id: 'ORANGE',
        selected: false
      }, {
        name: 'Black',
        id: 'BLACK',
        selected: false
      }
    ];
    service.icons = [
      {
        name: 'Flat Color',
        description: 'A one dimensional, colorful icon style.',
        id: 'FLAT_COLORS',
        selected: false,
        img: 'flat-colors'
      }, {
        name: 'Thin Line',
        description: 'A lighter weight and modern icon style.',
        id: 'THIN_LINE',
        selected: false,
        img: 'thin-line'
      }, {
        name: 'Solid Line',
        description: 'A bold and visually powerful icon style.',
        id: 'SOLID_LINE',
        selected: false,
        img: 'solid-line'
      }
    ];
    return service;
  };

  srv.$inject = [];

  angular.module('appirio-tech-ng-submit-work').factory('RequirementService', srv);

}).call(this);

(function() {
  'use strict';
  var SubmitWorkUploaderService;

  SubmitWorkUploaderService = function(API_URL) {
    var generateConfig;
    generateConfig = function(workId, assetType) {
      var category, domain, uploaderConfig;
      domain = API_URL;
      category = 'work';
      uploaderConfig = {
        name: assetType + "-uploader-" + workId,
        allowMultiple: true,
        query: {
          url: domain + '/v3/attachments',
          params: {
            filter: "id=" + workId + "&assetType=" + assetType + "&category=" + category,
            fields: 'url'
          }
        },
        presign: {
          url: domain + '/v3/attachments/uploadurl',
          params: {
            id: workId,
            assetType: assetType,
            category: category
          }
        },
        createRecord: {
          url: domain + '/v3/attachments',
          params: {
            id: workId,
            assetType: assetType,
            category: category
          }
        },
        removeRecord: {
          url: domain + '/v3/attachments/:fileId',
          params: {
            filter: 'category=' + category
          }
        }
      };
      return uploaderConfig;
    };
    return {
      generateConfig: generateConfig
    };
  };

  SubmitWorkUploaderService.$inject = ['API_URL'];

  angular.module('appirio-tech-ng-submit-work').factory('SubmitWorkUploaderService', SubmitWorkUploaderService);

}).call(this);
