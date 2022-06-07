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
  [0, { sortKey: 'createdAt', desc: true, pageIndex: 0, pageSize: 5 }],
  [1, { sortKey: 'score', desc: false, pageIndex: 0, pageSize: 5 }],
  [2, { sortKey: 'score', desc: true, pageIndex: 0, pageSize: 5 }],
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
  styles: [
    `.container{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  // MatPaginator Inputs
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20];
  storeName = 'list';
  list$ = this.store.getStore(this.storeName);

  constructor(private store: StoreService<Data>) {
    store.setOptions(sortingOptions.get(0));
  }

  add() {
    const value: Data = {
      name: 'bir',
      score: Math.random() * 100,
      createdAt: Date.now(),
    };
    this.store.add(this.storeName, value);
  }

  remove(item: Data) {
    this.store.remove(this.storeName, 'createdAt', item.createdAt);
  }

  pickSort(sort: number) {
    this.store.setOptions(sortingOptions.get(sort));
  }

  changePage({ pageSize, pageIndex }: PageEvent) {
    this.store.setOptions({ pageIndex, pageSize });
  }

  changeScore({ item, change }: { item: Data; change: number }) {
    item = {
      ...item,
      score: item.score + change,
    };
    this.store.edit(this.storeName, 'createdAt', item);
  }
}
