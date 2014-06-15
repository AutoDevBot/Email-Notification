var emailroute = require('../routes/email');
//var emailsvc = require('../lib/emailsvc');

var Response = function() {
	this.json = function(httpcode) {
		this.httpcode = httpcode;
	}
}

describe("Send an email", function(){

	var req, res;

	beforeEach(function() {
		req = {};
		req.body = {};
		res = new Response();
	});

	afterEach(function(done) {
		done();
	});

	it("should return an error when no auth token passed in", function() {
		emailroute.sendmail(req, res);
		expect(res.httpcode).toEqual(403);
	});

	it("should return 200 for a sync request", function(done) {
		req.body.async = false;
		req.body.authtoken = 'abc123';
		emailroute.sendmail(req, res);
		expect(res.httpcode).toEqual(200);
		done();
	});

});