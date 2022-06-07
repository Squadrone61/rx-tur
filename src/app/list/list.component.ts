import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Data, mockData } from '../data.model';
import { StoreOptions, StoreService } from '../store.service';

const sortingOptions = new Map<string, Partial<StoreOptions<Data>>>([
  ['0', { sortKey: 'createdAt', desc: false }],
  ['1', { sortKey: 'score', desc: false }],
  ['2', { sortKey: 'score', desc: true }],
]);

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.component.html',
})
export class ListComponent {
  list$ = this.store.getStore('list');

  constructor(private store: StoreService<Data>) {
    store.setOptions(sortingOptions.get('0'));
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
