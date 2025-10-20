import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../models/user.model';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  state => Object.values(state.entities)
);

export const selectSelectedUser = createSelector(
  selectUserState,
  state => (state.selectedUserId !== null ? state.entities[state.selectedUserId] : null)
);
