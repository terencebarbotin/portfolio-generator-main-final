import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skill-tag',
  imports: [],
  templateUrl: './skill-tag.component.html',
  styleUrl: './skill-tag.component.css',
})
export class SkillTagComponent implements OnInit {
  value = input.required<string>();
  backgroundColor!: string;

  ngOnInit(): void {
    this.backgroundColor = this.generateColorFromString(this.value());
  }

  generateColorFromString(str: string): string {
    str = str.toUpperCase();
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      const lightValue = Math.min(value + 128, 255);
      color += ('00' + lightValue.toString(16)).substr(-2);
    }

    return color;
  }
}
