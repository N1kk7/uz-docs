import nodemailer from 'nodemailer'

export async function sendEmail({ to, subject, html, from }) {
    const config = useRuntimeConfig();
    const port = config.SMTP_PORT || 2525;
  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: port,
    secure: false, 
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
  })

  const mailOptions = {
    from: config.MAILERSEND_FROM_EMAIL,
    to,
    subject,
    html,
  }

  const info = await transporter.sendMail(mailOptions)
  return info
}
