import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import TranslatePipe from '../../../pipes/translate.pipe';


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
