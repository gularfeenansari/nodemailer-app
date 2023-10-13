//importing modules
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const nodemailer = require('nodemailer');


//setting up templating engine
app.set('view engine', 'hbs');
app.use('/public',express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views')); 

//middlewares to parse data
app.use(express.urlencoded());
app.use(express.json());

//Home page of application
app.get('/',(req,res)=>{
    res.render('contact');
})

//sending mail using node mailer
app.post('/send',(req,res)=>{
    const output = `
    Hello ${req.body.name}
    You are registered successfully
    Your company is ${req.body.company}
    Contact No: ${req.body.phone}
  `;

    const transporter = nodemailer.createTransport({
             service: 'Gmail', // Use your email service provider
             port : 5000,
             secure : true,
             logger : true,
             debug : true,
             secureConnection : false,

            auth: {
            user: 'email', // Your email address
            pass: 'password' // Your email password or an app-specific password
        },
        tls:{
            rejectUnauthorized:true
          }   
    });

    // Email content
    const mailOptions = {
        from: 'email', // Sender's email address
        to: req.body.email, // Recipient's email address
        subject: 'Hello from Node.js', // Email subject
        text: output // Email text
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
            res.render('contact', {msg:'Email not sent'});
        } else {
            console.log('Email sent:', info.response);
            res.render('contact', {msg:'Email has been sent'});
        }
    });
   

})


// Setting up server
app.listen(5000,()=>{
    console.log('Server running...');
})