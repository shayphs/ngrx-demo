import { Injectable } from '@angular/core';
import { of, Observable, delay, map } from 'rxjs';
import { User } from '@models/user-order.model';
import { mockUsers } from '@store/users/user.state';

@Injectable({ providedIn: 'root' })
export class UserService {
  getUsers(): Observable<User[]> {
    return of(mockUsers).pipe(
      delay(2000)
    );
  }

  getUserDetails(id: number): Observable<User> {
    return of(mockUsers).pipe(
      delay(800),
      map(mockUsers => mockUsers.find(usr => usr.id === id)!),
    );
  }
}
