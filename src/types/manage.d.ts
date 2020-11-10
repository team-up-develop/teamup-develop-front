import { Job } from '@/types/jobs';
export interface ManageJob {
  applyStatus: {};
  applyStatusId: number;
  createdAt: Date;
  deletedAt: null | Date;
  id: number;
  job: Job;
  jobId: number;
  updatedAt: Date;
  user: {};
  userId: number;
}