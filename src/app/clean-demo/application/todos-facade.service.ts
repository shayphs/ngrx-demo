import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../domain/entities/todo';
import { AddTodoUseCase } from './use-cases/add-todo.use-case';
import { LoadTodosUseCase } from './use-cases/load-todos.use-case';
import { RemoveTodoUseCase } from './use-cases/remove-todo.use-case';
import { ToggleTodoUseCase } from './use-cases/toggle-todo.use-case';

// שכבת Application: Facade שמסתירה את ה-Use Cases מה-UI
@Injectable()
export class TodosFacade {
  private readonly todosSubject = new BehaviorSubject<Todo[]>([]);
  readonly todos$: Observable<Todo[]> = this.todosSubject.asObservable();

  constructor(
    private readonly loadTodos: LoadTodosUseCase,
    private readonly addTodo: AddTodoUseCase,
    private readonly toggleTodo: ToggleTodoUseCase,
    private readonly removeTodo: RemoveTodoUseCase
  ) {}

  async init(): Promise<void> {
    const todos = await this.loadTodos.execute();
    this.todosSubject.next(todos);
  }

  async add(title: string): Promise<void> {
    const next = await this.addTodo.execute(this.todosSubject.value, title);
    this.todosSubject.next(next);
  }

  async toggle(id: string): Promise<void> {
    const next = await this.toggleTodo.execute(this.todosSubject.value, id);
    this.todosSubject.next(next);
  }

  async remove(id: string): Promise<void> {
    const next = await this.removeTodo.execute(this.todosSubject.value, id);
    this.todosSubject.next(next);
  }
}
