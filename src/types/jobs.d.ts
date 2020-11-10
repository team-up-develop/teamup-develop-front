// * 案件
export interface Job {
  createdAt: Date;
  deletedAt: null | Date;
  devEndDate: Date;
  devStartDate: Date;
  id: number;
  jobDescription: string | null;
  jobStatusId: 1;
  jobTitle: string;
  programingFramework: [];
  programingLanguage: [];
  publicationPeriod: Date;
  recruitmentNumbers: number;
  skill: [];
  updatedAt: Date;
  useMenter?: boolean;
  user: {};
  userId: number;
}

// * 案件作成時 session1 
export interface JobCreateData {
  jobTitle: string | null;  //? タイトル
  jobDescription: string | null; //? 詳細
  devStartDate: string | null; //? 開発開始
  devEndDate: string | null; //? 開発終了
}

// * 案件作成 session2 完了
export interface JobCreateDataComp {
  userId: number, //? ログインUserId
  jobTitle : string | null,  //? タイトル
  jobDescription: string | null, //? 詳細
  devStartDate: Date,  //? 開始日
  devEndDate: Date, //? 終了日
  programingLanguage: {}[],  //? プログラミング言語
  programingFramework: {}[] , //? フレームワーク
  skill: {}[], //? その他開発スキル,
  recruitmentNumbers: number //?募集人数
}