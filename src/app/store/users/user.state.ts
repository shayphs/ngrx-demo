import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../../models/models';

// Entity adapter לניהול משתמשים
export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export interface UserState extends EntityState<User> {
  selectedUserId: number | null;
}

// סטייט התחלתי
export const initialUserState: UserState = userAdapter.getInitialState({
  selectedUserId: null,
});
