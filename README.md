Test Nodemailer, Nodemailer is a module for Node.js applications to allow easy as cake email sending. The project got started back in 2010 when there was no sane option to send email messages, today it is the solution most Node.js users turn to by default.

link https://nodemailer.com/about/

# just test the the nodemailer

node index.js

# run server

node server.js

# use postman to test the post request with message and image

To test this POST request using Postman, you would follow these steps:

First, open Postman.

Click on the "+" button to create a new tab.

From the dropdown menu, select "POST" as the request method.

Enter the URL for your endpoint. If you're running the server locally and it's listening on port 3000, the URL would be http://localhost:3000/sendmail.

Below the URL, select the "Body" tab.

Choose the "form-data" radio button. This is important as it matches the enctype of the form in your Express server, which is expecting multipart/form-data.

In the form-data key-value pairs, enter message as a key, select "Text" as the type, and enter your desired message as the value.

Add another key-value pair, enter image as the key, select "File" as the type, and select the file you want to send as an attachment.

Click the "Send" button to send the POST request.

Postman should then display the response from your server. If the email was sent successfully, you should see the message 'Email sent successfully'. If there was an error, you should see an error message.
