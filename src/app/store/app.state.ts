import { UserState } from './users/user.state';
import { Order } from '../models/models';

export interface AppState {
  users: UserState;
  orders: {
    entities: { [id: string]: Order };
  };
}
