import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserWithOrdersTotal, selectAllUsers } from '../../store/users/user.selectors';
import * as UserActions from '../../store/users/user.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html'
})
export class UserOrdersComponent {
  user$!: Observable<{ name: string; total: number } | null>;
  allUsers$!: Observable<any[]>;

  constructor(private store: Store) {
    // חיבור לסלקטורים
    // this.user$ = this.store.select(selectUserWithOrdersTotal);
    // this.allUsers$ = this.store.select(selectAllUsers);

    // הפעלה של קריאת משתמשים בעת טעינת הקומפוננטה
    this.store.dispatch(UserActions.loadUsers());
  }

  // שינוי המשתמש הנבחר
  selectUser(id: number) {
    this.store.dispatch(UserActions.selectUser({ userId: id }));
  }
}
