import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    MenuBarComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    PipesModule
  ],
  exports: [
    MenuBarComponent
  ]
})
export class SharedModule { }
