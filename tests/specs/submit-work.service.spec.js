/* jshint -W117, -W030 */
describe('SubmitWorkService', function () {
  var service, scope;

  beforeEach(function () {
    bard.inject('SubmitWorkService');
  });

  beforeEach(function () {
    service = SubmitWorkService;
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Submit work service', function () {
    it('should be created successfully', function () {
      expect(service).to.be.defined;
    });

    it('should return an object for work', function() {
      var cur = service.work;
      expect(cur).to.be.defined;
      expect(cur.name).to.equal(null);
    });

    it('should have a default price of 0', function() {
      service.work.features = [];
      expect(service.getEstimate().low).to.equal(0);
    });

    it('should be able to calculate a price', function() {
      service.work.features = [];
      service.work.requestType='design';
      expect(service.getEstimate().low).to.equal(2000);
      expect(service.getEstimate().high).to.equal(2000);
      service.work.features = [{selected: true}];
      expect(service.getEstimate().low).to.equal(2800);
      expect(service.getEstimate().high).to.equal(3200);
      service.work.features = [{selected: true}, {selected: true}, {selected: true}];
      expect(service.getEstimate().low).to.equal(4400);
      expect(service.getEstimate().high).to.equal(5600);
      service.work.features = [{selected: false}, {selected: true}, {selected: true}];
      expect(service.getEstimate().low).to.equal(3600);
      expect(service.getEstimate().high).to.equal(4400);
    });

  });
});
