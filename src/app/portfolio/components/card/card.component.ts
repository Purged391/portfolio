import { Component, Input, input, signal } from '@angular/core';
import { gsap } from 'gsap';
import { CommonModule } from '@angular/common';
import { DragDropModule } from 'primeng/dragdrop';

@Component({
    selector: 'portfolio-card',
    imports: [
        CommonModule,
        DragDropModule,
    ],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss'
})
export default class CardComponent {
  public id = input.required<string>();
  public alt = input.required<string>();
  public delay = input.required<number>();


  public onMouseMove(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const cardWidth = rect.width;
    const cardHeight = rect.height;

    const x = (event.clientX - rect.left) / cardWidth;
    const y = (event.clientY - rect.top) / cardHeight;

    const tiltX = (y - 0.5) * 30;
    const tiltY = (0.5 - x) * 30;

    gsap.to(card, {
      rotationY: tiltY,
      rotationX: tiltX,
      transformPerspective: 1000,
      scale: 1.2,
      boxShadow: '0 8px 40px rgba(0, 0, 0, 0.5)',
      duration: 0.3,
      ease: 'power3.out',
    });
  }

  public onMouseLeave(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      duration: 0.3,
      ease: 'power3.out',
    });
  }
}
