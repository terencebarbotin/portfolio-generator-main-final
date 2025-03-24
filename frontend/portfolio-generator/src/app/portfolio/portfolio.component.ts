import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioService } from '../services/portfolio.service';
import { PortfolioData } from '../types/portfolio-data.type';
import { CardComponent } from './card/card.component';
import { PortfolioHeaderComponent } from './portfolio-header/portfolio-header.component';

@Component({
  selector: 'app-portfolio',
  imports: [PortfolioHeaderComponent, CardComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly _portfolioService = inject(PortfolioService);
  private readonly _destroyRef = inject(DestroyRef);
  portfolioData: PortfolioData = {} as PortfolioData;
  resumeRoute: string | undefined = undefined;
  protected isLoaded = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log(id, 'id');
      this._portfolioService.getPortfolioData(id).subscribe({
        next: (data) => {
          this.isLoaded.set(true);
          console.log('data', data);
          this.portfolioData = data.data;
        },
        error: (error) => {
          console.error('error', error);
          this.router.navigate(['/']);
        },
      });
      this._portfolioService
        .generatePortfolioPDF(Number.parseInt(id))
        .subscribe((data) => {
          this.resumeRoute = data.data.url;
        });
    }
  }
}
