import { Injectable } from '@angular/core';
import { of, Observable, delay } from 'rxjs';
import { User } from '../models/models';
import { mockUsers } from '../store/users/user.state';

@Injectable({ providedIn: 'root' })
export class UserService {
  getUsers(): Observable<User[]> {
    return of(mockUsers).pipe(
      delay(2000)
    );
  }
}
