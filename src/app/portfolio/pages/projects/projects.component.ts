import { Component } from '@angular/core';
import ProjectsComponent from "../../components/projects/projects.component";

@Component({
  selector: 'page-projects',
  standalone: true,
  imports: [ProjectsComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export default class ProjectsPageComponent {

}
