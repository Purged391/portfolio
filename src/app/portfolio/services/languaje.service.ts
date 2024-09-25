import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LanguajeService{

  //TO-DO Recoger la region donde se encuentra para establecerla por defecto
  private _languaje = signal<'ES'|'EN'>('ES');



  public get languaje(): 'ES'|'EN'{
    return this._languaje();
  }
  public set languaje(val: 'ES'|'EN'){
    this._languaje.set(val);
  }
}
