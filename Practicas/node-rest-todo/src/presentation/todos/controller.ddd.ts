import { Request, Response } from "express";
import { CreateTodoDto, TodoRepository, UpdateTodoDto } from "../../domain";

export class TodoController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    const createdTodo = await this.todoRepository.create(createTodoDto!);

    return res.json(createdTodo);
  };

  public getAllTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.findAll();

    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if(isNaN(id)){
      return res.json(400).json({error: "ID must be a number"})
    }

    const todo = await this.todoRepository.findById(id);

    if(!todo){
      return res.status(404).json({error: "Id not found"});
    }

    return res.status(200).json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const [error, updateTodoDto] = UpdateTodoDto.update(req.body);
    const id = +req.params.id;

    if (error) {
      return res.status(400).json({ error });
    }

    if(isNaN(id)){
      return res.status(400).json({error: "ID must be a number"})
    }

    const todo = await this.todoRepository.update(id, updateTodoDto!);

    return res.status(200).json(todo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const deletedTodo = await this.todoRepository.delete(id);

    return res.status(200).json(deletedTodo);
  };
}
