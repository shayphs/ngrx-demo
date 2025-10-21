import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { loadUsers } from '../store/user.actions';
import { selectAllUsers } from '../store/user.selectors';

@Component({
  selector: 'app-user-list',
  template: `
    <h2>רשימת משתמשים</h2>
    <ul>
     <li *ngFor="let user of users$ | async">{{ user.name }}</li>
    </ul>
    `
  })
  export class UserListComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private store: Store) {
    this.users$ = this.store.select(selectAllUsers);
  }

  ngOnInit() {
    this.store.dispatch(loadUsers());
  }
}
