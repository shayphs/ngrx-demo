import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.state';
import * as UserActions from '../../store/users/user.actions';
import { selectAllUsers, selectUserWithOrdersTotal } from '../../store/users/user.selectors';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent {
  user$!: Observable<{ name: string; total: number; id: number } | null>;
  allUsers$!: Observable<any[]>;

  constructor(private store: Store<AppState>) {
    // חיבור לסלקטורים
    this.user$ = this.store.select(selectUserWithOrdersTotal);
    this.allUsers$ = this.store.select(selectAllUsers);

    // הפעלה של קריאת משתמשים בעת טעינת הקומפוננטה
    this.store.dispatch(UserActions.loadUsers());
  }

  // שינוי המשתמש הנבחר
  selectUser(id: number) {
    this.store.dispatch(UserActions.selectUser({ userId: id }));
  }
}
