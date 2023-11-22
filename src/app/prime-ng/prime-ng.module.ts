import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    AccordionModule,
    ButtonModule,
    TooltipModule
  ]
})
export class PrimeNgModule { }
