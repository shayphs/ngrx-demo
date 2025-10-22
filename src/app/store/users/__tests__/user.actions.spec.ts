import * as UserActions from '../user.actions';
import { User } from '@models/user-order.model';

describe('User Actions', () => {
  it('should create loadUsers action', () => {
    const action = UserActions.loadUsers();
    expect(action.type).toBe('[User] Load Users');
  });

  it('should create loadUsersSuccess action with users payload', () => {
    const users: User[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    const action = UserActions.loadUsersSuccess({ users });
    expect(action.type).toBe('[User] Load Users Success');
    expect(action.users).toEqual(users);
  });

  it('should create selectUser action with userId payload', () => {
    const action = UserActions.selectUser({ userId: 5 });
    expect(action.type).toBe('[User] Select User');
    expect(action.userId).toBe(5);
  });
});
