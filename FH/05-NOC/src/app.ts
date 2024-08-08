//import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugins";
import { MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  // const prisma = new PrismaClient();
  // // const newLog = await prisma.logModel.create({
  // //   data: {
  // //     level: "HIGH",
  // //     message: "Test message",
  // //     origin: "App.ts"
  // //   }
  // // })

  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: "HIGH"
  //   }
  // });
  // console.log(logs);

  /*const newLog = await LogModel.create({
      message: "Test message desde mongo",
      origin: "app.ts",
      level: "low",
    })

    await newLog.save();

    console.log(newLog);*/
  Server.start();
}
