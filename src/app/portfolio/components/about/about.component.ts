import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { afterNextRender, afterRender, AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, signal } from '@angular/core';
import { CardModule } from 'primeng/card';

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



  constructor(private el: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {

    if (isPlatformBrowser(this.platformId)) {
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
              console.log(index)
              console.log(rect)
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


  // inViewStates: boolean[]; // Estado para cada contenedor

  // constructor(private el: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) {
  //   this.inViewStates = [false, false, false, false, false]; // Inicializa el estado de visibilidad
  // }

  // ngAfterViewInit() {
  //   // Solo ejecuta la lógica en el navegador
  //   if (isPlatformBrowser(this.platformId)) {
  //     const containers = this.el.nativeElement.querySelectorAll('.container');

  //     containers.forEach((container: HTMLElement, index: number) => {
  //       const observer = new IntersectionObserver((entries) => {
  //         entries.forEach(entry => {
  //           if (entry.isIntersecting) {
  //             this.inViewStates[index] = true;  // Activa las animaciones para este contenedor
  //             observer.disconnect();  // Detenemos el observador después de la primera intersección
  //           }
  //         });
  //       }, {
  //         threshold: 0.1 // Cambia este valor según tus necesidades
  //       });

  //       // Empieza a observar el contenedor
  //       observer.observe(container);
  //     });
  //   }
  // }
}
