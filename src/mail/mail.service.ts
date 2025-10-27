import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  async sendEmail(to: string, subject: string, content: string) {
    console.log(
      `📧 Email to: ${to}\nSubject: ${subject}\nContent: ${content}\n`,
    );
    return true;
  }
}
