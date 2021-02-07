// * 案件作成時 session1 ここは API通信しないので キャメルケース
export interface JobCreateParamsFirst {
  jobTitle: string;
  jobDescription: string | null;
  devStartDate: string;
  devEndDate: string;
}

export interface JobCreateParamsSecond {
  user_id: number;
  job_title: string;
  job_description: string | null;
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
  job_id: number;
  user_id: number;
  apply_status_id: 2;
  updated_at: string;
}

export interface RejectParams {
  job_id: number;
  user_id: number;
  apply_status_id: 3;
  updated_at: string;
}

export interface RegisterSessionParams {
  userName: string;
  nickName: string;
  userBirthday: string;
  learningStartDate: string;
}

export interface messageParams {
  message: string;
  user_id: number;
  job_id: number;
}

export interface EditProfileParams {
  id: number;
  user_name: string;
  learning_start_date: Date;
  bio: string | null;
  github_account: string | null;
  twitter_account: string | null;
  updated_at: Date;
  birthday: Date;
  login_name: string;
  login_password: string;
  programing_language_ids: {}[];
  programing_framework_ids: {}[];
  skill_ids: {}[];
}
