import { Job } from '@/types/job';
import { User } from '@/types/user';

// * 管理案件
export interface ManageJob {
  applyStatus: ApplyStatus;
  applyStatusId: number;
  createdAt: Date;
  deletedAt: null | Date;
  id: number;
  job: Job;
  jobId: number;
  updatedAt: Date;
  user: User;
  userId: number;
}

// *応募ステータス
export interface ApplyStatus {
  createdAt: Date;
  deletedAt: Date | null;
  id: number;
  statusName: StatusName; 
  updatedAt: Date;
}

// * ステータスの名前
enum StatusName {
  応募 = '応募',
  参加 = '参加',
  落選 = '落選',
  主宰 = '主宰'
}

