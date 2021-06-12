import { ManageJob } from "@/types/index";

// * 自分の案件か判別する
export const checkSelfJob = (manageJob: ManageJob[], id: number) => {
  const selfJobIds: number[] = [];
  for (const selfJob of manageJob) {
    selfJobIds.push(selfJob.id);
  }
  const result: boolean = selfJobIds.includes(id);
  return result;
};
