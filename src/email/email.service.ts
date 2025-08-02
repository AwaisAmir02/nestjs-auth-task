import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  async sendVerificationEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const url = `http://localhost:3000/auth/verify-email?token=${token}`;
    await transporter.sendMail({
      to: email,
      subject: 'Verify your email',
      html: `<a href="${url}">Click here to verify</a>`,
    });
  }

  async sendResetPasswordEmail(email: string, token: string) {
    const resetUrl = `http://localhost:3000/auth/reset-password?token=${token}`;
    await this.transporter.sendMail({
      to: email,
      subject: 'Reset Your Password',
      html: `<a href="${resetUrl}">Click here to reset your password</a>`,
    });
  }
}