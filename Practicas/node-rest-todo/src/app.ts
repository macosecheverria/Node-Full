import { envs } from "./config";
import { Routes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
    main()
})();

function main(){
    const server = new Server({
        port: envs.PORT,
        routes : Routes.routes,
        publicPath: envs.PUBLIC_PATH
    });

    server.start();
}