import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import TranslatePipe from '../../pipes/translate.pipe';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'shared-header',
  standalone: true,
  imports: [
    ButtonModule,
    RouterModule,
    TranslatePipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export default class HeaderComponent implements OnInit {

  private router = inject(Router);


  private _activeButton= signal<string>('home');

  public get activeButton(): string{
    return this._activeButton();
  }

  public ngOnInit(): void {
    this._activeButton.set(this.getLastPathSegment());
  }
  // Método para obtener el último segmento del path
  public getLastPathSegment(): string {
    const currentUrl = this.router.url;
    const segments = currentUrl.split('/'); // Divide la URL en segmentos
    return segments[segments.length - 1] || ''; // Retorna el último segmento

  }

  public navigateTo(path: string):void{
    if(this.activeButton === path){
      return;
    }
    this._activeButton.set(path);
    //this.cacheService.saveToLocalStorage(path);
    //TO-DO Comprobar si son los paths de home que estan en home pero son otros componentes
    this.router.navigate([`/portfolio/${path}`])
  }
}
