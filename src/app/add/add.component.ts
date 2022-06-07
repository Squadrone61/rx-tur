import { Component, OnInit } from '@angular/core';
import { Data } from '../data.model';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-add',
  standalone: true,
  templateUrl: './add.component.html',
})
export class AddComponent {
  constructor(private store: StoreService<Data>) {}

  add() {
    const value: Data = {
      name: 'bir',
      score: Math.random() * 100,
      createdAt: Date.now(),
    };
    this.store.add('list', value);
  }
}
