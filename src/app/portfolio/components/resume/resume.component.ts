import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, PLATFORM_ID, signal } from '@angular/core';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { TextPlugin } from 'gsap/TextPlugin';

import TranslatePipe from '../../../pipes/translate.pipe';
import { Card } from '../../interfaces/Card.interface';
import CardComponent from '../card/card.component';
import DialogComponent from '../dialog/dialog.component';
@Component({
    selector: 'portfolio-resume',
    imports: [
        CommonModule,
        CardComponent,
        DialogComponent,
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
      chipList: ['HTML', 'CSS', 'TypeScript'],
      sections: ['.basics', '.advanced', '.libraries', '.others'],
      certificates: ['../../../../assets/images/certificates/CertificadoAngularUdemy.jpg']
    },
    {
      id: 'React',
      experience: 'resume.card.react.experience',
      information: 'resume.card.react.information',
      alt: 'React Logo',
      chipList: ['HTML', 'CSS', 'TypeScript'],
      sections: ['.basics', '.advanced', '.libraries', '.others'],
      certificates: []

    },
    {
      id: 'GitHub',
      experience: 'resume.card.github.experience',
      information: 'resume.card.github.information',
      alt: 'GitHub Logo',
      chipList: ['Git'],
      sections: ['.basics', '.advanced'],
      certificates: []
    },
    {
      id: 'Docker',
      experience: 'resume.card.docker.experience',
      information: 'resume.card.docker.information',
      alt: 'Docker Logo',
      chipList: ['YAML'],
      sections: ['.basics', '.advanced', '.others'],
      certificates: ['../../../../assets/images/certificates/CertificadoDockerUdemy.jpg']
    },
    {
      id: 'SpringBoot',
      experience: 'resume.card.springboot.experience',
      information: 'resume.card.springboot.information',
      alt: 'Spring Boot Logo',
      chipList: ['Java'],
      sections: ['.basics', '.advanced', '.others'],
      certificates: []
    },
    {
      id: 'MongoDB',
      experience: 'resume.card.mongodb.experience',
      information: 'resume.card.mongodb.information',
      alt: 'MongoDB Logo',
      chipList: [],
      sections: ['.basics', '.advanced', '.others'],
      certificates: ['../../../../assets/images/certificates/CertificadoMongoDBUdemy.jpg']
    },
    {
      id: 'Kubernetes',
      experience: 'resume.card.kubernetes.experience',
      information: 'resume.card.kubernetes.information',
      alt: 'Kubernetes Logo',
      chipList: [],
      sections: ['.basics', '.others'],
      certificates: []
    },
    {
      id: 'Jira',
      experience: 'resume.card.jira.experience',
      information: 'resume.card.jira.information',
      alt: 'Jira Logo',
      chipList: [],
      sections: ['.basics', '.others'],
      certificates: []
    },
    {
      id: 'Mulesoft',
      experience: 'resume.card.mulesoft.experience',
      information: 'resume.card.mulesoft.information',
      alt: 'Mulesoft Logo',
      chipList: ['Java', 'Dataweave', 'YAML'],
      sections: ['.basics', '.advanced', '.others'],
      certificates: ['../../../../assets/images/certificates/CertificadoMulesoftOficial.jpeg']
    },
    {
      id: 'Flask',
      experience: 'resume.card.flask.experience',
      information: 'resume.card.flask.information',
      alt: 'Flask Logo',
      chipList: ['Python'],
      sections: ['.basics', '.others'],
      certificates: []
    },
    {
      id: 'Jupiter',
      experience: 'resume.card.jupiter.experience',
      information: 'resume.card.jupiter.information',
      alt: 'Jupiter Notebook Logo',
      chipList: ['Python'],
      sections: ['.basics', '.others'],
      certificates: ['../../../../assets/images/certificates/CertificadoMachineLearningUdemy.jpg']
    },
    {
      id: 'Aptitudes',
      experience: 'resume.card.aptitudes.experience',
      information: 'resume.card.aptitudes.information',
      alt: 'Aptitudes Logo',
      chipList: [],
      sections: ['.basics'],
      certificates: []
    },
  ];
  private platformId = inject(PLATFORM_ID);
  private el = inject(ElementRef);

  public card = signal<Card | null>(null);
  public showModal = signal(false);


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

  public openModal(card: Card): void {
    document.getElementById('clickme')!.style.display = 'none';
    this.card.set(card);
    this.showModal.set(true);
  }

  public closeModal(): void {
    this.showModal.set(false);
  }
}
