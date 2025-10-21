import { createReducer, on } from '@ngrx/store';
import { userAdapter, initialUserState } from './user.state';
import * as UserActions from './user.actions';

export const userReducer = createReducer(
  initialUserState,

  // העלאת משתמשים משרת
  on(UserActions.loadUsersSuccess, (state, { users }) =>
    userAdapter.upsertMany(users, state) // upsertMany מעדכן משתמשים קיימים ומוסיף חדשים
  ),

  // שינוי המשתמש הנבחר
  on(UserActions.selectUser, (state, { userId }) => ({
    ...state,
    selectedUserId: userId
  }))
);
