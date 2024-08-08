import { Router } from "express";
import { ProductController } from "./controller";
import { ProductService } from "../services/product.service";

export class ProductRoutes {
    static get routes():Router {

        const router = Router();
        const controller = new ProductController(new ProductService());

        router.post("/", controller.create);
        router.get("/", controller.findAll);
        router.get("/:id", controller.findById);
        router.put("/:id", controller.update);
        router.delete("/:id", controller.remove);

        return router;
    }
}