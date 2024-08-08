import { UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";
import { TodoRepository } from "../repositories/todo.repository";

interface UpdateTodoUseCase {
    execute(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;
} 

export class UpdateTodo implements UpdateTodoUseCase{
    constructor(private readonly todoRepository: TodoRepository){}
    
    execute(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.todoRepository.update(id, updateTodoDto);
    }

}