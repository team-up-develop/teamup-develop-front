import { Job } from '@/types/job';
import { User } from '@/types/user';
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

export interface ApplyStatus {
  createdAt: Date;
  deletedAt: Date | null;
  id: number;
  statusName: "応募" | "参加" | "落選" | "主宰"; 
  updatedAt: Date;
}