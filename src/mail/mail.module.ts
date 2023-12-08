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
      // defaults: {
      //   from: '"No Reply" <noreply@example.com>',
      // },
      // template: {
      //   dir: __dirname + '/templates',
      //   adapter: new HandlebarsAdapter(),
      //   options: {
      //     strict: true,
      //   },
      // },
    }),
  ],
})
export class MailModule {}
