import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
  // ngOnInit() {
  //   AOS.init(); // Inicializa AOS
  // }
}

