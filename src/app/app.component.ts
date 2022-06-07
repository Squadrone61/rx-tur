import { Component, VERSION } from '@angular/core';
import { Data } from './data.model';
import { StoreService } from './store.service';

@Component({
  selector: 'my-app',
  template: `
  <pre>{{ (list$ | async)?.newValue | json }}</pre>

  <button (click)="setItem()">set</button>
  <button (click)="add()">add</button>
  <button (click)="remove()">rem</button>
  `,
  styles: [],
})
export class AppComponent {
  list$ = this.store.getStore('list');

  constructor(private store: StoreService<Data>) {}

  setItem() {
    const value: Data[] = [{ name: 'bir', score: 1 }];
    this.store.setStoreItem('list', value);
  }

  add() {
    const value: Data = { name: 'bir', score: Math.random() * 100 };
    this.store.add('list', value);
  }

  remove() {
    this.store.remove('list', 'name', 'bir');
  }
}
