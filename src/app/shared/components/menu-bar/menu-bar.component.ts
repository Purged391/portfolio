import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss',
})

export class MenuBarComponent {

  private _activeButton: string = 'home';

  constructor(
    private router: Router,
  ){}

  public navigateTo(path: string):void{
    if(this.activeButton === path){
      return;
    }
    this._activeButton = path;
    this.router.navigate([`${path}`]);
  }

  public get activeButton(): string{
    return this._activeButton;
  }

}
