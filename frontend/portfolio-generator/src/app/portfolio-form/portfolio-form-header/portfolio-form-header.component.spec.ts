import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioFormHeaderComponent } from './portfolio-form-header.component';

describe('PortfolioFormHeaderComponent', () => {
  let component: PortfolioFormHeaderComponent;
  let fixture: ComponentFixture<PortfolioFormHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioFormHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioFormHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
