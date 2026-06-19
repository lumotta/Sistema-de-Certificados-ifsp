const nodemailer = require('nodemailer')
require('dotenv').config();

const transporter = nodemailer.createTransport(
{
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.DB_EMAIL,
        pass: process.env.DB_EMAILP
    }


})
module.exports = transporter