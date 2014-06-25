var emailroute = require('../routes/email');
var emailsvc = require('../lib/emailsvc');

var Response = function() {
	this.json = function(httpcode) {
		this.httpcode = httpcode;
	}
}

describe("Sending email", function(){

	var req, res;
	var toemail = 'toemail@autodevbot.com';
	var fromemail = 'noreply@autodevbot.com';

	beforeEach(function() {
		req = {};
		req.body = {};
		res = new Response();
	});

	afterEach(function(done) {
		done();
	});

	it("should return a 403 error when no auth token passed in", function() {
		emailroute.sendmail(req, res);
		expect(res.httpcode).toEqual(403);
	});

	it("should return a 400 error when To and From emails are not specified", function() {
		req.body.authtoken = 'abc123';
		emailroute.sendmail(req, res);
		expect(res.httpcode).toEqual(400);
	});	

	it("should return 200 for an async request", function(done) {
		req.body.async = true;
		req.body.authtoken = 'abc123';
		req.body.from = fromemail;
		req.body.to = toemail;
		var spy = spyOn(emailsvc, "send");
		emailroute.sendmail(req, res);
		expect(spy).toHaveBeenCalled();		
		expect(res.httpcode).toEqual(200);
		done();
	});

	describe("SMTP email", function() {
		beforeEach(function() {
			process.env.ADBEN_EMAIL_TRANSPORT = 'SMTP';
		});

		afterEach(function() {
			process.env.ADBEN_EMAIL_TRANSPORT = undefined;
		});

		it ("should send an email when all required attributes are present", function(done) {
			req.body.async = false;
			req.body.authtoken = 'abc123';
			req.body.from = fromemail;
			req.body.to = toemail;
			req.body.subject = 'Test email';
			req.body.text = 'This is a test email.';
			var spy = spyOn(emailsvc, "send");
			emailroute.sendmail(req, res);
			expect(spy).toHaveBeenCalled();
			done();
		});
	});


	describe("Amazon SES", function() {

		beforeEach(function() {
			process.env.ADBEN_EMAIL_TRANSPORT = 'SES';
		});

		afterEach(function() {
			process.env.ADBEN_EMAIL_TRANSPORT = undefined;
		});

		it ("should send an email when all required attributes are present", function(done) {
			req.body.async = false;
			req.body.authtoken = 'abc123';
			req.body.from = fromemail;
			req.body.to = toemail;
			req.body.subject = 'Test email';
			req.body.text = 'This is a test email.';
			var spy = spyOn(emailsvc, "send");
			emailroute.sendmail(req, res);
			expect(spy).toHaveBeenCalled();
			done();
		});
	});

});











