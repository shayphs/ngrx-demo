import { Component } from '@angular/core';
import { ButtonComponent } from '@app/shared/button/button.component';
import { CardComponent } from '@app/shared/card/card.component';
import { LoaderComponent } from '@app/shared/loader/loader.component';
import { Store } from '@ngrx/store';
import { CreditComponent } from '@shared/credit/credit.component';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.state';
import * as UserActions from '../../store/users/user.actions';
import { selectAllUsers, selectUserWithOrdersTotal } from '../../store/users/user.selectors';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [
    CardComponent,
    LoaderComponent,
    ButtonComponent,
    CreditComponent,
  ],
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent {
  user$!: Observable<{ name: string; total: number; id: number } | null>;
  allUsers$!: Observable<any[]>;

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(selectUserWithOrdersTotal);
    this.allUsers$ = this.store.select(selectAllUsers);
    this.store.dispatch(UserActions.loadUsers());
  }

  selectUser(id: number) {
    this.store.dispatch(UserActions.selectUser({ userId: id }));
  }
}
