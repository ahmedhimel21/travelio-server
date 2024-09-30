import nodemailer from 'nodemailer'
import config from '../config'

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // true for port 465, false for other ports
    auth: {
      user: 'ahmedhimel000@gmail.com',
      pass: 'kalq lgut pslh utjv',
    },
  })

  const info = await transporter.sendMail({
    from: 'ahmedhimel000@gmail.com',
    to,
    subject: 'Reset your password within 10 minutes', // Subject line
    text: '', // plain text body
    html,
  })
  console.log('Message sent: %s', info.messageId)
}
