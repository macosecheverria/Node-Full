import { CreateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";
import { TodoRepository } from "../repositories/todo.repository";

interface CreateTodoUserCase {
  execute(createTodoDto: CreateTodoDto): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUserCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  execute(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.todoRepository.create(createTodoDto);
  }
}
