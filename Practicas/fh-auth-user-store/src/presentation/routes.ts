import { Router } from "express";
import { AuthRoute } from "./auth";
import { CategoryRoute } from "./category";

export class Routes {

    static get routes():Router {
        const router = Router();

        router.use("/api/auth", AuthRoute.routes);
        router.use("/api/categories", CategoryRoute.routes);

        return router;
    }
}