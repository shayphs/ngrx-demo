import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { ordersReducer } from './store/order/order.reducer';
import { UserEffects } from './store/users/user.effects';
import { userReducer } from './store/users/user.reducer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    UserOrdersComponent,
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      users: userReducer,
      orders: ordersReducer
    }),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
