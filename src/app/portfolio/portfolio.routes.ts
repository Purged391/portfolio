import { provideRouter, Routes } from '@angular/router';

export const portfolioRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./portfolio.component'),
    children: [
      {
        path: 'home',
        title: 'Home',
        loadComponent: () => import('./pages/home/home.component'),
      },
      {
        path: 'contact',
        title: 'Contact',
        loadComponent: () => import('./pages/contact/contact.component'),
      },
      {
        path: 'projects',
        title: 'Projects',
        loadComponent: () => import('./pages/projects/projects.component'),
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  }
];


export default provideRouter(portfolioRoutes);
