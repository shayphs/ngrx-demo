import { Inject, Injectable } from '@angular/core';
import { TodoRepository } from '../../domain/repositories/todo-repository';
import { TODO_REPOSITORY } from '../../infrastructure/persistence/todo-repository.token';
import { Todo } from '../../domain/entities/todo';

// שכבת Application: טעינת נתונים מה-Repository
@Injectable()
export class LoadTodosUseCase {
  constructor(@Inject(TODO_REPOSITORY) private readonly repo: TodoRepository) {}

  async execute(): Promise<Todo[]> {
    return this.repo.load();
  }
}
