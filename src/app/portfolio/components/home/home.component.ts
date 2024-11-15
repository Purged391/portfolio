import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import TranslatePipe from '../../../pipes/translate.pipe';
import { Router } from '@angular/router';


@Component({
  selector: 'portfolio-home',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    TranslatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {

  public navigateTo(event: MouseEvent, dest: string): void{
    const target = event.target as HTMLElement;
    target.blur();
  }

}
