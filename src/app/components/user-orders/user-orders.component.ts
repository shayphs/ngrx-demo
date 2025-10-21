import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserWithOrdersTotal, selectAllUsers } from '../../store/users/user.selectors';
import * as UserActions from '../../store/users/user.actions';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.state';
import { animate, group, query, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
  animations: [
    trigger('userChangeAnimation', [
      transition(':increment, :decrement', [
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, width: '100%' }), { optional: true }),

        group([
          query(':leave', [
            animate('400ms cubic-bezier(.17,.67,.83,.67)', style({ transform: 'translateX(-100%)', opacity: 0 }))
          ], { optional: true }),

          query(':enter', [
            style({ transform: 'translateX(100%)', opacity: 0 }),
            animate('400ms cubic-bezier(.17,.67,.83,.67)', style({ transform: 'translateX(0)', opacity: 1 }))
          ], { optional: true })
        ])
      ])
    ])
  ]
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
