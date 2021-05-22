//* env file デバッグ
// console.log(process.env);
// 移行前に接続がしたい場合
// port: 8888
export const API_URL = process.env.VUE_APP_API_BASE_URL;
export const AUTH_URL = process.env.VUE_APP_API_AUTH_URL;

//* 応募のステータス
// 1: 応募
// 2: 参加
// 3: 拒否
// 4: 主催
const APPLY_STATUS_APPLY = 1 as const;
const APPLY_STATUS_PARTICIPATE = 2 as const;
const APPLY_STATUS_REJECT = 3 as const;
const APPLY_STATUS_SELF = 4 as const;
//* 案件フェーズ
// 1: 新規募集
// 2: 追加募集
const JOB_STATUS_NEW = 1 as const;
const JOB_STATUS_ADD = 2 as const;

// * エラーステータス
const STATUS_BADREQUEST_ERR = "A400" as const;
const STATUS_UNAUTHORIZED = "A401" as const;
const STATUS_NOTFOUND_ERR = "A404" as const;
const STATUS_SERVER_ERR = "A500" as const;

export const m = {
  APPLY_STATUS_APPLY,
  APPLY_STATUS_PARTICIPATE,
  APPLY_STATUS_REJECT,
  APPLY_STATUS_SELF,
  JOB_STATUS_NEW,
  JOB_STATUS_ADD,
  STATUS_BADREQUEST_ERR,
  STATUS_UNAUTHORIZED,
  STATUS_NOTFOUND_ERR,
  STATUS_SERVER_ERR,
};

export type Md = {
  label: string;
  value: string;
};

export const md = {
  optionsRecruitNumber: [
    { label: "1名", value: "1" },
    { label: "2名", value: "2" },
    { label: "3名", value: "3" },
    { label: "4名", value: "4" },
    { label: "5名", value: "5" },
  ],
  optionsJobStatus: [
    { label: "新規募集", value: "1" },
    { label: "追加募集", value: "2" },
  ],
  userTabs: [
    { id: 0, tabName: "スキル情報" },
    { id: 1, tabName: "投稿案件" },
  ],
  selfTabs: [
    { id: 0, tabName: "スキル情報" },
    { id: 1, tabName: "投稿案件" },
    { id: 2, tabName: "基本情報" },
  ],
  editProfileTabs: [
    { id: 0, tabName: "スキル情報" },
    { id: 1, tabName: "基本情報" },
  ],
};
