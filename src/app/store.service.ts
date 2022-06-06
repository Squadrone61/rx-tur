import { Injectable } from '@angular/core';
import { fromEvent, filter, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  source$ = fromEvent(window, 'storage');

  constructor() {}

  getStore(key: string) {
    return this.source$.pipe(
      tap((e) => console.log(e)),
      filter((data) => (<StorageEvent>data).key === key)
    );
  }

  setStoreItem() {}
}
