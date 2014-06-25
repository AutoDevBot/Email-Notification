Email-Notification
==================

[![Build Status](https://drone.io/github.com/AutoDevBot/Email-Notification/status.png)](https://drone.io/github.com/AutoDevBot/Email-Notification/latest)

Simple web service that sends an email on behalf of a client request.  Uses `nodemailer`.

Getting started
---------------

* Config
Create your environment variables in your host environment or create a creds.js file in the application root (same level as `app.js`).  Use creds.js.sample as a starting point.

* Run server and tests
1.  Install the package dependencies.  From the project root, run `npm install`.
2.  Verify the setup by running the tests, run `jasmine-node spec/*`.
3.  Start the server, run `node app.js`.

Sample cURL call to this server
-------------

Sending and email notification

    curl -X POST \
    -d "from=joe@exampl.com" \
    -d "to=destination@example.com" \
    -d "subject=An email notification" \
    -d "text=This is the email body in text format" \
    http://127.0.0.1/email

Checking the server's heartbeat

    curl http://127.0.0.1/heartbeat

Docker Usage
-------------

Detailed instructions coming soon.  