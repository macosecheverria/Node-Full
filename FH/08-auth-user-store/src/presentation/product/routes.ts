import { Router } from "express";
import { ProductController } from "./controller";
import { ProductService } from "../services";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    const service = new ProductService();
    const controller = new ProductController(service);

    router.post("/",[
        AuthMiddleware.validateJwt
    ], controller.createProduct);
    router.get("/", controller.getProducts);

    return router;
  }
}
