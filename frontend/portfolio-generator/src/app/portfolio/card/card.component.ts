import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  title = input.required<string>();
  description = input.required<string>();
  skills = input<string[]>();
  type = input<string>();
}
