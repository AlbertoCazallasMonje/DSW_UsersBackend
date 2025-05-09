require('dotenv').config();
const sgMail = require('@sendgrid/mail');
console.log('> SENDGRID_API_KEY=', !!process.env.SENDGRID_API_KEY);
console.log('> SENDGRID_FROM_EMAIL=', process.env.SENDGRID_FROM_EMAIL);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail({ to, subject, text, html }) {
    const msg = {
        to,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject,
        text,
        html
    };

    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error('Error sending email with SendGrid:', error);
        if (error.response) {
            console.error(error.response.body);
        }
        throw error;
    }
}

module.exports = { sendEmail };