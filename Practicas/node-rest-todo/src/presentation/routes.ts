import { Router } from "express";
import { TodoRoutes } from "./todos/routes";

export class Routes {
  static get routes(): Router {
    const router = Router();
    

    router.use("/api/todos", TodoRoutes.routes);

    return router;
  }
}
