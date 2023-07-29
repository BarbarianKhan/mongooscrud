
const nodemailer = require('nodemailer');

// Create a transporter to send emails
// const transporter = nodemailer.createTransport({
//   service: 'Gmail', // Use your email service provider here (e.g., Gmail, Outlook, etc.)
//   auth: {
//     user: 'nouman.arshad69@gmail.com', // Your email address
//     pass: 'your_email_password',   // Your email password (It is better to use environment variables here)
//   },
// });



var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "2c72f9dec828d8",
      pass: "4246a32050ea5d"
    }
  });

module.exports = transporter;