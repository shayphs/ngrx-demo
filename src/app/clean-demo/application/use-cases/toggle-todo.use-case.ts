import { Inject, Injectable } from '@angular/core';
import { Todo } from '../../domain/entities/todo';
import { TodoRepository } from '../../domain/repositories/todo-repository';
import { TODO_REPOSITORY } from '../../infrastructure/persistence/todo-repository.token';

// שכבת Application: שינוי סטטוס של משימה
@Injectable()
export class ToggleTodoUseCase {
  constructor(@Inject(TODO_REPOSITORY) private readonly repo: TodoRepository) {}

  async execute(current: Todo[], id: string): Promise<Todo[]> {
    const next = current.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    await this.repo.save(next);
    return next;
  }
}
