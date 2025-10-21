import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { userReducer } from './store/users/user.reducer';
import { UserEffects } from './store/users/user.effects';
import { UserNameComponent } from './components/user-orders/user-name.component';
import { UserTotalComponent } from './components/user-orders/user-total.component';
import { ordersReducer } from './store/users/order.reducer';


@NgModule({
  declarations: [
    AppComponent,
    UserOrdersComponent,
    UserNameComponent,
    UserTotalComponent,
  ],
  imports: [
    BrowserModule,

    // התחלת ה-Store עם ה-Reducer שלך
    StoreModule.forRoot({
      users: userReducer,
      orders: ordersReducer
    }),

    // התחלת ה-Effects
    EffectsModule.forRoot([UserEffects]),

    // Redux DevTools – אפשר לבדוק את הסטור בדפדפן
    StoreDevtoolsModule.instrument({
      maxAge: 25, // שומר 25 מצבים אחרונים
      logOnly: false, // אפשר גם לכתוב actions ב-devtools
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
