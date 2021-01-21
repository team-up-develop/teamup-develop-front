import { Job } from '@/types/job';
import { User } from '@/types/user';

export type Message = {
  createdAt: Date;
  deletedAt: Date | null;
  id: number;
  job: Job;
  jobId: number;
  message: string;
  updatedAt: Date;
  user: User;
  userId: number;
}

export interface messageParams {
  message: string;
  userID: number;
  jobID: number;
}

