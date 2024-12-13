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
      technologies: ['Angular', 'GitHub'],
      iframe: 'http://localhost:4200/portfolio/home#home',
      gitLink: 'https://github.com/Purged391/portfolio'
    },
    {
      id: 'Santander-MuleSoft',
      description: 'project.card.santandermuleSoft.description',
      type: 'project.type.company',
      technologies: ['Mulesoft', 'Postman', 'Jira', 'Confluence', 'Swagger', 'GitHub', 'Jenkins', 'Kibana', 'IBM API Connect', 'Mulesoft Platform'],
      iframe: '',
      gitLink: ''
    },
    {
      id: 'Santander-SpringBoot-01',
      description: 'project.card.santanderspringboot01.description',
      type: 'project.type.company',
      technologies: ['Springboot', 'SoapUI', 'Apache', 'GitHub'],
      iframe: '',
      gitLink: ''
    },
    {
      id: 'Santander-SpringBoot-02',
      description: 'project.card.santanderspringboot02.description',
      type: 'project.type.company',
      technologies: ['Springboot', 'GitHub'],
      iframe: '',
      gitLink: ''
    },
    {
      id: 'Santander-Gluon-01',
      description: 'project.card.santandergluon01.description',
      type: 'project.type.company',
      technologies: ['Springboot', 'GitHub'],
      iframe: '',
      gitLink: ''
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
    this.technologies = [...new Set(this.projects.flatMap(project => project.technologies))].sort();
    this.types = [...new Set(this.projects.map(project => project.type))].sort();

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
    this.sortProjectsById();
  }

  private sortProjectsById(): void {
    const sorted = [...this.filteredProjects()].sort((a, b) => a.id.localeCompare(b.id));
    this.filteredProjects.set(sorted);
  }
}
