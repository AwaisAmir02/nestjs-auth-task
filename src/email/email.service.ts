import { Injectable, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService implements OnModuleInit {
  private transporter: nodemailer.Transporter;

  async onModuleInit() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const success = await this.transporter.verify();
    console.log(success ? 'SMTP is ready' : 'SMTP failed');
  }

  async sendVerificationEmail(email: string, token: string) {
    const url = `${process.env.FRONTEND_URL}/auth/verify-email?token=${token}`;

    await this.transporter.sendMail({
      to: email,
      from: `"Auth System" <${process.env.EMAIL_USER}>`,
      subject: 'Verify your email',
      html: `<p>Please verify your email:</p><a href="${url}">${url}</a>`,
    });

    console.log(`Verification email sent to ${email}`);
  }

  async sendResetPasswordEmail(email: string, token: string) {
    const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;

    await this.transporter.sendMail({
      to: email,
      from: `"Auth System" <${process.env.EMAIL_USER}>`,
      subject: 'Reset your password',
      html: `<p>Reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
    });

    console.log(`Reset email sent to ${email}`);
  }
}