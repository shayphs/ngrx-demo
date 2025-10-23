import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userAdapter, UserState } from './user.state';
import { AppState } from '../app.state';

export const selectUserState = createFeatureSelector<UserState>('users');

const { selectAll } = userAdapter.getSelectors(selectUserState);
export const selectAllUsers = selectAll;

export const selectSelectedUserId = createSelector(
  selectUserState,
  state => state.selectedUserId
);

export const selectSelectedUser = createSelector(
  selectAllUsers,
  selectSelectedUserId,
  (users, selectedId) => users.find(u => u.id === selectedId) || null
);

export const selectOrdersState = (state: AppState) => state.orders.entities;

export const selectOrdersOfSelectedUser = createSelector(
  selectSelectedUserId,
  selectOrdersState,
  (selectedId, orders) =>
    selectedId && orders
      ? Object.values(orders).filter(o => o.userId === selectedId)
      : []
);

export const selectUserWithOrdersTotal = createSelector(
  selectSelectedUser,
  selectOrdersOfSelectedUser,
  (user, orders) =>
    user
      ? {
        id: user.id,
        name: user.name,
        total: orders.reduce((acc, o) => acc + o.total, 0),
      }
      : null
);
