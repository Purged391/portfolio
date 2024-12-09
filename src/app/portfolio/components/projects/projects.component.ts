import { Component, inject, OnInit, signal } from '@angular/core';
import { Project } from '../../interfaces/Project.interfcae';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import TranslatePipe from '../../../pipes/translate.pipe';

@Component({
    selector: 'portfolio-projects',
    imports: [
      CommonModule,
      ReactiveFormsModule,
      TranslatePipe
    ],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss'
})
export default class ProjectsComponent implements OnInit {

  public projects: Project[] = [
    {
      id: 'Portfolio',
      description: 'project.card.portfolio.description',
      type: 'project.type.personal',
      technologies: ['Angular'],
      iframe: '',
      gitLink: 'https://github.com/Purged391/portfolio'
    },
  ];

  private sanitizer = inject(DomSanitizer);
  private fb = inject(FormBuilder);
  public filterForm: FormGroup;
  public technologies: string[] = [];
  public types: string[] = [];
  public filteredProjects = signal<Project[]>([]);

  constructor() {
    this.filterForm = this.fb.group({
      technologyFilter: [''],
      typeFilter: ['']
    });
  }

  public ngOnInit(): void {
    this.filteredProjects.set(this.projects);
    this.technologies = [...new Set(this.projects.flatMap(project => project.technologies))];
    this.types = [...new Set(this.projects.map(project => project.type))];

    this.filterForm.valueChanges.subscribe(() => {
      this.filterProjects();
    });
  }

  public getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public filterProjects(): void {
    const { technologyFilter, typeFilter } = this.filterForm.value;

    const filtered = this.projects.filter(project => {
      const matchesTechnology = technologyFilter ? project.technologies.includes(technologyFilter) : true;
      const matchesType = typeFilter ? project.type === typeFilter : true;
      return matchesTechnology && matchesType;
    });
    this.filteredProjects.set(filtered);
  }
}
