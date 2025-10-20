// user.effects.ts (עם הקוד הפעיל)

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import { loadUsers, loadUsersSuccess, loadUsersFailure } from './user.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  
  // 1. נדאג שהקונסטרוקטור הוא ראשון
  constructor(
    private actions$: Actions, 
    private userService: UserService
  ) {}

  // 2. נדאג שהאפקט מחזיר Observable תקין 
  loadUsers$ = createEffect(() => {
    // השורה הזו היא שורה 12 אם השארת את ה-console.log
    return this.actions$.pipe( 
      ofType(loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe( // 👈 זה הקריאה לשירות שהגדרנו
          map(users => loadUsersSuccess({ users })),
          catchError(error => of(loadUsersFailure({ error })))
        )
      )
    )
  });
}