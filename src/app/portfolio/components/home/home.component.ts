import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
}
