import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { User } from 'src/models/user';

export class Mailer {

    // Make service => singletonTransformation de notre service en singleton
    private static instance: Mailer;
    private smtpTrans: Mail;
    user!: User;

    private constructor() {

        // Instantiate the SMTP server
        this.smtpTrans = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Mailer();
        }
        return this.instance;
    }

    // define method to send the email
    sendEmail(subject: string, text: string, to: string, from: string) {
        const mailOpts = {
            from,
            to: process.env.EMAIL_USER,
            subject,
            text,
        };

        // use smtp to send the email
        this.smtpTrans.sendMail(mailOpts, (error, info) => {
            if (error) {
                return console.log(`error sending email: ${error}`);
            }
        });
    }

}
