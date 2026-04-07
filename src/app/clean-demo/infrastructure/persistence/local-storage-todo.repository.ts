import { Injectable } from '@angular/core';
import { Todo } from '../../domain/entities/todo';
import { TodoRepository } from '../../domain/repositories/todo-repository';

// שכבת Infrastructure: מימוש קונקרטי שמדבר עם LocalStorage של הדפדפן
@Injectable()
export class LocalStorageTodoRepository implements TodoRepository {
  private readonly storageKey = 'clean-demo.todos';

  async load(): Promise<Todo[]> {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw) as Todo[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      // אם יש נתונים פגומים, לא מפילים את האפליקציה
      return [];
    }
  }

  async save(todos: Todo[]): Promise<void> {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }
}
