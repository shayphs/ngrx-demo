import { createReducer, on } from '@ngrx/store';
import { userAdapter, initialUserState } from './user.state';
import * as UserActions from './user.actions';

export const userReducer = createReducer(
  initialUserState,

  on(UserActions.loadUsersSuccess, (state, { users }) =>
    userAdapter.upsertMany(users, state)
  ),

  on(UserActions.addOrUpdateUser, (state, { user }) =>
    userAdapter.upsertOne(user, state)
  ),

  on(UserActions.deleteUser, (state, { userId }) =>
    userAdapter.removeOne(userId, state)
  ),

  on(UserActions.selectUser, (state, { userId }) => ({
    ...state,
    selectedUserId: userId
  }))
);
