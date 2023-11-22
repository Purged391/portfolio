import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss',
})
export class MenuBarComponent {

  constructor(
    private router: Router,
  ){}

  public navigateTo(path: string):void{
    this.router.navigate([`${path}`]);
  }

}
