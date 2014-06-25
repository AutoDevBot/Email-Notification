var emailsvc = require('../lib/emailsvc'),
	creds = require('../creds');

exports.sendmail = function(req, res){

	var authtoken = process.env.ADBEN_AUTH_TOKEN || creds.ADBEN_AUTH_TOKEN;

	if (req.body.authtoken != authtoken) {
		res.json(403, "Authtoken is required.");
	} else if (!req.body.to || !req.body.from) {
		res.json(400, "Invalid data.  To and From email addresses are required.");
	} else {
		if (req.body.async) {
			res.json(200);
		}

		emailsvc.send(req, function(err, response) {
			if (err) {
				res.json(500, err);
			} else {
				res.json(response.statusCode || 200, response.message || null);
			}
		});
	}
};