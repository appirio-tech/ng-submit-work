/* jshint -W117, -W030 */
describe('FeatureService', function () {
  var service;

  var featuresData = [
    {
      id: 'login',
      name: 'Login',
      explanation: '',
      description: 'Users can login / register for your app',
      custom: false,
      selected: false
    },
    {
      id: 'social-login',
      name: 'Social',
      explanation: '',
      description: 'Users can see data from social networks (FB, Twitter etc.) in your app',
      custom: false,
      selected: false
    },
    {
      id: 'profiles',
      name: 'Profiles',
      explanation: '',
      description: 'Users can create profiles with personal info',
      custom: false,
      selected: false
    },
    {
      id: 'map',
      name: 'Map',
      explanation: '',
      description: 'A map with a user\'s GPS location that helps them get to places',
      custom: false,
      selected: false
    },
    {
      id: 'forms',
      name: 'Forms',
      explanation: '',
      description: 'Users send specific information to you via forms ',
      custom: false,
      selected: false
    },
    {
      id: 'listing',
      name: 'Listing',
      explanation: '',
      description: 'Display list of products, images, items that the user can browse or search through',
      custom: false,
      selected: false
    }
  ];

  beforeEach(function () {
    bard.inject('FeatureService', '$q', '$rootScope');
  });

  beforeEach(function () {
    service = FeatureService;
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Feature Promises', function () {
    it('should be created successfully', function () {
      expect(service).to.be.defined;
    });

    it('should return a promise for getFeatures()', function () {
      var Features = service.getFeatures();

      Features.then(function (reponse) {
        expect(reponse).to.be.ok;
        expect(reponse).eql(featuresData);

        expect(reponse).to.be.a('array');
      });
    });
  });
});
