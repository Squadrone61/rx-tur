import { Component } from '@angular/core';
import { Data, mockData } from './data.model';
import { StoreOptions, StoreService } from './store.service';

const sortingOptions = new Map<string, Partial<StoreOptions<Data>>>([
  ['0', { sortKey: 'createdAt', desc: false }],
  ['1', { sortKey: 'score', desc: false }],
  ['2', { sortKey: 'score', desc: true }],
]);

@Component({
  selector: 'my-app',
  template: `
  <button (click)="setItem()">set</button>
  <button (click)="add()">add</button>
  <button (click)="remove()">rem</button>
  
  <label for="cars">Sırala:</label>
  <select name="cars" id="cars" [ngModel]="0" (ngModelChange)="pickSort($event)">
    <option [value]="0" selected>Default</option>
    <option [value]="1">Puan</option>
    <option [value]="2">Puan1</option>
  </select>

  <input type="number" [ngModel]="1" min="1" (ngModelChange)="changePage($event)">
  <pre>{{ (list$ | async) | json }}</pre>

  `,
  styles: [],
})
export class AppComponent {
  list$ = this.store.getStore('list');

  constructor(private store: StoreService<Data>) {
    store.setOptions(sortingOptions.get('0'));
  }

  setItem() {
    const value: Data[] = mockData;
    this.store.setStore('list', value);
  }

  add() {
    const value: Data = {
      name: 'bir',
      score: Math.random() * 100,
      createdAt: Date.now(),
    };
    this.store.add('list', value);
  }

  remove() {
    this.store.remove('list', 'name', 'bir');
  }

  pickSort(sort: string) {
    this.store.setOptions(sortingOptions.get(sort));
  }

  changePage(page) {
    this.store.setOptions({ page });
  }
}
