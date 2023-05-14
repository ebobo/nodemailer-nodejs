'use strict';
const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
async function sendmail() {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'qi.xu@example.com', // generated ethereal user
      pass: '*******', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Qi Xu" <qi.xu@example.com>', // sender address
    to: 'qi.xu@email.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello Qi, From nodemailer nodejs app', // plain text body
    html: '<b>Hello Qi</b>', // html body
    attachments: [
      {
        // file on disk as an attachment
        filename: 'image.jpg',
        path: 'images/img.png', // replace with the path to the file
      },
      // you can add more attachments if needed
    ],
  });

  console.log('Message sent: %s', info.messageId);
}

sendmail().catch(console.error);
