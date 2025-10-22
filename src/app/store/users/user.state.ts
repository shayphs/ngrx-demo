import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { User } from '@models/user-order.model';

export interface UserState extends EntityState<User> {
  selectedUserId: number | null;
}

export const userAdapter = createEntityAdapter<User>();

export const mockUsers: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

export const initialUserState: UserState = userAdapter.getInitialState({
  selectedUserId: 1,
});
