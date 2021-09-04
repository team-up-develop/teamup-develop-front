import {
  APPLY_STATUS_APPLY,
  APPLY_STATUS_PARTICIPATE,
  APPLY_STATUS_REJECT,
} from "@/types";

type Maybe<T> = T | null;
interface JobCreateParamsFirst {
  jobTitle: string;
  jobDescription: Maybe<string>;
  devStartDate: string;
  devEndDate: string;
}

interface JobCreateParamsSecond {
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

interface ApplyParams {
  job_id: number;
  user_id: number;
  apply_status_id: APPLY_STATUS_APPLY;
}

interface FavoriteParams {
  job_id: number;
  user_id: number;
}

interface ParticipateParams {
  id: number;
  job_id: number;
  user_id: number;
  apply_status_id: APPLY_STATUS_PARTICIPATE;
  updated_at: string;
}

interface RejectParams {
  id: number;
  job_id: number;
  user_id: number;
  apply_status_id: APPLY_STATUS_REJECT;
  updated_at: string;
}

interface RegisterSessionFirstParams {
  userName: string;
  lastName: string;
  firstName: string;
  password: string;
  email: string;
  userBirthday: string;
  learningStartDate: string;
}

interface RegisterSessionSecondParams {
  programingLanguage: {}[];
  programingFramework: {}[];
  skill: {}[];
  bio: string;
  github: Maybe<string>;
  twitter: Maybe<string>;
}

interface RegisterCompleteParams {
  user_name: string;
  last_name: string;
  first_name: string;
  login_password: string;
  email: string;
  learning_start_date: Date;
  birthday: Date;
  programing_language_ids: {}[];
  programing_framework_ids: {}[];
  skill_ids: {}[];
  user_image: Maybe<{
    image_data: string;
    file_name: string;
  }>;
  bio: Maybe<string>;
  github_account: Maybe<string>;
  twitter_account: Maybe<string>;
}

interface messageParams {
  message: string;
  user_id: number;
  job_id: number;
}

interface EditProfileParams {
  id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  login_password: string;
  email: string;
  learning_start_date: Date;
  bio: Maybe<string>;
  github_account: Maybe<string>;
  twitter_account: Maybe<string>;
  updated_at: Date;
  birthday: Date;
  programing_language_ids: {}[];
  programing_framework_ids: {}[];
  skill_ids: {}[];
  user_image: Maybe<{
    image_data: string;
    file_name: string;
  }>;
}

export {
  JobCreateParamsFirst,
  JobCreateParamsSecond,
  ApplyParams,
  FavoriteParams,
  ParticipateParams,
  RejectParams,
  RegisterSessionFirstParams,
  RegisterSessionSecondParams,
  RegisterCompleteParams,
  messageParams,
  EditProfileParams,
};
