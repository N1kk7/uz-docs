// import { sendEmail } from "../utils/SendEmail.js";

// export default defineEventHandler(async (event) => {
//   const body = await readBody(event);
//   const config = useRuntimeConfig();

// //   const recaptchaRes = await $fetch(
// //     "https://www.google.com/recaptcha/api/siteverify",
// //     {
// //       method: "POST",
// //       body: new URLSearchParams({
// //         secret: config.recaptchaSecretKey,
// //         response: body.recaptchaToken,
// //       }),
// //     }
// //   );

// //   if (!recaptchaRes.success) {
// //     throw createError({ statusCode: 400, statusMessage: "Invalid reCAPTCHA" });
// //   }
//   const info = await sendEmail({
//     to: config.MAILERSEND_TO_EMAIL,
//     subject: "New message from client",
//     html: `
//       <p><strong>Name:</strong> ${body.name}</p>
//       <p><strong>Email:</strong> ${body.email}</p>
//       <p><strong>Message:</strong> ${body.message}</p>
//     `,
//   });

//   return {
//     success: true,
//     messageId: info.messageId,
//   };
// });

// import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

import { Resend } from "resend";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // console.log(event, body)
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return {
      success: false,
      status: 400,
      message: "Missing required fields",
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const recipients = process.env.MAIL_TO.split(",").map((email) =>
    email.trim(),
  );

  try {
    await resend.emails.send({
      from: `"${name} from Website" <no-reply@hr-b24.com>`,
      to: recipients,
      subject: "New message from hr-b24.com",
      // text: `Name: ${name}\n <br/> Email: ${email.toLowerCase()}\n <br/>Message: ${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2C2C2C;">New Message from Website</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold;">Name:</td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Email:</td>
              <td style="padding: 8px;">${email.toLowerCase()}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Message:</td>
              <td style="padding: 8px;">${message.replace(/\n/g, "<br/>")}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
            This email was sent from contact form.
          </p>
        </div>
      `,
    });

    return {
      success: true,
      status: 200,
      message: "Email sent successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      status: 500,
      message: "Failed to send email",
    };
  }
});
