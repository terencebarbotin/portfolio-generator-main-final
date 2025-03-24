import { Routes } from '@angular/router';
import { PortfolioFormComponent } from './portfolio-form/portfolio-form.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

export const routes: Routes = [
  { path: '', component: PortfolioFormComponent },
  { path: 'portfolio/:id', component: PortfolioComponent },
];
