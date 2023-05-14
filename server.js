//server
const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const fs = require('fs');

require('dotenv').config();

const app = express();
//  that directory doesn't exist, Multer should automatically create it for you when a file is uploaded.
const upload = multer({ dest: '/tmp/nodemailer/uploads/' });

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // user
    pass: process.env.EMAIL_PASS, // password
  },
});

// Cleanup function to remove file
function cleanup(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log('Error removing file: ', err);
    } else {
      console.log('File removed');
    }
  });
}

// home route
app.get('/', (req, res) => {
  res.send('mail server is running');
});

// send mail route
app.post('/sendmail', upload.single('image'), (req, res) => {
  let message = req.body.message;
  let imagePath = req.file.path;

  console.log('sendmail request: ');
  console.log('image path: ', imagePath);

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.TO_EMAIL,
    subject: 'Hello Greeting from Xu',
    text: message,
    attachments: [
      {
        filename: req.file.originalname,
        path: imagePath,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    cleanup(imagePath);

    if (error) {
      console.log(error);
      res.status(500).send('An error occurred while sending mail');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
