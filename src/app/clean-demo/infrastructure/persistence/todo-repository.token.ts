import { InjectionToken } from '@angular/core';
import { TodoRepository } from '../../domain/repositories/todo-repository';

// InjectionToken מאפשר להחליף מימושי Repository בלי לשנות את שכבות Domain/Application
export const TODO_REPOSITORY = new InjectionToken<TodoRepository>('TODO_REPOSITORY');
