type Maybe<T> = T | null;

export type Job = {
  created_at: Date;
  deleted_at: null | Date;
  dev_end_date: Date;
  dev_start_date: Date;
  id: number;
  job_description: Maybe<string>;
  job_status_id: number;
  job_title: string;
  programing_frameworks: Framework[];
  programing_languages: Language[];
  skills: Skill[];
  // publicationPeriod: Date;
  recruitment_numbers: number;
  updated_at: Date;
  // useMenter?: boolean;
  user: User;
  user_id: number;
};

export type User = {
  bio: string;
  created_at: Date;
  deleted_at: Maybe<Date>;
  id: number;
  job: null;
  learning_start_date: Date;
  twitter_account: Maybe<string>;
  github_account: Maybe<string>;
  updatedAt: Date;
  birthday: Date;
  login_name: string;
  login_password: string;
  user_name: string;
};

export type ManageJob = {
  apply_status_id: number;
  createdAt: Date;
  deletedAt: Maybe<Date>;
  id: number;
  job: Job;
  jobId: number;
  updatedAt: Date;
  user: User;
  userId: number;
};

export type ApplyJob = {
  id: number;
  updated_at: Date;
  apply_status_id: 2;
  job_id: number;
  job: Job;
  user_id: number;
  user: User;
};

export type FavoriteJob = {
  job_id: number;
  job: Job;
  user_id: number;
  user: User;
};

export type Language = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Maybe<Date>;
  name: string;
};

export type Framework = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Maybe<Date>;
  name: string;
};

export type Skill = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Maybe<Date>;
  name: string;
};

export type Message = {
  id: number;
  job: Job;
  job_id: number;
  message: string;
  updatedAt: Date;
  user: User;
  user_id: number;
  createdAt: Date;
};
