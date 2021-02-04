// * 案件作成時 session1 ここは API通信しないので キャメルケース
export interface JobCreateParamsFirst {
  jobTitle: string | null; //? タイトル
  jobDescription: string | null; //? 詳細
  devStartDate: string | null; //? 開発開始
  devEndDate: string | null; //? 開発終了
}

export interface JobCreateParamsSecond {
  user_id: number; //? ログインUserId
  job_title: string | null; //? タイトル
  job_description: string | null; //? 詳細
  dev_start_date: Date; //? 開始日
  dev_end_date: Date; //? 終了日
  programing_language_ids: {}[]; //? プログラミング言語
  programing_framework_ids: {}[]; //? フレームワーク
  skill_ids: {}[]; //? その他開発スキル,
  recruitment_numbers: number; //?募集人数
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
  jobId: number;
  userId: number;
  applyStatusId: 3;
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
