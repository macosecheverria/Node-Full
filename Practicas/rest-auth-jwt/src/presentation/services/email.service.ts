import nodemailer, { Transporter } from "nodemailer";

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachments[];
}

interface Attachments {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter: Transporter;

  constructor(
    public readonly mailerService: string,
    public readonly mailerEmail: string,
    public readonly senderEmailPassword: string,
    private readonly postToProvider: boolean
  ) {
    this.transporter = nodemailer.createTransport({
      service: mailerService,
      auth: {
        user: mailerEmail,
        pass: senderEmailPassword,
      },
    });
  }

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments } = options;

    try {
      if (!this.postToProvider) return true;

      const sendInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments,
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}
