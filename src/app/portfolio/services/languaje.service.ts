import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { CountryService } from './country.service';

@Injectable({
  providedIn: 'root'
})
export class LanguajeService {

  private _languaje = signal<'ES'|'EN' | null>(null);
  private platformId = inject(PLATFORM_ID);
  private countryService = inject(CountryService);

  private spanishSpeakingCountries = [
    'AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'SV', 'GQ', 'GT', 'HN', 'MX', 'NI', 'PA', 'PY', 'PE', 'PR', 'ES', 'UY', 'VE'
  ];
  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const storedLanguage = localStorage.getItem('language');
      if (storedLanguage) {
        this._languaje.set(storedLanguage as 'ES' | 'EN');
      } else {
        this.countryService.getCurrentLocation().then((position) => {
          this.countryService.getCountry(position.coords.latitude, position.coords.longitude).subscribe((country) => {
            if (this.spanishSpeakingCountries.includes(country.toUpperCase())) {
              this.languaje = 'ES';
            } else {
              this.languaje = 'EN';
            }
          });
        }).catch(() => {
          this.languaje= 'EN';
        });
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
