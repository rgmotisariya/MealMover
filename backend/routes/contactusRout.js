import express from 'express';
import nodemailer from 'nodemailer';

// Set up router
const contactUsRouter = express.Router();

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this if you're using a different email provider
    auth: {
        user: process.env.EMAIL_USER, // Your email (from .env)
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password (from .env)
    },
});

// POST route to handle contact form submissions
contactUsRouter.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Basic validation to check if all fields are provided
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Please fill in all fields.' });
        }

        // Nodemailer mail options
        const mailOptions = {
            from: process.env.EMAIL_USER,  // Sender email (yours from .env)
            to: process.env.EMAIL_RECEIVER, // Receiver email (yours from .env)
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        // Send the email using transporter
        await transporter.sendMail(mailOptions);

        // Respond with success message
        res.status(200).json({ message: 'Message sent successfully.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send message.', error });
    }
});

export default contactUsRouter;
