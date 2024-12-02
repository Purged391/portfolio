import { Component, computed, input, output } from '@angular/core';
import TranslatePipe from '../../../pipes/translate.pipe';
import { CommonModule } from '@angular/common';
import { Card } from '../../interfaces/Card.interface';
import TimeGapPipe from '../../../pipes/timeGap.pipe';

@Component({
    selector: 'portfolio-dialog',
    imports: [
        CommonModule,
        TranslatePipe,
        TimeGapPipe
    ],
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.scss'
})
export default class DialogComponent{
  public cardInput = input.required<Card | null>();
  public cardId = computed(() => {
    if(this.cardInput()){
      const dialog = document.querySelector('dialog');
      dialog!.style.visibility = 'hidden';
      dialog!.showModal();
      setTimeout(() => {
        dialog!.style.visibility = 'visible';
      }, 100);
      document.body.style.overflow = 'hidden';
      return this.card()?.id;
    }
    return null;
  });
  public card = computed(() => {
    if(this.cardInput()){
      return this.cardInput()!;
    }
    return {id: '', experience: '', information: '', alt: ''};
  });


  public modalClosed = output<void>();

  public closeModal(): void {
    const dialog = document.querySelector('dialog');
    dialog!.style.visibility = 'hidden';
    document.body.style.overflow = '';
    this.modalClosed.emit();
  }
}
