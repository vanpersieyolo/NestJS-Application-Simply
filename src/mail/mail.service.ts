import { WinstonLogger } from './../logger/winston.logger';
import { UserInfo } from './../common/user-info';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly logger: WinstonLogger,
  ) {}

  async sendUserConfirmation(user: UserInfo, url?: string) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Thanks for ordering',
        template: './confirmation', // `.hbs`
        context: {
          name: user.email,
          url: url ?? '',
        },
      });
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`, 'Send email error');
    }
  }
}
