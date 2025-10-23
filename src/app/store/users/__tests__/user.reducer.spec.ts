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

  it('should add or update a user', () => {
    const user = { id: 3, name: 'Charlie' };
    const action = UserActions.addOrUpdateUser({ user });
    const state = userReducer(initialUserState, action);

    const entities = userAdapter.getSelectors().selectEntities(state);
    expect(entities[3]).toEqual(user);

    // עדכון אותו משתמש
    const updatedUser = { id: 3, name: 'Charles' };
    const updateAction = UserActions.addOrUpdateUser({ user: updatedUser });
    const updatedState = userReducer(state, updateAction);
    const updatedEntities = userAdapter.getSelectors().selectEntities(updatedState);
    expect(updatedEntities[3]!.name).toBe('Charles');
  });

  it('should delete a user', () => {
    const initial = userAdapter.setAll(
      [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ],
      initialUserState
    );

    const action = UserActions.deleteUser({ userId: 1 });
    const state = userReducer(initial, action);

    const entities = userAdapter.getSelectors().selectEntities(state);
    expect(Object.keys(entities).length).toBe(1);
    expect(entities[1]).toBeUndefined();
    expect(entities[2]!.name).toBe('Bob');
  });

  it('should select a user', () => {
    const action = UserActions.selectUser({ userId: 5 });
    const state = userReducer(initialUserState, action);
    expect(state.selectedUserId).toBe(5);
  });
});
