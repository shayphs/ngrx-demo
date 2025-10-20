import { createReducer, on } from '@ngrx/store';
import { User, UserState } from '../models/user.model';
import { loadUsers, loadUsersFailure, loadUsersSuccess } from './user.actions';

export const initialUserState: UserState = {
  entities: {},
  selectedUserId: null
};

export const userReducer = createReducer(
  initialUserState,
  on(loadUsers, state => ({ ...state })), // אין loading
  on(loadUsersSuccess, (state, { users }) => {
    const entities = users.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {} as { [id: string]: User });
    return { ...state, entities };
  }),
  on(loadUsersFailure, (state) => ({ ...state })) // פשוט מחזיר את ה-state
);
