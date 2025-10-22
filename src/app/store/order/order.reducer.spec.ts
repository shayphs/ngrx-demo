import { ordersReducer } from './order.reducer';
import { initialOrders } from '../app.state';
import { Action } from '@ngrx/store';

describe('Orders Reducer', () => {
  it('should return the initial state by default', () => {
    const unknownAction: Action = { type: 'Unknown' };
    const state = ordersReducer(undefined, unknownAction);
    expect(state).toBe(initialOrders);
  });

  it('should return the same state for unknown action', () => {
    const previousState = { ...initialOrders };
    const unknownAction: Action = { type: 'SomeRandomAction' };
    const state = ordersReducer(previousState, unknownAction);
    expect(state).toBe(previousState);
  });
});
