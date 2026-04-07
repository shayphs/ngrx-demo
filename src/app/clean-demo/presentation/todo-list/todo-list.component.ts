import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TodosFacade } from '../../application/todos-facade.service';
import { AddTodoUseCase } from '../../application/use-cases/add-todo.use-case';
import { LoadTodosUseCase } from '../../application/use-cases/load-todos.use-case';
import { RemoveTodoUseCase } from '../../application/use-cases/remove-todo.use-case';
import { ToggleTodoUseCase } from '../../application/use-cases/toggle-todo.use-case';
import { Todo } from '../../domain/entities/todo';
import { LocalStorageTodoRepository } from '../../infrastructure/persistence/local-storage-todo.repository';
import { TODO_REPOSITORY } from '../../infrastructure/persistence/todo-repository.token';

// שכבת Presentation: רכיב UI שמדבר רק עם ה-Facade (ולא ישירות עם Use Cases)
@Component({
  selector: 'app-clean-todo-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    // Providers של שכבות Infrastructure + Application ברמת ה-Feature
    LocalStorageTodoRepository,
    { provide: TODO_REPOSITORY, useExisting: LocalStorageTodoRepository },
    LoadTodosUseCase,
    AddTodoUseCase,
    ToggleTodoUseCase,
    RemoveTodoUseCase,
    TodosFacade,
  ],
})
export class TodoListComponent implements OnInit {
  // חשיפת הזרם של המשימות לתצוגה (מאותחל בבנאי כדי לא להשתמש לפני הזרקה)
  readonly todos$: Observable<Todo[]>;

  // שליטה בטופס בצורה דקלרטיבית
  readonly titleControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  constructor(private readonly facade: TodosFacade) {
    this.todos$ = this.facade.todos$;
  }

  async ngOnInit(): Promise<void> {
    await this.facade.init();
  }

  async addTodo(): Promise<void> {
    if (this.titleControl.invalid || this.titleControl.value.trim().length === 0) {
      this.titleControl.markAsTouched();
      return;
    }

    await this.facade.add(this.titleControl.value);
    this.titleControl.reset('');
  }

  async toggleTodo(todo: Todo): Promise<void> {
    await this.facade.toggle(todo.id);
  }

  async removeTodo(todo: Todo): Promise<void> {
    await this.facade.remove(todo.id);
  }

  trackById(_: number, todo: Todo): string {
    return todo.id;
  }
}
