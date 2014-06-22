var nodemailer = require("nodemailer"),
	creds = require('../creds');

var send = function(req, cb) {

	var txport;
	var txporttype = process.env.ADBEN_EMAIL_TRANSPORT || creds.ADBEN_EMAIL_TRANSPORT;

	if (txporttype === 'SMTP') {
		var username = process.env.ADBEN_SMTP_LOGIN || creds.ADBEN_SMTP_LOGIN;
		var password = process.env.ADBEN_SMTP_PASSWORD || creds.ADBEN_SMTP_PASSWORD;
		var smtpservice = process.env.ADBEN_SMTP_PROVIDER || creds.ADBEN_SMTP_PROVIDER;

		txport = nodemailer.createTransport("SMTP",{
			service: smtpservice,
			auth: {
				user: username,
				pass: password
			}
		});
	} else if (txporttype === 'SES') {
		txport = nodemailer.createTransport("SES", {
			AWSAccessKeyID: "AWSACCESSKEY",
			AWSSecretKey: "AWS/Secret/key"
		});
	}

	if (!txport) {
		cb(new Error("Transport type not supported"), null);
	} else {
		var mailOptions = {};
		mailOptions.from = req.body.from;
		mailOptions.to = req.body.to;
		mailOptions.subject = req.body.subject;
		mailOptions.text = req.body.text;
		txport.sendMail(mailOptions, cb);
	}
}

module.exports.send = send;