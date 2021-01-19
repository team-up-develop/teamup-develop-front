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

// * 案件作成時 session1
export interface JobCreateData {
  jobTitle: string | null;  //? タイトル
  jobDescription: string | null; //? 詳細
  devStartDate: string | null; //? 開発開始
  devEndDate: string | null; //? 開発終了
}

// * 案件作成 session2
export interface JobCreateDataComp {
  userId: number; //? ログインUserId
  jobTitle: string | null;  //? タイトル
  jobDescription: string | null; //? 詳細
  devStartDate: Date;  //? 開始日
  devEndDate: Date; //? 終了日
  programingLanguage: {}[];  //? プログラミング言語
  programingFramework: {}[] ; //? フレームワーク
  skill: {}[]; //? その他開発スキル,
  recruitmentNumbers: number; //?募集人数
}

// * 応募 parameter
export interface ApplyParams {
  jobId: number;
  userId: number;
  applyStatusId: number; 
}

// * お気に入り parameter
export interface FavoriteParams {
  jobId: number;
  userId: number;
}