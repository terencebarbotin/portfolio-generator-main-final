import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-portfolio-form-header',
  imports: [],
  templateUrl: './portfolio-form-header.component.html',
  styleUrl: './portfolio-form-header.component.css',
})
export class PortfolioFormHeaderComponent {
  steps = input.required<string[]>();
  activeStepIndex = input.required<number>();
  stepChanged = output<number>();

  selectStep(index: number) {
    this.stepChanged.emit(index);
  }
}
