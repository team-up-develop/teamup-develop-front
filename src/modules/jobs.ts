import { ManageJob } from "@/types/index";
import { m } from "@/master";

// * 投稿案件か判別
const checkSelfJob = (manageJob: ManageJob[], id: number) => {
  return manageJob.map((v) => v.id).includes(id);
};

// * 新規募集
const isStatusNew = (jobStatusId: number) => {
  return jobStatusId == m.JOB_STATUS_NEW ? true : false;
};

export { checkSelfJob, isStatusNew };
