import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'portfolio',
    title: 'Portfolio',
    loadChildren: () => import('./portfolio/portfolio.routes').then(routes => routes.portfolioRoutes),
  },
  {
    path: '**',
    redirectTo: 'portfolio'
  }
];
