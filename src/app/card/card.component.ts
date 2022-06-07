import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Data } from '../data.model';

@Component({
  selector: 'store-item',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
    .card {
      max-width: 400px;
      margin-bottom: 8px;
    }
    `,
  ],
  template: `
  <mat-card class="card">
    <mat-card-title-group>
      <img mat-card-md-image src="https://www.pngmart.com/files/16/Silhouette-Hotel-Building-PNG-File.png" >
      <mat-card-title>{{item?.name}}</mat-card-title>
      <mat-card-subtitle>{{item?.score | number: '1.0-1' }}</mat-card-subtitle>
    </mat-card-title-group>
    
    <mat-card-actions>
      <button mat-stroked-button (click)="scoreChange.emit({item,change:1})">PUAN ARTIR</button>
      <button mat-stroked-button (click)="scoreChange.emit({item,change:-1})">PUAN AZALT</button>
      <button mat-stroked-button (click)="delete.emit(item)">SİL</button>
    </mat-card-actions>
  </mat-card>
  `,
})
export class CardComponent {
  @Input()
  item: Data;

  @Output()
  scoreChange = new EventEmitter<{ item: Data; change: number }>();

  @Output()
  delete = new EventEmitter<Data>();
}
