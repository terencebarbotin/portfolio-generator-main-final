import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_PORTFOLIO, URL_RESUME } from '../server-const';
import { PortfolioData, ResponseData } from '../types/portfolio-data.type';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private readonly baseUrlPortfolio: string = URL_PORTFOLIO;
  private readonly baseUrlResume: string = URL_RESUME;

  private readonly http: HttpClient = inject(HttpClient);

  addPortfolioData(data: PortfolioData): Observable<any> {
    return this.http.post(`${this.baseUrlPortfolio}/portfolios`, data);
  }

  getPortfolioData(id: string): Observable<ResponseData> {
    return this.http.get<ResponseData>(
      `${this.baseUrlPortfolio}/portfolios/${id}`
    );
  }

  generatePortfolioPDF(id: number): Observable<any> {
    return this.http.post(`${this.baseUrlResume}/resume/generate/${id}`, {});
  }
}
