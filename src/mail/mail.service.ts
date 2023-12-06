// src/mail/mail.service.ts

import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmationEmail(userEmail: string): Promise<void> {
    await this.mailerService.sendMail({
      to: userEmail,
      subject: 'Confirmation Email',
      //   template: 'confirmation', // 파일명에 맞게 설정
      text: 'hi',
    });
  }
}
