import { Router } from "express";

export class Routes {

    static get routes():Router {
        const router = Router();

        router.use("/");

        return router;
    }
}