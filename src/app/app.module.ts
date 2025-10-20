import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list.component';
import { userReducer } from './store/user.reducer';
import { UserEffects } from './store/user.effects';

@NgModule({
  declarations: [AppComponent, UserListComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ users: userReducer }),
    EffectsModule.forRoot([UserEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
