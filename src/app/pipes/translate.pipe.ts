import { inject, Pipe, PipeTransform } from '@angular/core';

import { LanguajeService } from '../portfolio/services/languaje.service';
import * as EN from "../../assets/languajes/EN.json"
import * as ES from "../../assets/languajes/ES.json"


@Pipe({
  name: 'translate',
  standalone: true,
})

export default class TranslatePipe implements PipeTransform {

  private ESList = JSON.parse(JSON.stringify(ES));
  private ENList = JSON.parse(JSON.stringify(EN));

  private languajeService = inject(LanguajeService);

  public transform(value: string): string {
    //console.log(this.ESList[value])
    //console.log(this.languajeService.languaje === 'ES')
    return this.languajeService.languaje === 'ES' ? this.ESList[value] : this.ENList[value];
  }
}
