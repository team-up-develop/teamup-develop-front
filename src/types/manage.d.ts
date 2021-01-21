import { Job } from '@/types/job';
import { User } from '@/types/user';
// import { m } from '@/master'

export type ManageJob = {
  applyStatus: ApplyStatus;
  apply_status_id: number;
  createdAt: Date;
  deletedAt: null | Date;
  id: number;
  job: Job;
  jobId: number;
  updatedAt: Date;
  user: User;
  userId: number;
}

export type FetchManageJobs = {
  msg: string;
  response: ManageJob[]
  status: string;
}
// *応募ステータス
export interface ApplyStatus {
  createdAt: Date;
  deletedAt: Date | null;
  id: number;
  statusName: StatusName; 
  updatedAt: Date;
}

export interface ParticipateParams {
  jobId: number;
  userId: number;
  applyStatusId: 2;
}

export interface RejectParams {
  jobId: number;
  userId: number;
  applyStatusId: 3;
}

