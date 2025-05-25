import nodemailer from "nodemailer";
import {
  MAIL_PASS,
  MAIL_USER,
  MAIL_SERVER,
} from "../config/envConfig.config.js";
import { isEmail } from "../utils/validators.utils.js";

const transporter = nodemailer.createTransport({
  host: MAIL_SERVER,
  port: 587,
  secure: false,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

export async function sendEmailHtml(to, subject, html) {
  try {
    if (isEmail(to)) {
      await transporter.sendMail({
        from: MAIL_USER,
        to,
        subject: subject,
        html: html,
      });
      return {
        next: true,
        message: "Correo enviado con éxito",
      };
    } else {
      return {
        next: false,
        message: "Correo invalido",
      };
    }
  } catch (error) {
    console.error("sendEmailHtml=>", error);
    return {
      next: false,
      message: "Error interno",
    };
  }
}
