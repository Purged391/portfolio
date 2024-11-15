import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { toSignal } from '@angular/core/rxjs-interop';
import TranslatePipe from '../../pipes/translate.pipe';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-header',
  standalone: true,
  imports: [
    ButtonModule,
    RouterModule,
    TranslatePipe,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export default class HeaderComponent {

  public navigationSections = [
    {id: 'home', label: 'header.buttons.home', route: '/portfolio/home', icon: 'pi-home' },
    {id: 'about', label: 'header.buttons.about', route: '/portfolio/about', icon: 'pi-user' },
    {id: 'resume', label: 'header.buttons.resume', route: '/portfolio/resume', icon: 'pi-pencil' },
    {id: 'contact', label: 'header.buttons.contact', route: '/portfolio/contact', icon: 'pi-envelope' },
    {id: 'projects', label: 'header.buttons.projects', route: '/portfolio/projects', icon: 'pi-briefcase' },
  ];

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public fragment = toSignal(this.route.fragment);


}
