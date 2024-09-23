import { Injectable } from '@angular/core';

import { CacheStore } from '../interfaces/cache-store.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  public cacheStore: CacheStore = {
    actual_page: ""
  }

  constructor() {
    this.loadFromLocalStorage();
  }

  public saveToLocalStorage(page: string): void{
    this.cacheStore.actual_page = page;
    localStorage.setItem('cacheStorage', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(): void{
    if(!localStorage.getItem('cacheStorage')){
      return;
    }
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStorage')!);
  }

}
