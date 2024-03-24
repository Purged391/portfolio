import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { SkillsPageComponent } from './pages/skills-page/skills-page.component';

@NgModule({
  declarations: [
    ContactPageComponent,
    HomePageComponent,
    ProjectsPageComponent,
    SkillsPageComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
  ]
})
export class PortfolioModule { }
