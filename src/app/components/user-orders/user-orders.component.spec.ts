import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserOrdersComponent } from './user-orders.component';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import * as UserActions from '../../store/users/user.actions';
import { selectAllUsers, selectUserWithOrdersTotal } from '../../store/users/user.selectors';

describe('UserOrdersComponent', () => {
  let component: UserOrdersComponent;
  let fixture: ComponentFixture<UserOrdersComponent>;
  let store: jasmine.SpyObj<Store<any>>;

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    await TestBed.configureTestingModule({
      declarations: [UserOrdersComponent],
      providers: [{ provide: Store, useValue: storeSpy }],
    }).compileComponents();

    store = TestBed.inject(Store) as jasmine.SpyObj<Store<any>>;
    // מחרוזות סלקטורים מדומות
    store.select.and.callFake((selector: any) => {
      if (selector === selectUserWithOrdersTotal) {
        return of({ id: 1, name: 'Shay', total: 100 });
      }
      if (selector === selectAllUsers) {
        return of([{ id: 1, name: 'Shay' }]);
      }
      return of(null);
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadUsers on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(UserActions.loadUsers());
  });

  it('should set user$ from selectUserWithOrdersTotal', (done) => {
    component.user$.subscribe((user) => {
      expect(user).toEqual({ id: 1, name: 'Shay', total: 100 });
      done();
    });
  });

  it('should set allUsers$ from selectAllUsers', (done) => {
    component.allUsers$.subscribe((users) => {
      expect(users).toEqual([{ id: 1, name: 'Shay' }]);
      done();
    });
  });

  it('should dispatch selectUser action when selectUser is called', () => {
    component.selectUser(2);
    expect(store.dispatch).toHaveBeenCalledWith(
      UserActions.selectUser({ userId: 2 })
    );
  });
});
