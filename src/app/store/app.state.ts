import { UserState } from './users/user.state';
import { Order } from '../models/user-order.model';

export interface AppState {
  users: UserState;
  orders: {
    entities: { [id: string]: Order };
  };
}

// Mock Orders
export const initialOrders = {
  entities: {
    1: { id: 1, userId: 1, total: 100 },
    2: { id: 2, userId: 1, total: 50 },
    3: { id: 3, userId: 2, total: 200 },
    4: { id: 4, userId: 3, total: 300 },
    5: { id: 5, userId: 3, total: 150 },
  }
};
