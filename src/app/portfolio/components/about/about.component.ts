import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { afterNextRender, afterRender, AfterViewInit, Component, ElementRef, HostListener, Inject, PLATFORM_ID, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


@Component({
  selector: 'portfolio-about',
  standalone: true,
  imports: [
    CardModule,
    CommonModule,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [
    // Animación para el contenedor que se llena de arriba hacia abajo (moveline)
    trigger('moveline', [
      transition('hidden => visible', [
        style({ height: '0', opacity: 0 }),  // Empieza con altura 0
        animate('600ms ease-out', style({ height: '*', opacity: 1 })) // Se expande a su altura completa
      ]),
      transition('visible => hidden', [
        style({ height: '*', opacity: 1 }),  // Empieza con altura 0
        animate('600ms ease-out', style({ height: '*', opacity: 0 })) // Se expande a su altura completa
      ])
    ]),
    // Animación para el p-card que entra desde la izquierda
    trigger('slideLeft', [
      transition('hidden => visible', [
        style({ transform: 'translateX(-100%)', opacity: 0 }), // Empieza desde fuera de la vista
        animate('500ms 300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })) // Entra con un retardo
      ]),
      transition('visible => hidden', [
        style({ transform: 'translateX(0)', opacity: 1 }), // Empieza desde fuera de la vista
        animate('500ms 300ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0 })) // Entra con un retardo
      ]),
    ]),
    trigger('slideRight', [
      transition('hidden => visible', [
        style({ transform: 'translateX(-100%)', opacity: 0 }), // Empieza desde fuera de la vista
        animate('500ms 300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })) // Entra con un retardo
      ]),
    ])
  ]
})
export default class AboutComponent implements AfterViewInit {
  public inView = signal<boolean[]>([false, false, false, false]);  // Controla la visibilidad de los containers
  public isCardVisible = signal<string[]>(['hidden', 'hidden', 'hidden', 'hidden']); // Controla la visibilidad de los p-card



  constructor(private el: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit() {

    if (isPlatformBrowser(this.platformId)) {

      this.initScrollAnimation();


      const targetElements = this.el.nativeElement.querySelectorAll('.box');


      targetElements.forEach((targetElement: HTMLElement, index: number) => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const currentView =  this.inView();
              const cloneView =  [...currentView];
              cloneView[index] = true;
              this.inView.set(cloneView);
               setTimeout(() => {
                 const currentCard =  this.isCardVisible();
                 const cloneCard =  [...currentCard];
                 cloneCard[index] = 'visible';
                 this.isCardVisible.set(cloneCard);
               }, 600);

            } else {
              const rect = entry.boundingClientRect;
              if (rect.top < 0) {

              } else if ((rect.top > 0 && index%2 === 0) || (rect.top -100 > 0 && index%2 !== 0)) {
                const currentCard =  this.isCardVisible();
                const cloneCard =  [...currentCard];
                cloneCard[index] = 'hidden';
                this.isCardVisible.set(cloneCard);
                const currentView =  this.inView();
                const cloneView =  [...currentView];
                cloneView[index] = false;
                this.inView.set(cloneView);
              }
            }
          });
        }, {
          threshold: index === 0 ? 0 : 1
        });

        observer.observe(targetElement);
      });
    }
  }

  public initScrollAnimation(): void{
    // Selecciona el SVG o el texto dentro del SVG
    const svgText = document.getElementById('svgText');
    gsap.to(svgText, {
      scrollTrigger: {
        trigger: '.about-component',
        start: '9% 36%',
        end: '40% 10%',
        scrub: true,
        pin: true, // Mantiene el pin durante toda la animación
      },
      keyframes: [
        { opacity: 1, duration: 10 },
        { opacity: 0, duration: 10 }
      ],
    });
  }
}
