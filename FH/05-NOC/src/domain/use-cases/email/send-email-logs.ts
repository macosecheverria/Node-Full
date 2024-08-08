import { EmailService } from "../../../presentation/email/email-services";
import { LogEntity, LogSeverityLevel } from "../../entities/log-entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUserCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUserCase {
  constructor(
    private readonly emailServices: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]) {
    try {
      const sent = await this.emailServices.sendEmailwithFileSystemLogs(to);
      if (!sent) {
        throw new Error("Email log not sent");
      }

      return true;
    } catch (error) {

      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `${error}`,
        origin: "send-email-logs.ts"
      })

      this.logRepository.saveLog(log);

      return false;
    }
  }
}
