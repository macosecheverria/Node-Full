import { Router } from "express";
import { TodoController } from "./controller";
import { TodoRepositorioImpl } from "../../infrastructure/repositories/todo.repositorio.impl";
import { TodoDatasourceImpl } from "../../infrastructure/datasources/todo.datasource.impl";

export class TodoRoutes {
  static get routes() {
    const router = Router();
    const todoDatasource = new TodoDatasourceImpl();
    const todoRepository = new TodoRepositorioImpl(todoDatasource)
    const todoController = new TodoController(todoRepository);

    router.post("/", todoController.createTodo);
    router.get("/", todoController.getAllTodos);
    router.get("/:id", todoController.getTodoById);
    router.put("/:id", todoController.updateTodo);
    router.delete("/:id", todoController.deleteTodo);

    return router;
  }
}
