import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { gsap } from 'gsap';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DragDropModule } from 'primeng/dragdrop';
import { ChipModule } from 'primeng/chip';
import { FieldsetModule } from 'primeng/fieldset';


import TranslatePipe from '../../../pipes/translate.pipe';

export interface Card {
  id: string;
  experience: string;
  information: string;
}

@Component({
  selector: 'portfolio-resume',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    DragDropModule,
    TranslatePipe,
    ChipModule,
    FieldsetModule,
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
      experience: '3 years',
      information: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.',
    },
    {
      id: 'Docker',
      experience: '3 years',
      information: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.',
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
  ];

  public visible = signal<boolean>(false);
  public header = signal<string>('');
  public experience = signal<string>('');
  public information = signal<string>('');

  public showDialog(id: string): void {
    this.visible.set(true);
    let card: Card = this.cards.find((card) => card.id === id)!;
    this.header.set(card.id);
    this.experience.set(card.experience);
    this.information.set(card.information);
}

  public onMouseMove(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const cardWidth = rect.width;
    const cardHeight = rect.height;

    const x = (event.clientX - rect.left) / cardWidth;
    const y = (event.clientY - rect.top) / cardHeight;

    const tiltX = (y - 0.5) * 30;
    const tiltY = (0.5 - x) * 30;

    gsap.to(card, {
      rotationY: tiltY,
      rotationX: tiltX,
      transformPerspective: 1000,
      scale: 1.2,
      boxShadow: '0 8px 40px rgba(0, 0, 0, 0.5)',
      duration: 0.3,
      ease: 'power3.out',
    });
  }

  public onMouseLeave(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      duration: 0.3,
      ease: 'power3.out',
    });
  }
}
