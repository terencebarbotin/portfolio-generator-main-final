import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillTagComponent } from './skill-tag.component';

describe('SkillTagComponent', () => {
  let component: SkillTagComponent;
  let fixture: ComponentFixture<SkillTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillTagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
