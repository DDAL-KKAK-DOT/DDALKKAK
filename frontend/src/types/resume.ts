export interface InputResumeProfileRequest {
  name: string;
  english_name: string;
  education: string[];
  desired_role: string;
  contact: string;
  activity_links: string[];
}

export type ProfileInfo = {
  name: string;
  english_name: string;
  contact: string;
  desired_role: string;
  educations: string[];
  activity_links: string[];
};

export type ShortIntro = string;

export type Skill = string;

export type Project = {
  name: string;
  period: string;
  role: string;
  description: string;
  honor: string;
};

export type Career = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export type Education = {
  name: string;
  period: string;
  description: string;
};

export type Club = {
  name: string;
  period: string;
  description: string;
};

export interface AIResumeResponse {
  profileInfo: ProfileInfo;
  shortIntro: ShortIntro;
  skills: Skill[];
  projects: Project[];
  careers: Career[];
  educations: Education[];
  clubs: Club[];
}
