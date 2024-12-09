import { Component, inject } from '@angular/core';
import { Project } from '../../interfaces/Project.interfcae';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'portfolio-projects',
    imports: [],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss'
})
export default class ProjectsComponent {

  public project: Project[] = [
    {
      id: 'Portfolio',
      description: 'This project is my personal portfolio. It is a single page application that showcases my skills, experience, and projects. It is built with Angular v19.0.0. ',
      type: 'Personal',
      technologies: ['Angular'],
      iframe: '',
      gitLink: 'https://github.com/Purged391/portfolio'
    }
  ];

  private sanitizer = inject(DomSanitizer);

  public getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
