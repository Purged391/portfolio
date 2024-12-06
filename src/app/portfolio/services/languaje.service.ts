import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguajeService {

  private _languaje = signal<'ES'|'EN' | null>(null);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const storedLanguage = localStorage.getItem('language');
      if (storedLanguage) {
        this._languaje.set(storedLanguage as 'ES' | 'EN');
      } else {
        this._languaje.set('ES');
      }
    }
  }

  public get languaje(): 'ES'|'EN' | null {
    return this._languaje();
  }

  public set languaje(val: 'ES'|'EN') {
    this._languaje.set(val);
    localStorage.setItem('language', val);
  }
}
