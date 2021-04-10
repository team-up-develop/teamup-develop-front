type Maybe<T> = T | null;
export interface JobCreateParamsFirst {
  jobTitle: string;
  jobDescription: Maybe<string>;
  devStartDate: string;
  devEndDate: string;
}

export interface JobCreateParamsSecond {
  user_id: number;
  job_title: string;
  job_description: Maybe<string>;
  dev_start_date: Date;
  dev_end_date: Date;
  programing_language_ids: {}[];
  programing_framework_ids: {}[];
  skill_ids: {}[];
  recruitment_numbers: number;
  job_status_id: number;
}

export interface ApplyParams {
  job_id: number;
  user_id: number;
  apply_status_id: number;
}

export interface FavoriteParams {
  job_id: number;
  user_id: number;
}

export interface ParticipateParams {
  id: number;
  job_id: number;
  user_id: number;
  apply_status_id: 2;
  updated_at: string;
}

export interface RejectParams {
  id: number;
  job_id: number;
  user_id: number;
  apply_status_id: 3;
  updated_at: string;
}

export interface RegisterSessionFirstParams {
  userName: string;
  lastName: string;
  firstName: string;
  password: string;
  email: string;
  userBirthday: string;
  learningStartDate: string;
}

export interface RegisterSessionSecondParams {
  programingLanguage: {}[];
  programingFramework: {}[];
  skill: {}[];
  github: Maybe<string>;
  twitter: Maybe<string>;
}

export interface messageParams {
  message: string;
  user_id: number;
  job_id: number;
}

export interface EditProfileParams {
  id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  learning_start_date: Date;
  bio: Maybe<string>;
  github_account: Maybe<string>;
  twitter_account: Maybe<string>;
  updated_at: Date;
  birthday: Date;
  login_password: string;
  programing_language_ids: {}[];
  programing_framework_ids: {}[];
  skill_ids: {}[];
}
