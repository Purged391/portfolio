import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, PLATFORM_ID } from '@angular/core';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { TextPlugin } from 'gsap/TextPlugin';

import TranslatePipe from '../../../pipes/translate.pipe';
import { Card } from '../../interfaces/Card.interface';
import CardComponent from '../card/card.component';
@Component({
    selector: 'portfolio-resume',
    imports: [
        CommonModule,
        CardComponent,
    ],
    templateUrl: './resume.component.html',
    styleUrl: './resume.component.scss'
})
export default class ResumeComponent implements AfterViewInit {
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
  private platformId = inject(PLATFORM_ID);
  private el = inject(ElementRef);

  constructor() {
    gsap.registerPlugin(Draggable);
    gsap.registerPlugin(TextPlugin);
    //gsap.registerPlugin(Flip);
  }

  public ngAfterViewInit(): void {
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
        bounds: this.el.nativeElement.querySelector('.resume-component'),
        inertia: true,
        onDrag: function() {
          this['applyBounds']();
        }
      });
    });
  }

  private animateText(): void {
    const tl = gsap.timeline({repeat:-1, repeatDelay:1, yoyo:true});
    tl.to("small span", {duration: 5, text:"Why don't you try dragging the cards?...", ease:"none"});
  }
}
