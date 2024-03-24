import { Pipe, PipeTransform } from '@angular/core';

import { LanguajeService } from '../shared/services/languaje.service';
import * as EN from "../../assets/languajes/EN.json"
import * as ES from "../../assets/languajes/ES.json"


@Pipe({
  name: 'translate'
})

export class TranslatePipe implements PipeTransform {

  private ESList = JSON.parse(JSON.stringify(ES));
  private ENList = JSON.parse(JSON.stringify(EN));

  constructor(
    private languajeService: LanguajeService,
  ){}

  public transform(value: string): string {
    console.log(this.ESList[value])
    console.log(this.languajeService.languaje === 'ES')
    return this.languajeService.languaje === 'ES' ? this.ESList[value] : this.ENList[value];
  }
}