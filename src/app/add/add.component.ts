import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Data } from '../data.model';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './add.component.html',
  styles: [
    `
    .success{
      color: white;
      background-color: #52BE80;
    }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddComponent {
  name: string;
  done = false;
  constructor(
    private store: StoreService<Data>,
    private cd: ChangeDetectorRef
  ) {}

  add() {
    if (!this.name) return;
    const value: Data = {
      name: this.name,
      score: 0,
      createdAt: Date.now(),
    };
    this.store.add('list', value);
    this.done = true;
    setTimeout(() => {
      this.done = false;
      this.cd.markForCheck();
    }, 1500);
  }
}
