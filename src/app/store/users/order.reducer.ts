import { Action } from '@ngrx/store';
import { initialOrders } from '../app.state';

export function ordersReducer(state = initialOrders, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}
