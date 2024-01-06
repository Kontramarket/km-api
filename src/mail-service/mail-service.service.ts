import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailServiceService {
  constructor(private readonly mailerService: MailerService) {}

  passwordResetCMS(email: string, name: string, url: string): void {
    this.send(email, 'Password Reset - KM Corporate', 'passwordResetCMS', {
      username: name,
      resetLink: url,
    });
  }

  private async send(
    to: string,
    subject: string,
    template: string,
    templateData: object,
  ): Promise<void> {
    await this.mailerService
      .sendMail({
        to,
        from: 'no-reply@kontramarket.com',
        subject,
        template, // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
        context: templateData,
      })
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
  }
}
