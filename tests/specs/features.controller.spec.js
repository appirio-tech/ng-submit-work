/* jshint -W117, -W030 */
describe('SubmitWorkFeaturesController', function () {
  var controller, scope;

  beforeEach(function () {
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function () {
    scope = $rootScope.$new();
    controller = $controller('SubmitWorkFeaturesController', {$scope: scope});
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Features controller', function () {
    it('should be created successfully', function () {
      expect(controller).to.be.defined;
    });

    describe('after activate', function () {
      it('should have title of Features', function () {
        expect(controller.title).to.equal('Features');
      });

      it('should be able to add custom features', function() {
        controller.newFeatureName = 'foo';
        controller.newFeatureExplanation = 'bar';
        var x = controller.work.features.length;
        controller.add();
        expect(controller.newFeatureName).to.equal('');
        expect(controller.newFeatureExplanation).to.equal('');
        expect(controller.work.features.length).to.equal(x + 1);
      });

    });
  });
});
