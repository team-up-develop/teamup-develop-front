import { m } from "@/master";
type APPLY_STATUS_APPLY = typeof m.APPLY_STATUS_APPLY;
type APPLY_STATUS_PARTICIPATE = typeof m.APPLY_STATUS_PARTICIPATE;
type APPLY_STATUS_REJECT = typeof m.APPLY_STATUS_REJECT;

export { APPLY_STATUS_APPLY, APPLY_STATUS_PARTICIPATE, APPLY_STATUS_REJECT };

type Maybe<T> = T | null;

interface Fetch<R> {
  msg: string;
  response: R;
  status: string;
}

type Job = {
  created_at: Date;
  deleted_at: Maybe<Date>;
  updated_at: Date;
  dev_end_date: Date;
  dev_start_date: Date;
  id: number;
  job_description: Maybe<string>;
  job_status_id: number;
  job_title: string;
  programing_frameworks: Framework[];
  programing_languages: Language[];
  skills: Skill[];
  recruitment_numbers: number;
  user: User;
  user_id: number;
};

type User = {
  bio: string;
  created_at: Date;
  deleted_at: Maybe<Date>;
  updated_at: Date;
  id: number;
  email: string;
  job: Maybe<Job>;
  learning_start_date: Date;
  twitter_account: Maybe<string>;
  github_account: Maybe<string>;
  birthday: Date;
  user_name: string;
  first_name: string;
  last_name: string;
  login_password: string;
  user_image_id: number;
  user_image: Maybe<{
    id: number;
    image_url: string;
  }>;
  programing_languages: Language[];
  programing_frameworks: Framework[];
  skills: Skill[];
};

type ManageJob = {
  id: number;
  updated_at: Date;
  apply_status_id: number;
  job_id: number;
  job: Job;
  user_id: number;
  user: User;
};

type ApplyJob = {
  id: number;
  updated_at: Date;
  apply_status_id: APPLY_STATUS_APPLY;
  job_id: number;
  job: Job;
  user_id: number;
  user: User;
};

type ParticipateJob = {
  id: number;
  updated_at: Date;
  apply_status_id: APPLY_STATUS_PARTICIPATE;
  job_id: number;
  job: Job;
  user_id: number;
  user: User;
};

type RejectJob = {
  id: number;
  updated_at: Date;
  apply_status_id: APPLY_STATUS_REJECT;
  job_id: number;
  job: Job;
  user_id: number;
  user: User;
};

type FavoriteJob = {
  job_id: number;
  job: Job;
  user_id: number;
  user: User;
};

type Language = {
  id: number;
  updated_at: Date;
  name: string;
};

type Framework = {
  id: number;
  updated_at: Date;
  name: string;
};

type Skill = {
  id: number;
  name: string;
  updated_at: Date;
};

type ImageFile = {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

export {
  Fetch,
  Job,
  User,
  ManageJob,
  ApplyJob,
  ParticipateJob,
  RejectJob,
  FavoriteJob,
  Language,
  Framework,
  Skill,
  ImageFile,
};
