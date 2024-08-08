import { envs } from "./config/envs";
import { MongooseDatabase } from "./data/mongo/mongo-database";
import { Routes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
    main();
})();

async function main(){

    await MongooseDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })

    const server = new Server({
        port: envs.PORT,
        routes: Routes.routes
    })

    server.start();
}