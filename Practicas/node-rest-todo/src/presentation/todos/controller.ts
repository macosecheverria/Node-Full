import { Request, Response } from "express";
import { CreateTodoDto, TodoRepository, UpdateTodoDto } from "../../domain";
import {
  CreateTodo,
  DeleteTodo,
  GetTodo,
  GetTodos,
  UpdateTodo,
} from "../../domain/use-cases";

export class TodoController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    return new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public getAllTodos = (req: Request, res: Response) => {
    return new GetTodos(this.todoRepository)
      .execute()
      .then((todo) => res.json(todo));
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      return res.json(400).json({ error: "ID must be a number" });
    }

    return new GetTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public updateTodo =  (req: Request, res: Response) => {
    const [error, updateTodoDto] = UpdateTodoDto.update(req.body);
    const id = +req.params.id;

    if (error) {
      return res.status(400).json({ error });
    }

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID must be a number" });
    }

    return new UpdateTodo(this.todoRepository)
      .execute(id, updateTodoDto!)
      .then((todo) => res.json(todo))
      .catch((err) => res.status(400).json({ error }));
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    return new DeleteTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((err) => res.status(400).json(err));
  };
}
