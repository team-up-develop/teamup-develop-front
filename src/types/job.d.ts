import { User } from '@/types/user';
import { Language } from '@/types/index';
import { Framework } from '@/types/index';
import { Skill } from '@/types/index';

// * 案件
export type Job = {
  created_at: Date;
  deleted_at: null | Date;
  dev_end_date: Date;
  dev_start_date: Date;
  id: number;
  job_description: string | null;
  job_status_id: number; //TODO: あってる？
  job_title: string;
  programing_framework_responses: Framework[];
  programing_language_responses: Language[];
  skill_responses: Skill[];
  // publicationPeriod: Date;
  recruitment_numbers: number;
  updated_at: Date;
  // useMenter?: boolean;
  user: User;
  user_id: number;
} | {};

export type FetchJobs = {
  msg: string;
  response: Job[]
  status: string;
}
// * 案件作成時 session1 ここは API通信しないので キャメルケース
export interface JobCreateParamsFirst {
  jobTitle: string | null;  //? タイトル
  jobDescription: string | null; //? 詳細
  devStartDate: string | null; //? 開発開始
  devEndDate: string | null; //? 開発終了
}

export interface JobCreateParamsSecond {
  user_id: number; //? ログインUserId
  job_title: string | null;  //? タイトル
  job_description: string | null; //? 詳細
  dev_start_date: Date;  //? 開始日
  dev_end_date: Date; //? 終了日
  programing_language_ids: {}[];  //? プログラミング言語
  programing_framework_ids: {}[] ; //? フレームワーク
  skill_ids: {}[]; //? その他開発スキル,
  recruitment_numbers: number; //?募集人数
  job_status_id: 1;
}

export interface ApplyParams {
  jobId: number;
  userId: number;
  applyStatusId: number; 
}

export interface FavoriteParams {
  job_id: number;
  user_id: number;
}