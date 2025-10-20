import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

// פעולה לשליחת בקשה לטעינת המשתמשים
export const loadUsers = createAction('[User] Load Users');

// פעולה שמופעלת כאשר המשתמשים הוטענו בהצלחה
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);

// פעולה במקרה של שגיאה (לא חובה, אבל טוב להשאיר)
export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);
