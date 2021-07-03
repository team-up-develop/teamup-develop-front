import { ManageJob } from "@/types/index";

// * 投稿案件か判別
export const checkSelfJob = (manageJob: ManageJob[], id: number) => {
  return manageJob.map((v) => v.id).includes(id);
};
