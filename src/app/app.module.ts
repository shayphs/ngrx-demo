import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list.component';
import { userReducer } from './store/user.reducer';
import { UserEffects } from './store/user.effects';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent // קומפוננטת רשימת משתמשים
  ],
  imports: [
    BrowserModule,

    // התחלת ה-Store עם ה-Reducer שלך
    StoreModule.forRoot({ users: userReducer }),

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
export class AppModule {}
