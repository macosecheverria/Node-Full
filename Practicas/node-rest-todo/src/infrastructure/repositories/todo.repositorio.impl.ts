import {
  CreateTodoDto,
  TodoDatasource,
  TodoEntity,
  TodoRepository,
  UpdateTodoDto,
} from "../../domain";

export class TodoRepositorioImpl implements TodoRepository {
  constructor(private readonly todoDatasource: TodoDatasource) {}

  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.todoDatasource.create(createTodoDto);
  }

  findAll(): Promise<TodoEntity[]> {
    return this.todoDatasource.findAll();
  }

  findById(id: number): Promise<TodoEntity> {
    return this.todoDatasource.findById(id);
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.todoDatasource.update(id, updateTodoDto);
  }

  delete(id: number): Promise<TodoEntity> {
    return this.todoDatasource.delete(id);
  }
}
