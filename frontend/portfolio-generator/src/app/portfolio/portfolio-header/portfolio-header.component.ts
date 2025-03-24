import { Component, input } from '@angular/core';
import { PortfolioData } from '../../types/portfolio-data.type';

@Component({
  selector: 'app-portfolio-header',
  imports: [],
  templateUrl: './portfolio-header.component.html',
  styleUrl: './portfolio-header.component.css',
})
export class PortfolioHeaderComponent {
  resumeRoute = input<string>();
  portfolioData = input<PortfolioData>();
}
