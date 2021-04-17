import {
  Job,
  ManageJob,
  ApplyJob,
  ParticipateJob,
  RejectJob,
  FavoriteJob,
  Language,
  Framework,
  Skill,
  Message,
  User,
} from "@/types/index";

type FetchJobs = {
  msg: string;
  response: Job[];
  status: string;
};

type FetchJob = {
  msg: string;
  response: Job;
  status: string;
};

type FetchManageJobs = {
  msg: string;
  response: ManageJob[];
  status: string;
};

type FetchFavoriteJob = {
  msg: string;
  response: FavoriteJob[];
  status: string;
};
//* apply_status_id=1
type FetchApplyJob = {
  msg: string;
  response: ApplyJob[];
  status: string;
};
//* apply_status_id=2
type FetchParticipateJob = {
  msg: string;
  response: ParticipateJob[];
  status: string;
};
//* apply_status_id=3
type FetchRejectJob = {
  msg: string;
  response: RejectJob[];
  status: string;
};

type FetchLanguages = {
  msg: string;
  response: Language[];
  status: string;
};

type FetchFrameworks = {
  msg: string;
  response: Framework[];
  status: string;
};

type FetchSkills = {
  msg: string;
  response: Skill[];
  status: string;
};

type FetchUser = {
  msg: string;
  response: User;
  status: string;
};

type FetchMessage = {
  msg: string;
  response: Message[];
  status: string;
};

export {
  FetchJobs,
  FetchJob,
  FetchManageJobs,
  FetchFavoriteJob,
  FetchApplyJob,
  FetchParticipateJob,
  FetchRejectJob,
  FetchLanguages,
  FetchFrameworks,
  FetchSkills,
  FetchUser,
  FetchMessage,
};
