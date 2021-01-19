export interface Language {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  programing_language_name: string;
}

export interface Framework {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  programing_framework_name: string;
}

export interface Skill {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  skill_name: string;
}

export type FetchLanguages = {
  msg: string;
  response: Language[]
  status: string;
}

export type FetchFrameworks = {
  msg: string;
  response: Framework[]
  status: string;
}

export type FetchSkills = {
  msg: string;
  response: Skill[]
  status: string;
}