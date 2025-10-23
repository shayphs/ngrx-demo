import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { UserEffects } from '../user.effects';
import * as UserActions from '../user.actions';
import { UserService } from '../../../services/user.service';
import { hot, cold } from 'jasmine-marbles';
import { User } from '@models/user-order.model';
import { provideMockStore } from '@ngrx/store/testing';

describe('UserEffects', () => {
  let actions$: Observable<any>;
  let effects: UserEffects;
  let userService: jasmine.SpyObj<UserService>;

  const initialState = {
    users: [],
    selectedUserId: null
  };

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UserService', ['getUsers', 'getUserDetails']);

    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        { provide: UserService, useValue: spy },
      ],
    });

    effects = TestBed.inject(UserEffects);

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should dispatch loadUsersSuccess when loadUsers is triggered', () => {
    const users: User[] = [{ id: 1, name: 'Alice' }];
    userService.getUsers.and.returnValue(of(users));

    actions$ = hot('-a-', { a: UserActions.loadUsers() });
    const expected = cold('-b-', { b: UserActions.loadUsersSuccess({ users }) });

    expect(effects.loadUsers$).toBeObservable(expected);
  });
});
