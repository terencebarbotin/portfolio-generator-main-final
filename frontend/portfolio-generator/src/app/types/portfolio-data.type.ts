export interface PortfolioData {
  name: string;
  bio: string;
  jobRole: string;
  email: string;
  github: string;
  linkedin: string;
  skills: string[];
  experiences: Experience[];
}

export interface ResponseData {
  data: any;
  message: string;
  status: string;
}

export interface Experience {
  title: string;
  description: string;
  skills: string[];
  isProject: boolean;
}
