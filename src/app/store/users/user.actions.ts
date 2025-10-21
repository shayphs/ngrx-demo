import { createAction, props } from '@ngrx/store';
import { User } from '../../models/models';

// אקשנים לניהול משתמשים
export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: User[] }>());
export const selectUser = createAction('[User] Select User', props<{ userId: number }>());
