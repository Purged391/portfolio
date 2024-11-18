import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import TranslatePipe from '../../../pipes/translate.pipe';
import { Router } from '@angular/router';


@Component({
  selector: 'portfolio-home',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {

  public navigateTo(event: MouseEvent, dest: string): void{
    const target = event.target as HTMLElement;
    //Don't lose shadow effect on click
    target.blur();
  }
}
