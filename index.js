'use strict';
const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();

// async..await is not allowed in global scope, must use a wrapper
async function sendmail() {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // smtp server
    port: process.env.EMAIL_PORT, // port
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // email address
      pass: process.env.EMAIL_PASS, // email password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: process.env.TO_EMAIL, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello there, From nodemailer nodejs app', // plain text body
    html: fs.readFileSync('attachment/page.html'),
    attachments: [
      {
        // file on disk as an attachment
        filename: 'image.jpg',
        path: 'attachment/img.png', // replace with the path to the file
      },
      // you can add more attachments if needed
    ],
  });

  console.log('Message sent: %s', info.messageId);
}

sendmail().then(console.log('clean file here')).catch(console.error);
