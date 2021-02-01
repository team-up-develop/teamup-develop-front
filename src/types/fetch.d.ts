import {
  Job,
  ManageJob,
  ApplyJob,
  FavoriteJob,
  Language,
  Framework,
  Skill,
  Message,
} from "@/types/index";

export type FetchJobs = {
  msg: string;
  response: Job[];
  status: string;
};

export type FetchManageJobs = {
  msg: string;
  response: ManageJob[];
  status: string;
};

export type FetchFavoriteJob = {
  msg: string;
  response: FavoriteJob[];
  status: string;
};

export type FetchApplyJob = {
  msg: string;
  response: ApplyJob[];
  status: string;
};

export type FetchLanguages = {
  msg: string;
  response: Language[];
  status: string;
};

export type FetchFrameworks = {
  msg: string;
  response: Framework[];
  status: string;
};

export type FetchSkills = {
  msg: string;
  response: Skill[];
  status: string;
};

export type FetchMessage = {
  msg: string;
  response: Message[];
  status: string;
};
