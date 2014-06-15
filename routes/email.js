var emailsvc = require('../lib/emailsvc');
var creds = require('../creds')
	cluster = require('cluster');

exports.sendmail = function(req, res){

	var authtoken = process.env.ADBEN_AUTH_TOKEN || creds.ADBEN_AUTH_TOKEN;

	if (req.body.authtoken != authtoken) {
		res.json(403);
	} else if (!req.body.async) {
		res.json(200);
	} else {
		emailsvc.send(req, function(err) {
			if (err) {
				res.json(500);
			} else {
				res.json(200);
			}
		});
	}
};