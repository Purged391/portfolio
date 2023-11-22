import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LanguajeService{

  private _languaje!: 'ES'|'EN';

  constructor() {
    this._languaje = 'ES';
  }

  public get languaje(): 'ES'|'EN'{
    return this._languaje;
  }
  public set languaje(val: 'ES'|'EN'){
    this._languaje = val;
  }
}
