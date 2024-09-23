import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CacheService } from '../../services/cache.service';

@Component({
  selector: 'shared-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss',
})

export class MenuBarComponent {

  private _activeButton: string = 'home';

  constructor(
    private cacheService: CacheService,
    private router: Router,
  ){
    this._activeButton = this.cacheService.cacheStore.actual_page;
  }

  public navigateTo(path: string):void{
    if(this.activeButton === path){
      return;
    }
    this._activeButton = path;
    this.cacheService.saveToLocalStorage(path);
    this.router.navigate([`${path}`]);
  }

  public get activeButton(): string{
    return this._activeButton;
  }
}
