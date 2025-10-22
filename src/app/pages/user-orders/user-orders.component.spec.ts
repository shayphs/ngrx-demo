import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { UserOrdersComponent } from './user-orders.component';
import { User } from '@models/user-order.model';
import * as UserActions from '@store/users/user.actions';
import { of } from 'rxjs';

describe('UserOrdersComponent', () => {
  let component: UserOrdersComponent;
  let fixture: ComponentFixture<UserOrdersComponent>;
  let store: MockStore;
  const initialState = {
    users: {
      entities: {
        1: { id: 1, name: 'Alice' },
        2: { id: 2, name: 'Bob' }
      },
      selectedUserId: null
    },
    orders: { entities: {} }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserOrdersComponent],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    fixture = TestBed.createComponent(UserOrdersComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadUsers on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(UserActions.loadUsers());
  });

  it('should dispatch selectUser action when selectUser is called', () => {
    const userId = 1;
    component.selectUser(userId);
    expect(store.dispatch).toHaveBeenCalledWith(UserActions.selectUser({ userId }));
  });

  it('should have observables for user$ and allUsers$', () => {
    expect(component.user$).toBeDefined();
    expect(component.allUsers$).toBeDefined();
  });
});
