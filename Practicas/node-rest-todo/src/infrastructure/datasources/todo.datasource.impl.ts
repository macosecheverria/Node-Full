import { prisma } from "../../data/postgres";
import {
  CreateTodoDto,
  TodoDatasource,
  TodoEntity,
  UpdateTodoDto,
} from "../../domain";

export class TodoDatasourceImpl implements TodoDatasource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: createTodoDto,
    });

    return TodoEntity.fromObject(todo);
  }

  async findAll(): Promise<TodoEntity[]> {
    const todo = await prisma.todo.findMany();

    return todo.map(TodoEntity.fromObject);
  }

  async findById(id: number): Promise<TodoEntity> {
    const todoId = await prisma.todo.findFirst({
      where: { id },
    });

    if (!todoId) throw `id ${todoId} not found`;

    return TodoEntity.fromObject(todoId);
  }

  async update(id:number,updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {

    const todo = await prisma.todo.update({
      where: { id },
      data: updateTodoDto.values,
    });

    return TodoEntity.fromObject(todo);
  }

  async delete(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.delete({
      where: { id },
    });

    return TodoEntity.fromObject(todo);
  }
}
