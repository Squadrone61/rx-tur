import { Component, VERSION } from '@angular/core';
import { StoreService } from './store.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  list$ = this.store.getStore('list');

  constructor(private store: StoreService) {}

  setItem() {
    
    const value = [{ xd: 'xd' }];
    localStorage.setItem('list', JSON.stringify(value));
  }
}
