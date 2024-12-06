import { Component, computed, Inject, inject, PLATFORM_ID } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import TranslatePipe from '../../pipes/translate.pipe';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LanguajeService } from '../../portfolio/services/languaje.service';

@Component({
    selector: 'shared-header',
    imports: [
        RouterModule,
        TranslatePipe,
        CommonModule,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export default class HeaderComponent {

  private platformId = inject(PLATFORM_ID);

  public navigationSections = [
    {id: 'home', label: 'header.buttons.home', route: '/portfolio/home', icon: 'pi-home' },
    {id: 'about', label: 'header.buttons.about', route: '/portfolio/about', icon: 'pi-user' },
    {id: 'resume', label: 'header.buttons.resume', route: '/portfolio/resume', icon: 'pi-pencil' },
    {id: 'contact', label: 'header.buttons.contact', route: '/portfolio/contact', icon: 'pi-envelope' },
    {id: 'projects', label: 'header.buttons.projects', route: '/portfolio/projects', icon: 'pi-briefcase' },
  ];

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public fragmentRoute = toSignal(this.route.fragment);
  public fragment = computed(() => {
    const fragment = this.fragmentRoute();
    if (!fragment) {
      if(isPlatformBrowser(this.platformId)){
        const fragmentLocalStorage = localStorage.getItem('fragment');
        if(fragmentLocalStorage){
          this.router.navigate([this.navigationSections.find(section => section.id === fragmentLocalStorage)!.route], {fragment: fragmentLocalStorage});
          return fragmentLocalStorage;
        }
      }
      return 'home';
    }
    localStorage.setItem('fragment', fragment);
    return fragment;
  });
  private languajeService = inject(LanguajeService);
  public currentLanguage = this.languajeService.languaje;

  public setLanguage(lang: 'ES'|'EN'): void {
    this.languajeService.languaje = lang;
    this.currentLanguage = lang;
    localStorage.setItem('language', lang);
    window.location.reload();
  }

}
