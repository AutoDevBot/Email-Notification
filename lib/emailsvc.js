var nodemailer = require("nodemailer"),
	creds = require('../creds');

var send = function(req, cb) {

	var txport;
	var txporttype = process.env.ADBEN_EMAIL_TRANSPORT || creds.ADBEN_EMAIL_TRANSPORT;

	if (txporttype === 'SMTP') {
		txport = nodemailer.createTransport("SMTP",{
			service: process.env.ADBEN_SMTP_PROVIDER || creds.ADBEN_SMTP_PROVIDER,
			auth: {
				user: process.env.ADBEN_SMTP_LOGIN || creds.ADBEN_SMTP_LOGIN,
				pass: process.env.ADBEN_SMTP_PASSWORD || creds.ADBEN_SMTP_PASSWORD
			}
		});
	} else if (txporttype === 'SES') {
		txport = nodemailer.createTransport("SES", {
			AWSAccessKeyID: process.env.AWSAccessKeyID || creds.AWSAccessKeyID,
			AWSSecretKey: process.env.AWSSecretKey || creds.AWSSecretKey
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