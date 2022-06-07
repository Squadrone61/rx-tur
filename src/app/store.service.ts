import { Injectable } from '@angular/core';
import { fromEvent, filter, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService<T> {
  source$ = fromEvent(window, 'storage');

  constructor() {}

  getStore(key: string) {
    return this.source$.pipe(
      filter((data: StorageEvent) => data.key === key),
      map(({ newValue, oldValue }: StorageEvent) => ({
        newValue: JSON.parse(newValue),
        oldValue: JSON.parse(oldValue),
      }))
    );
  }

  add(storeKey: string, value: T) {
    const arr: T[] = JSON.parse(localStorage.getItem(storeKey));
    arr.push(value);
    this.setStoreItem(storeKey, arr);
  }

  remove(storeKey: string, key: keyof T, value: T[typeof key]) {
    const arr: T[] = JSON.parse(localStorage.getItem(storeKey));
    const i = arr.findIndex((item) => item[key] === value);
    if (i > -1) {
      arr.splice(i, 1);
      this.setStoreItem(storeKey, arr);
    }
  }

  setStoreItem(key: string, value: T[]) {
    const newValue = JSON.stringify(value);
    const oldValue = localStorage.getItem(key);
    localStorage.setItem('list', newValue);

    //same-page event
    window.dispatchEvent(
      new StorageEvent('storage', {
        key,
        newValue,
        oldValue,
        storageArea: window.localStorage,
      })
    );
  }
}
