import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, PLATFORM_ID, signal } from '@angular/core';
import TranslatePipe from '../../../pipes/translate.pipe';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
    selector: 'portfolio-home',
    imports: [
        CommonModule,
        TranslatePipe
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    animations: [
        trigger('cardAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(50px)' }),
                animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
        ]),
    ]
})
export default class HomeComponent {

  private router: Router = inject(Router);

  public navigateTo(event: MouseEvent, dest: string): void{
    const target = event.target as HTMLElement;
    //Don't lose shadow effect on click
    target.blur();
    this.router.navigate([`/portfolio/${dest}`], { fragment: dest });
  }

  private platformId = inject(PLATFORM_ID);
  public showScrollDown = signal(false);
  @HostListener('window:scroll', [])
  public onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (window.scrollY > 0 && !this.showScrollDown()) {
        this.showScrollDown.set(true);
      }
    }
  }
}

