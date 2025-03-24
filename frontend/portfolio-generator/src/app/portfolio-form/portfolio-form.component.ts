import { Component, inject, OnDestroy, signal } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PortfolioService } from '../services/portfolio.service';
import { ErrorToastComponent } from '../shared/ui/error-toast/error-toast.component';
import { PortfolioData } from '../types/portfolio-data.type';
import { ExperienceCardComponent } from './experience-card/experience-card.component';
import { PortfolioFormHeaderComponent } from './portfolio-form-header/portfolio-form-header.component';
import { SkillTagComponent } from './skill-tag/skill-tag.component';

@Component({
  selector: 'app-portfolio-form',
  imports: [
    ReactiveFormsModule,
    PortfolioFormHeaderComponent,
    SkillTagComponent,
    ExperienceCardComponent,
    ErrorToastComponent,
  ],
  providers: [ErrorToastComponent],
  templateUrl: './portfolio-form.component.html',
  styleUrl: './portfolio-form.component.css',
})
export class PortfolioFormComponent implements OnDestroy {
  private readonly _portfolioService: PortfolioService =
    inject(PortfolioService);
  private readonly router = inject(Router);
  displayToast$$ = signal<boolean>(false);
  private _timeoutId: any;

  steps = ['Personal', 'Skills', 'Professional Experiences', 'Projects'];

  currentStepIndex = 0;

  portfolioForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    bio: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    jobRole: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.email, Validators.required],
    }),
    github: new FormControl('', { nonNullable: true }),
    linkedin: new FormControl('', { nonNullable: true }),
    skills: new FormArray<FormControl>([]),
    experiences: new FormArray<FormGroup>([]),
    newExperience: new FormGroup({
      title: new FormControl('', { nonNullable: true }),
      description: new FormControl('', { nonNullable: true }),
      skills: new FormControl('', { nonNullable: true }),
      isProject: new FormControl(false, { nonNullable: true }),
    }),
  });

  mockPortfolioData: PortfolioData = {
    name: 'John Doe',
    bio: 'I am a software engineer with a passion for developing scalable and user-friendly applications.',
    jobRole: 'Software Engineer',
    email: 'john@doe.com',
    github: 'github.com/john-doe',
    linkedin: 'linkedin.com/in/john-doe',
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Angular'],
    experiences: [
      {
        title: 'Software Engineer',
        description:
          'Worked on a microservices-based architecture to support enterprise-scale applications, using Node.js and Docker for containerization.',
        skills: ['JavaScript', 'Node.js', 'Docker'],
        isProject: false,
      },
      {
        title: 'Project: E-commerce Platform',
        description:
          'Developed a fully functional e-commerce application with React and Redux, including integration with payment gateways and inventory management systems.',
        skills: ['React', 'Redux', 'Node.js'],
        isProject: true,
      },
      {
        title: 'Full Stack Developer',
        description:
          'Maintained and enhanced a SaaS product, implementing new features and optimizing the user experience through Angular and Express.',
        skills: ['TypeScript', 'Angular', 'Express'],
        isProject: false,
      },
      {
        title: 'Project: Mobile App Development',
        description:
          'Led the development of a cross-platform mobile app using React Native, streamlining the customer experience and boosting engagement.',
        skills: ['React Native', 'JavaScript', 'Firebase'],
        isProject: true,
      },
      {
        title: 'Senior Software Engineer',
        description:
          'Managed a team of developers at TechCorp, overseeing the transition to cloud-based solutions and improving application performance and scalability.',
        skills: ['JavaScript', 'Node.js', 'AWS', 'Docker'],
        isProject: false,
      },
    ],
  };

  dissmissToast() {
    this.displayToast$$.set(false);
    clearTimeout(this._timeoutId);
  }

  onSubmit() {
    if (this.portfolioForm.invalid) {
      if (this._timeoutId) {
        clearTimeout(this._timeoutId);
      }
      this.displayToast$$.set(true);
      this._timeoutId = setTimeout(() => {
        this.displayToast$$.set(false);
      }, 5300);
      return;
    }
    console.log(this.portfolioForm.value);
    this._portfolioService
      .addPortfolioData({
        ...this.portfolioForm.getRawValue(),
        experiences: (
          this.portfolioForm.get('experiences') as FormArray
        ).controls.map((control) => ({
          title: control.get('title')?.value,
          description: control.get('description')?.value,
          skills: control.get('skills')?.value,
          isProject: control.get('isProject')?.value,
        })),
      } as PortfolioData)
      .subscribe({
        next: (response) => {
          console.log('response', response);
          const id = response.data.id;
          this.router.navigate(['/portfolio', id]);
        },
        error: (error) => {
          console.error('error', error);
        },
      });
  }

  onStepChanged(index: number) {
    this.currentStepIndex = index;
  }

  get experienceItems() {
    return (this.portfolioForm.get('experiences') as FormArray).controls.filter(
      (control) => !control.get('isProject')?.value
    );
  }

  get projectItems() {
    return (this.portfolioForm.get('experiences') as FormArray).controls.filter(
      (control) => control.get('isProject')?.value
    );
  }

  addItemToFormArray(formArray: FormArray, value: string) {
    formArray.push(new FormControl(value, { nonNullable: true }));
  }

  removeItemFromFormArray(formArray: FormArray, index: number) {
    formArray.removeAt(index);
  }

  addExperience(isProject: boolean) {
    const newExpGroup = this.portfolioForm.get('newExperience') as FormGroup;

    const skillsString: string = newExpGroup.get('skills')?.value;
    const skillsArray = skillsString
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s !== '');

    const exp = new FormGroup({
      title: new FormControl(newExpGroup.get('title')?.value, {
        nonNullable: true,
      }),
      description: new FormControl(newExpGroup.get('description')?.value, {
        nonNullable: true,
      }),
      skills: new FormControl(skillsArray, { nonNullable: true }),
      isProject: new FormControl(isProject, { nonNullable: true }),
    });

    (this.portfolioForm.get('experiences') as FormArray).push(exp);

    newExpGroup.reset({
      title: '',
      description: '',
      skills: '',
      isProject: false,
    });
  }

  ngOnDestroy() {
    clearTimeout(this._timeoutId);
  }
}
