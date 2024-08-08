import { Router } from "express";
import { CategoryController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CategoryService } from "../services/category.service";

export class CategoryRoute {
  static get routes(): Router {
    const router = Router();

    const controller = new CategoryController(new CategoryService());

    router.post("/", [AuthMiddleware.jwtValidated], controller.create);
    router.get("/", controller.findAll);
    router.get("/:id", controller.findById);
    router.put("/:id", [AuthMiddleware.jwtValidated], controller.update);
    router.delete("/:id", [AuthMiddleware.jwtValidated], controller.remove);

    return router;
  }
}
