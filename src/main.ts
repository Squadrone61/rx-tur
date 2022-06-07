import './polyfills';

import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./app/list/list.component').then((m) => m.ListComponent),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./app/add/add.component').then((m) => m.AddComponent),
  },
];

bootstrapApplication(AppComponent, {
  providers: [BrowserAnimationsModule,importProvidersFrom(RouterModule.forRoot(ROUTES))],
})
  .then((ref) => {
    // Ensure Angular destroys itself on hot reloads.
    if (window['ngRef']) {
      window['ngRef'].destroy();
    }
    window['ngRef'] = ref;

    // Otherwise, log the boot error
  })
  .catch((err) => console.error(err));
