import { userAdapter, initialUserState, mockUsers, UserState } from '../user.state';

describe('User State', () => {
  it('should have initial state with selectedUserId', () => {
    expect(initialUserState.selectedUserId).toBe(1);
    const allUsers = userAdapter.getSelectors().selectAll(initialUserState);
    expect(allUsers.length).toBe(0);
  });

  it('should set mock users correctly using adapter', () => {
    const state: UserState = userAdapter.setAll(mockUsers, initialUserState);
    const allUsers = userAdapter.getSelectors().selectAll(state);
    expect(allUsers.length).toBe(3);
    expect(allUsers.map(u => u.name)).toEqual(['Alice', 'Bob', 'Charlie']);
  });

  it('should keep selectedUserId when adding users', () => {
    const state: UserState = userAdapter.setAll(mockUsers, initialUserState);
    expect(state.selectedUserId).toBe(1);
  });

  it('should add a single user using addOne', () => {
    const newUser = { id: 4, name: 'Dana' };
    const newState = userAdapter.addOne(newUser, initialUserState);
    const allUsers = userAdapter.getSelectors().selectAll(newState);
    expect(allUsers.length).toBe(1);
    expect(allUsers[0].name).toBe('Dana');
  });

  it('should remove a user using removeOne', () => {
    const populated = userAdapter.setAll(mockUsers, initialUserState);
    const newState = userAdapter.removeOne(2, populated);
    const allUsers = userAdapter.getSelectors().selectAll(newState);
    expect(allUsers.map(u => u.id)).toEqual([1, 3]);
  });
});
