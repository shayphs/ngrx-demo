import {
  selectAllUsers,
  selectSelectedUserId,
  selectSelectedUser,
  selectOrdersOfSelectedUser,
  selectUserWithOrdersTotal,
} from '../user.selectors';
import { userAdapter, UserState } from '../user.state';
import { AppState } from '../../app.state';

describe('User Selectors', () => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  const orders = {
    1: { id: 1, userId: 1, total: 100 },
    2: { id: 2, userId: 1, total: 50 },
    3: { id: 3, userId: 2, total: 30 },
  };

  const initialState: UserState = userAdapter.setAll(users, userAdapter.getInitialState({ selectedUserId: 1 }));
  const appState: AppState = { users: initialState, orders: { entities: orders } };

  it('should select all users', () => {
    const result = selectAllUsers.projector(initialState);
    expect(result.length).toBe(2);
  });

  it('should select selected user id', () => {
    const result = selectSelectedUserId.projector(initialState);
    expect(result).toBe(1);
  });

  it('should select selected user', () => {
    const result = selectSelectedUser.projector(users, 1);
    expect(result?.name).toBe('Alice');
  });

  it('should select orders of selected user', () => {
    const result = selectOrdersOfSelectedUser.projector(1, orders);
    expect(result.length).toBe(2);
    expect(result.map(o => o.total)).toEqual([100, 50]);
  });

  it('should select user with orders total', () => {
    const result = selectUserWithOrdersTotal.projector(
      { id: 1, name: 'Alice' },
      [
        { id: 1, userId: 1, total: 100 },
        { id: 2, userId: 1, total: 50 },
      ]
    );
    expect(result).toEqual({ id: 1, name: 'Alice', total: 150 });
  });
});
