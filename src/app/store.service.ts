import { Injectable } from '@angular/core';
import {
  fromEvent,
  filter,
  map,
  combineLatest,
  BehaviorSubject,
  tap,
} from 'rxjs';

export type NumberKeyOf<T> = {
  [K in keyof T]: T[K] extends number ? K : null;
}[keyof T];

export interface StoreOptions<T> {
  sortKey?: NumberKeyOf<T>;
  desc: boolean;
  page: number;
  pageSize: number;
}

export function storeDefaults<T>(): StoreOptions<T> {
  return { desc: true, pageSize: 5, page: 1 };
}

export function paginate<T>(array: T[], size:number, current:number) {
  return array.slice((current - 1) * size, current * size);
}

@Injectable({
  providedIn: 'root',
})
export class StoreService<T extends { createdAt: number }> {
  private source$ = fromEvent(window, 'storage');
  private _opts = new BehaviorSubject<StoreOptions<T>>(storeDefaults<T>());

  getStore(key: string) {
    const data = this.source$.pipe(
      filter((data: StorageEvent) => data.key === key),
      map<StorageEvent, T[]>(({ newValue }: StorageEvent) =>
        JSON.parse(newValue)
      )
    );
    return combineLatest([data, this._opts]).pipe(
      tap((_)=>console.log(_)),
      map(([list, _opts]) =>{
        list.sort((a, b) => {
          const x =
            (b[_opts?.sortKey || 'createdAt'] as unknown as number) -
            (a[_opts?.sortKey || 'createdAt'] as unknown as number);
          return _opts?.desc ? x : -x;
        })

        return paginate(list,_opts.pageSize,_opts.page)
      }
      )
    );
  }

  add(storeKey: string, value: T) {
    const arr: T[] = JSON.parse(localStorage.getItem(storeKey));
    arr.push(value);
    this.setStore(storeKey, arr);
  }

  remove(storeKey: string, key: keyof T, value: T[typeof key]) {
    const arr: T[] = JSON.parse(localStorage.getItem(storeKey));
    const i = arr.findIndex((item) => item[key] === value);
    if (i > -1) {
      arr.splice(i, 1);
      this.setStore(storeKey, arr);
    }
  }

  setStore(key: string, value: T[]) {
    const newValue = JSON.stringify(value);
    localStorage.setItem('list', newValue);

    //same-page event
    window.dispatchEvent(
      new StorageEvent('storage', {
        key,
        newValue,
        storageArea: window.localStorage,
      })
    );
  }

  setOptions(opt: Partial<StoreOptions<T>>) {
    this._opts.next({
      ...this._opts.value,
      ...opt,
    });
  }
}
