import { userReducer } from '../user.reducer';
import { initialUserState } from '../user.state';
import * as UserActions from '../user.actions';
import { userAdapter } from '../user.state';

describe('User Reducer', () => {
  it('should return initial state by default', () => {
    const action = { type: 'Unknown' } as any;
    const state = userReducer(undefined, action);
    expect(state).toBe(initialUserState);
  });

  it('should load users successfully', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    const action = UserActions.loadUsersSuccess({ users });
    const state = userReducer(initialUserState, action);

    const allEntities = userAdapter.getSelectors().selectEntities(state);
    expect(Object.keys(allEntities).length).toBe(2);
    expect(allEntities[1]!.name).toBe('Alice');
    expect(allEntities[2]!.name).toBe('Bob');
  });

  it('should select a user', () => {
    const action = UserActions.selectUser({ userId: 5 });
    const state = userReducer(initialUserState, action);
    expect(state.selectedUserId).toBe(5);
  });
});
