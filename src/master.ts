// import router from './router';
// import Vuex from '@/store/index';
import dayjs from 'dayjs';

//* 応募のステータス
// 1: 応募
// 2: 参加
// 3: 拒否
// 4: 主催
const APPLY_STATUS_APPLY = 1 as const;
const APPLY_STATUS_PARTICIPATE = 2 as const;
const APPLY_STATUS_REJECT = 3 as const;
const APPLY_STATUS_SELF = 4 as const;

export const m = {
  APPLY_STATUS_APPLY,
  APPLY_STATUS_PARTICIPATE,
  APPLY_STATUS_REJECT,
  APPLY_STATUS_SELF
}
export const API_URL = 'http://localhost:8888/api/v1';

export const truncate = (value: string, num: number) => {
  const over = "...";
  if (value.length <= num) {
    return value;
  }
  return value.substring(0, num) + over;
}

export const dayJs = (value: string, format: string) => {
  return dayjs(value).format(format);
}