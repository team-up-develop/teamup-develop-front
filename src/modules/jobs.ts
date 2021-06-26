import { ManageJob } from "@/types/index";

// * 投稿案件か判別
export const checkSelfJob = (manageJob: ManageJob[], id: number) => {
  const selfJobIds: number[] = [];
  for (const selfJob of manageJob) {
    selfJobIds.push(selfJob.id);
  }
  const result: boolean = selfJobIds.includes(id);
  return result;
};
