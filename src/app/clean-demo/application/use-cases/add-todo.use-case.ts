import { Inject, Injectable } from '@angular/core';
import { Todo } from '../../domain/entities/todo';
import { TodoRepository } from '../../domain/repositories/todo-repository';
import { TODO_REPOSITORY } from '../../infrastructure/persistence/todo-repository.token';

// שכבת Application: מימוש מקרי שימוש (Use Case) שמנהל שינויי מצב
@Injectable()
export class AddTodoUseCase {
  constructor(@Inject(TODO_REPOSITORY) private readonly repo: TodoRepository) {}

  async execute(current: Todo[], title: string): Promise<Todo[]> {
    const trimmed = title.trim();
    if (!trimmed) {
      return current;
    }

    const next: Todo[] = [
      ...current,
      {
        id: this.createId(),
        title: trimmed,
        completed: false,
      },
    ];

    await this.repo.save(next);
    return next;
  }

  // מזהה ייחודי בלי תלות בספריה חיצונית
  private createId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}
