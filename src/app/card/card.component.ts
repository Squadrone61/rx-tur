import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Data } from '../data.model';

@Component({
  selector: 'store-item',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDialogModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
    .card {
      max-width: 400px;
      margin-bottom: 8px;
    }
    .deleteBtn{
      display: none;
    }
    .card:hover .deleteBtn {
      display: inline-block;
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
      <button class="deleteBtn" mat-stroked-button (click)="deleteItem()">SİL</button>
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

  constructor(public dialog: MatDialog) {}

  deleteItem() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: this.item,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete.emit(this.item);
      }
    });
  }
}

@Component({
  selector: 'delete-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
  <h1 mat-dialog-title>Otel Sil</h1>
  <div mat-dialog-content>
    {{data?.name}}'i silmek istediğinizden emin misiniz?
  </div>
  <div mat-dialog-actions>
    <button mat-button mat-dialog-close>İptal</button>
    <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Evet</button>
  </div>
  `,
})
export class DeleteDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Data) {}
}
