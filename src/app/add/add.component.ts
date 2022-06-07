import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Data } from '../data.model';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, RouterModule, FormsModule],
  templateUrl: './add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddComponent {
  name: string;
  constructor(private store: StoreService<Data>) {}

  add() {
    const value: Data = {
      name: this.name,
      score: 0,
      createdAt: Date.now(),
    };
    this.store.add('list', value);
  }
}
