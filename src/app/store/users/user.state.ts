import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { User } from '../../models/models';

export interface UserState extends EntityState<User> {
  selectedUserId: number | null;
}

// יצירת Adapter
export const userAdapter = createEntityAdapter<User>();

// Mock users
export const mockUsers: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

// Initial state
export const initialUserState: UserState = userAdapter.getInitialState({
  selectedUserId: 1,
});
