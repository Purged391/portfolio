import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactPageComponent } from './portfolio/pages/contact-page/contact-page.component';
import { HomePageComponent } from './portfolio/pages/home-page/home-page.component';
import { ProjectsPageComponent } from './portfolio/pages/projects-page/projects-page.component';
import { SkillsPageComponent } from './portfolio/pages/skills-page/skills-page.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'skills',
    component: SkillsPageComponent
  },
  {
    path: 'projects',
    component: ProjectsPageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: [],
})
export class AppRoutingModule { }
