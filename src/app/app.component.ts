import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
import { isPlatformBrowser } from '@angular/common';
import LoadingComponent from './shared/loading/loading.component';

@Component({
    selector: 'app-root',
    imports: [
      RouterOutlet,
      LoadingComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  private platformId = inject(PLATFORM_ID);

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
  }
}

