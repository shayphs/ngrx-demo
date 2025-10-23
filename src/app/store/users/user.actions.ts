import { createAction, props } from '@ngrx/store';
import { User } from '@models/user-order.model';

export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: User[] }>());
export const selectUser = createAction('[User] Select User', props<{ userId: number }>());
export const addOrUpdateUser = createAction('[User] Add Or Update User', props<{ user: User }>());
export const deleteUser = createAction('[User] Delete User', props<{ userId: number }>());