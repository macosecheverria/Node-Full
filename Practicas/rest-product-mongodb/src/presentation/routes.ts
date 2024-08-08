import { Router } from "express";
import { ProductRoute } from "./product/route";

export class Routes {

    static get routes():Router {
        const router = Router();

        router.use("/api/products/", ProductRoute.routes);

        return router;
    }
}