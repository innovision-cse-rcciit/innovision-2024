import nodemailer from 'nodemailer';
import path from 'path';
import * as fs from 'fs';
import * as ejs from 'ejs';

interface EmailContent {
  to: string;
  subject: string;
  // text: string;
  fileName: string;
  data: {};
}

export async function sendMail({ to, subject, fileName, data }: EmailContent) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: process.env.MAIL_HOST,
      // port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const templatePath = path.join(process.cwd(), 'public', 'mails', fileName);
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template file not found: ${templatePath}`);
    }

    const html: string = await ejs.renderFile(templatePath, data);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent: ' + info.response);

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}
