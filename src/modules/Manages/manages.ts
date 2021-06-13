import { m } from "@/master";

export const doneParticipate = (statusId: number) => {
  return statusId == m.APPLY_STATUS_PARTICIPATE ? true : false;
};

export const doneReject = (statusId: number) => {
  return statusId == m.APPLY_STATUS_REJECT ? true : false;
};
