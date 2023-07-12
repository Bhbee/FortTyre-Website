import nodemailer, { Transporter } from 'nodemailer';
import { SentMessageInfo } from 'nodemailer';


class MailHandler {
  private transporter: Transporter;

  constructor() {
    // Create a transporter using your SMTP configuration
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "samuelchristiana38@gmail.com",
        pass: "lfdeltnqsdtoqbrc"
      },
    });
  }

  sendEmail(to: string, subject: string, html: string, callback: (error: Error | null, info: SentMessageInfo | null) => void): void {
    // Define the email options
    const mailOptions = {
      from: process.env.nodemailerMail,
      to: to,
      subject: subject,
      html: html,
    };

    // Send the email
    this.transporter.sendMail(mailOptions, (error:any, info:any) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, info);
      }
    });
  }
}

export default MailHandler;
