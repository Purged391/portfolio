import { Component, computed, effect, Input, input, output, Signal, signal } from '@angular/core';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import TranslatePipe from '../../../pipes/translate.pipe';
import { CommonModule } from '@angular/common';
import { Card } from '../../interfaces/Card.interface';

@Component({
  selector: 'portfolio-dialog',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    ChipModule,
    FieldsetModule,
    DialogModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export default class DialogComponent {
  public localVisible = signal<boolean>(false);

  @Input()
  set visible(value: boolean) {
    this.localVisible.set(value);
  }

  public onSetVisible = output<boolean>();
  public setVisible(): void{
      this.onSetVisible.emit(false);
  }

  @Input()
  set card(value: Card) {
    this.header.set(value.id);
    this.experience.set(value.experience);
    this.information.set(value.information);
  }
  public header = signal<string>('');
  public experience = signal<string>('');
  public information = signal<string>('');
}