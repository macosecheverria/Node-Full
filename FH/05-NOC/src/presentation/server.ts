//import { CheckServices } from "../domain/use-cases/checks/check-services";
// import { CheckServices } from "../domain/use-cases/checks/check-services";
// import { EmailService } from "./email/email-services";
// import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
//import { LogSeverityLevel } from "../domain/entities/log-entity";
//import { CronService } from "./cron/cron-service";
// import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasouce";
// import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
// import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
// import { PostgresLogDatasource } from "../infrastructure/datasources/postgre-log.datasource";
// import { CheckServicesMultiple } from "../domain/use-cases/checks/check-services-multiple";

// const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());

// const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());

// const postgresLogRepository = new LogRepositoryImpl(
//   new PostgresLogDatasource()
// );

//const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("Server started...");

    // new SendEmailLogs(emailService, LogRepository).execute([
    //   "alejandrodarkescobar@gmail.com",
    //   "marcosdarkecheverria1277@gmail.com",
    // ]);

    //emailService.sendEmailwithFileSystemLogs(
    //["alejandrodarkescobar@gmail.com", "marcosdarkecheverria1277@gmail.com"]
    //)

    // const logs = await LogRepository.getLogs(LogSeverityLevel.high);
    // console.log(logs);

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://google.com";

    //   new CheckServicesMultiple(
    //     [fsLogRepository, mongoLogRepository, postgresLogRepository],
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(`${url}`);
    // });
  }
}
