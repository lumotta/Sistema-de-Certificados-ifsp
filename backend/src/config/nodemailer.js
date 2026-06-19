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

async function mailOptions(email, codigo) {
    return{
    from: process.env.DB_EMAIL,
    to: email,
    subject:'test',
    text: codigo
    }
}


async function enviarEmail(config) {
  try {
    const info = await transporter.sendMail(config);
    console.log('E-mail enviado!', info.messageId);
    // info.messageId → ID único gerado pelo servidor SMTP
    // info.response  → resposta raw do servidor (ex: "250 OK")
  } catch (erro) {
    console.error('Erro ao enviar:', erro);
  }
}

module.exports= {enviarEmail, mailOptions}