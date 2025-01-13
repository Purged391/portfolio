import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import HomeComponent from "../../components/home/home.component";
import AboutComponent from "../../components/about/about.component";
import ResumeComponent from "../../components/resume/resume.component";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
    selector: 'page-home',
    imports: [HomeComponent, AboutComponent, ResumeComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export default class HomePageComponent implements OnInit, OnDestroy {

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private navigationEndSubscription!: Subscription;

  private lastFragment = signal<string>('');

  public ngOnInit() {
    this.navigationEndSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.scrollToFragment();
    });
  }

  public ngAfterViewChecked() {
    this.scrollToFragment();
  }
  public ngOnDestroy() {
    if (this.navigationEndSubscription) {
      this.navigationEndSubscription.unsubscribe();
    }
  }

  private scrollToFragment() {
    const fragment = this.route.snapshot.fragment;
    if (fragment && this.lastFragment() !== fragment) {
      this.lastFragment.set(fragment);
      setTimeout(() => {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    }
  }
}
