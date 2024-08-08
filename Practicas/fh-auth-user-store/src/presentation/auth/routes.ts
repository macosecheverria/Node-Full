import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth.service";

export class AuthRoute {
  static get routes(): Router {
    const router = Router();
    const controller = new AuthController(new AuthService());

    router.post("/register", controller.registerUser);
    router.post("/login", controller.loginUser);
    router.get("/users", controller.findAll);
    router.get("/users/:id", controller.findById);
    router.put("/users/:id", controller.update);
    router.delete("/users/:id", controller.remove);

    return router;
  }
}
