import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppModule } from './app/app.module';
import { userReducer } from './app/store/user.reducer';
import { UserEffects } from './app/store/user.effects';

// ב-Angular 18 צריך לטעון את NgRx דרך AppModule
// כל Providers שנדרשים ל-Effects ו-Store מוטענים מה־AppModule עצמו
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
