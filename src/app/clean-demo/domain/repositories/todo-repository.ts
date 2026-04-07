import { Todo } from '../entities/todo';

// שכבת Domain: חוזה מופשט לגישה לנתונים (מימוש יגיע בשכבת Infrastructure)
export interface TodoRepository {
  load(): Promise<Todo[]>;
  save(todos: Todo[]): Promise<void>;
}
