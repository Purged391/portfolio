import { Component } from '@angular/core';

@Component({
  selector: 'portfolio-skills-page',
  templateUrl: './skills-page.component.html',
  styleUrl: './skills-page.component.scss'
})
export class SkillsPageComponent {
  public items: string[] = ["Hola", "Adios"];
}
