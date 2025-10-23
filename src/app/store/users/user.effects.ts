import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UserService } from '../../services/user.service';
import * as UserActions from './user.actions';
import { switchMap, map, distinctUntilChanged, filter } from 'rxjs/operators';
import { selectSelectedUserId } from './user.selectors';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private store = inject(Store);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map(users => UserActions.loadUsersSuccess({ users }))
        )
      )
    )
  );

  loadSelectedUserDetails$ = createEffect(() =>
    this.store.select(selectSelectedUserId).pipe(
      filter(id => !!id),
      distinctUntilChanged(),
      switchMap(id =>
        this.userService.getUserDetails(id!).pipe(
          map(user => UserActions.addOrUpdateUser({ user }))
        )
      )
    )
  );
}
