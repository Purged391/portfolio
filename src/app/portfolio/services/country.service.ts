import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { CountryResponse } from '../interfaces/NominatimResponse';

@Injectable({providedIn: 'root'})
export class CountryService {
  constructor() { }

  private httpClient = inject(HttpClient);


  public getCurrentLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        console.log('Geolocation is supported by this browser.');
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }


  public getCountry(lat: number, lng: number): Observable<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    return this.httpClient.get<CountryResponse>(url)
    .pipe(
      map((response) => response.address.country_code),
    );
  }
}
