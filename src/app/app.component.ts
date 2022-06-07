import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'my-app',
  template: `
  <a routerLink="/add">add</a> &nbsp;&nbsp;&nbsp;&nbsp;
  <a routerLink="/">list</a>
  <br>
  <router-outlet></router-outlet>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
