// src/mail/mail.service.ts

import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
// const coolsms = require('coolsms-node-sdk').default;
// const messageService = new coolsms(
//   'NCSRUPIQMOWMEZAO',
//   'PYVSHEMIXPHRW66YRBLEA54LSQMCXSXM',
// );

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendAuthEmail(userEmail: string, text: string): Promise<void> {
    await this.mailerService.sendMail({
      to: userEmail,
      subject: 'Confirmation Email',
      //   template: 'confirmation', // 파일명에 맞게 설정
      text: text,
    });
  }

  // async sendAuthSMS(receiver: string, code: string) {
  //   try {
  //     messageService.sendOne({
  //       to: receiver,
  //       from: '01090417421',
  //       text: `${code} 를 입력해주세요.`,
  //     });
  //     //   .then((res) => console.log(res));
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // }
}
