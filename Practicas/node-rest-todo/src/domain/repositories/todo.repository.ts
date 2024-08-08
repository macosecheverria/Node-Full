import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export interface TodoRepository {
  create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;

  findAll(): Promise<TodoEntity[]>;

  findById(id: number): Promise<TodoEntity>;

  update(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;

  delete(id: number): Promise<TodoEntity>;
}
