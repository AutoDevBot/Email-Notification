Email-Notification
==================

Simple web service that sends an email on behalf of a client request.  Uses `nodemailer`.

Getting started
---------------

* Config
Create your environment variables in your host environment or create a creds.js file in the application root (same level as `app.js`).  Use creds.js.sample as a starting point.

* Run server and tests
1.  Install the package dependencies.  From the project root, run `npm install`.
2.  Verify the setup by running the tests, run `jasmine-node spec/*`.
3.  Start the server, run `node app.js`.