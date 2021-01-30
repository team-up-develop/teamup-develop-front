// import router from './router';
// import Vuex from '@/store/index';
import dayjs from "dayjs";

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

export const m = {
  APPLY_STATUS_APPLY,
  APPLY_STATUS_PARTICIPATE,
  APPLY_STATUS_REJECT,
  APPLY_STATUS_SELF,
  JOB_STATUS_NEW,
  JOB_STATUS_ADD,
};
// 移行前に接続がしたい場合
// port: 8888
export const API_URL = "http://localhost:8090/api/v1";

export const catchError = (error: any) => {
  const { status, statusText } = error.response;
  return console.log(
    `エラーが発生しました。お問合せください。\n HTTP Status: ${status} ${statusText} \n メッセージ: ${error.response.data.message}`
  );
};

export const truncate = (value: string, num: number) => {
  const over = "...";
  if (value.length <= num) {
    return value;
  }
  return value.substring(0, num) + over;
};

export const dayJs = (value: string, format: string) => {
  return dayjs(value).format(format);
};
