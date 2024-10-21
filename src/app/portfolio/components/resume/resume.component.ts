import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DragDropModule } from 'primeng/dragdrop';
import { ChipModule } from 'primeng/chip';
import { FieldsetModule } from 'primeng/fieldset';


import TranslatePipe from '../../../pipes/translate.pipe';
import { Card } from '../../interfaces/Card.interface';
import CardComponent from '../card/card.component';
import DialogComponent from '../dialog/dialog.component';
@Component({
  selector: 'portfolio-resume',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardComponent,
    DialogComponent
  ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
})
export default class ResumeComponent {
  public cards: Card[] = [
    {
      id: 'Angular',
      experience: 'resume.card.angular.experience',
      information: 'resume.card.angular.information',
    },
    {
      id: 'React',
      experience: '3 years',
      information: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.',
    },
    {
      id: 'GitHub',
      experience: 'resume.card.github.experience',
      information: 'resume.card.github.information',
    },
    {
      id: 'Docker',
      experience: 'resume.card.docker.experience',
      information: 'resume.card.docker.information',
    },
    {
      id: 'SpringBoot',
      experience: '3 years',
      information: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.',
    },
    {
      id: 'MongoDB',
      experience: '3 years',
      information: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.',
    },
    {
      id: 'Kubernentes',
      experience: '3 years',
      information: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.',
    },
    {
      id: 'Jira',
      experience: '3 years',
      information: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.',
    },
    {
      id: 'Mulesoft',
      experience: '4 years',
      information: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.',
    },
  ];
  public visible = signal<boolean>(false);
  public card = signal<Card>({ id: '', experience: '', information: '' });

  public showDialog(id: string): void {
    this.visible.set(true);
    this.card.set(this.cards.find((card) => card.id === id)!);
    // this.header.set(card.id);
    // this.experience.set(card.experience);
    // this.information.set(card.information);
}

public updateVisibility(value: boolean): void {
    this.visible.set(value);
}
}
