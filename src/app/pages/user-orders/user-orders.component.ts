import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@shared/button/button.component';
import { CardComponent } from '@shared/card/card.component';
import { LoaderComponent } from '@shared/loader/loader.component';
import { Store } from '@ngrx/store';
import { CreditComponent } from '@shared/credit/credit.component';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.state';
import * as UserActions from '../../store/users/user.actions';
import { selectAllUsers, selectUserWithOrdersTotal } from '../../store/users/user.selectors';
import { CommonModule } from '@angular/common';
import { AnimateCountDirective } from '@shared/directives/animate-count.directive';
import { User } from '@models/user-order.model';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    LoaderComponent,
    ButtonComponent,
    CreditComponent,
    AnimateCountDirective,
  ],
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserOrdersComponent {
  user$!: Observable<{ name: string; total: number; id: number } | null>;
  allUsers$!: Observable<User[]>;

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(selectUserWithOrdersTotal);
    this.allUsers$ = this.store.select(selectAllUsers);
    this.store.dispatch(UserActions.loadUsers());
  }

  selectUser(id: number) {
    this.store.dispatch(UserActions.selectUser({ userId: id }));
  }
}
