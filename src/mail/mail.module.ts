// import { Module } from '@nestjs/common';

// @Module({})
// export class MailModule {}

import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'ioscalccalie@gmail.com',
          pass: 'gtxurzltgdrspzwu',
        },
      },
    }),
  ],
})
export class MailModule {}
