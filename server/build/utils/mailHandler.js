"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class MailHandler {
    constructor() {
        // Create a transporter using your SMTP configuration
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: "samuelchristiana38@gmail.com",
                pass: "lfdeltnqsdtoqbrc"
            },
        });
    }
    sendEmail(to, subject, html, callback) {
        // Define the email options
        const mailOptions = {
            from: process.env.nodemailerMail,
            to: to,
            subject: subject,
            html: html,
        };
        // Send the email
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                callback(error, null);
            }
            else {
                callback(null, info);
            }
        });
    }
}
exports.default = MailHandler;
