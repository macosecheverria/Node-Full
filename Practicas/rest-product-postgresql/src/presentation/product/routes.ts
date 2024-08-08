import { Router } from "express";
import { ProductController } from ".";
import { ProductServiceImpl } from "../services";

export class ProductRoutes {
  static routes(): Router {
    const router = Router();
    const service = new ProductServiceImpl();
    const controller = new ProductController(service);
  
    router.post(" ", controller.create);
    router.get(" ", (req, res) => controller.findAll(req,res));
    router.get("/:id", controller.findById);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.remove);

    router.get("/hola", (req, res )=> {
      res.json({message: "Hola que tall"});
    })

    return router;
  }
}
