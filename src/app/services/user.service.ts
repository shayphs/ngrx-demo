import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../models/models';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];

  getUsers(): Observable<User[]> {
    return of(this.users).pipe(delay(500)); // סימולציה של קריאה לשרת
  }
}
