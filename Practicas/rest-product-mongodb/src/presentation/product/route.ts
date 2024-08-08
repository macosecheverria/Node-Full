import { Router } from "express";
import { ProductController } from "./controller";
import { ProductService } from "../services/product.service";

export class ProductRoute {
    static get routes(): Router {
        const router = Router();
        const service = new ProductService();
        const controller = new ProductController(service);

        router.post("",controller.create);
        router.get("",controller.findAll);
        router.get("/:id", controller.findById);
        router.put("/:id", controller.update);
        router.delete("/:id", controller.remove);
        return router;
    }
}