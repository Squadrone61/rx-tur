import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { Data, mockData } from '../data.model';
import { StoreOptions, StoreService } from '../store.service';

const sortingOptions = new Map<number, Partial<StoreOptions<Data>>>([
  [0, { sortKey: 'createdAt', desc: false }],
  [1, { sortKey: 'score', desc: false }],
  [2, { sortKey: 'score', desc: true }],
]);

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    MatSelectModule,
    MatButtonModule,
    CardComponent,
    RouterModule,
  ],
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  // MatPaginator Inputs
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20];

  list$ = this.store.getStore('list');

  constructor(private store: StoreService<Data>) {
    store.setOptions(sortingOptions.get(0));
  }

  add() {
    const value: Data = {
      name: 'bir',
      score: Math.random() * 100,
      createdAt: Date.now(),
    };
    this.store.add('list', value);
  }

  remove(item: Data) {
    this.store.remove('list', 'createdAt', item.createdAt);
  }

  pickSort(sort: number) {
    this.store.setOptions(sortingOptions.get(sort));
  }

  changePage({ pageSize, pageIndex }: PageEvent) {
    this.store.setOptions({ pageIndex, pageSize });
  }

  changeScore($event) {}
}
