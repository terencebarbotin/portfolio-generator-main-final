import { Component, input } from '@angular/core';
import { SkillTagComponent } from '../skill-tag/skill-tag.component';

@Component({
  selector: 'app-experience-card',
  imports: [SkillTagComponent],
  templateUrl: './experience-card.component.html',
  styleUrl: './experience-card.component.css',
})
export class ExperienceCardComponent {
  title = input.required<string>();
  description = input.required<string>();
  skills = input.required<string[]>();

  trackBySkill(index: number, skill: string): string {
    return skill;
  }
}
