import { Router } from "express";
import { ProductRoutes } from "./product";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir las rutas
    router.use('/api/auth', ProductRoutes.routes);

    return router;
  }
}
