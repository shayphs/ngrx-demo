import { Injectable } from '@angular/core';
import { of, Observable, delay } from 'rxjs';
import { User } from '../models/models';
import { mockUsers } from '../store/users/user.state';

@Injectable({ providedIn: 'root' })
export class UserService {
  getUsers(): Observable<User[]> {
    // מחזיר את ה־mock users כאילו הגיעו מהשרת
    return of(mockUsers).pipe(
      delay(2000) // מעכב ב-2 שניות
    );
  }
}
