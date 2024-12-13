import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
export default class ThemeService {
  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        this.theme = storedTheme as 'light-theme' | 'dark-theme';
      } else {
        this.theme = this.getBrowserTheme();
      }
    }
  }
  private platformId = inject(PLATFORM_ID);

  private _theme = signal<"light-theme" | "dark-theme" | "">("");

  public get theme(): string {
    return this._theme();
  }

  public set theme(val: "light-theme" | "dark-theme") {
    this._theme.set(val);
    localStorage.setItem('theme', val);
    if(val === "light-theme"){
      document.body.classList.add(this._theme());
      document.body.classList.remove('dark-theme');
    }
    else{
      document.body.classList.add(this._theme());
      document.body.classList.remove('light-theme');
    }
  }

  private getBrowserTheme(): "light-theme" | "dark-theme" {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark-theme';
    } else {
      return 'light-theme';
    }
  }
}
