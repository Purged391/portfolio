import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, effect, ElementRef, Inject, PLATFORM_ID, QueryList, signal, ViewChildren } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { TextPlugin } from 'gsap/TextPlugin';



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
      alt: 'Angular Logo',
    },
    {
      id: 'React',
      experience: '3 years',
      information: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.',
      alt: 'React Logo',
    },
    {
      id: 'GitHub',
      experience: 'resume.card.github.experience',
      information: 'resume.card.github.information',
      alt: 'GitHub Logo',
    },
    {
      id: 'Docker',
      experience: 'resume.card.docker.experience',
      information: 'resume.card.docker.information',
      alt: 'Docker Logo',
    },
    {
      id: 'SpringBoot',
      experience: '3 years',
      information: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.',
      alt: 'Spring Boot Logo',
    },
    {
      id: 'MongoDB',
      experience: '3 years',
      information: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.',
      alt: 'MongoDB Logo',
    },
    {
      id: 'Kubernetes',
      experience: '3 years',
      information: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.',
      alt: 'Kubernetes Logo',
    },
    {
      id: 'Jira',
      experience: '3 years',
      information: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.',
      alt: 'Jira Logo',
    },
    {
      id: 'Mulesoft',
      experience: '4 years',
      information: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.',
      alt: 'Mulesoft Logo',
    },
  ];

  constructor(private el: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) {
    gsap.registerPlugin(Draggable);
    gsap.registerPlugin(TextPlugin);

  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.makeCardsDraggable();
      this.animateText();
    }
  }

  private makeCardsDraggable(): void {
    const portfolioCards = this.el.nativeElement.querySelectorAll('.portfolioCard');
    portfolioCards.forEach((card: HTMLElement) => {
      Draggable.create(card, {
        type: 'x,y',
        edgeResistance: 0.65,
        bounds: '.resume-component',
      });
    });
  }

  private animateText(): void {
    const tl = gsap.timeline({repeat:-1, repeatDelay:1, yoyo:true});
    tl.to("small span", {duration: 5, text:"Why don't you try dragging the cards?...", ease:"none"});
  }

  public visible = signal<boolean>(false);
  public card = signal<Card>({ id: '', experience: '', information: '', alt: '' });

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
