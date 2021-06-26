import { dayjs } from "@/libs/dayjs";

export const isFormFirst = (
  jobTitle?: string,
  devStartDate?: string,
  devEndDate?: string
) => {
  return jobTitle && devStartDate && devEndDate ? true : false;
};

export const afterDevEndDate = (devStartDate: string, devEndDate: string) => {
  if (devStartDate && devEndDate) {
    return dayjs(devStartDate).isAfter(dayjs(devEndDate));
  }
  return false;
};

export const beforeToDate = (devStartDate: string) => {
  if (devStartDate) {
    return dayjs(devStartDate).isBefore(dayjs());
  }
  return false;
};

export const minPeriod = (devStartDate: string, devEndDate: string) => {
  if (devStartDate && devEndDate) {
    return dayjs(devEndDate).diff(dayjs(devStartDate), "month") > 0
      ? false
      : true;
  }
  return false;
};

export const isFormSecond = (
  selectedLang: number[],
  selectedFramwork: number[],
  selectedSkill: number[],
  recruitNumber: string | number,
  jobStatusId: string | number
) => {
  return selectedLang.length !== 0 &&
    selectedFramwork.length !== 0 &&
    selectedSkill.length !== 0 &&
    recruitNumber !== "" &&
    jobStatusId !== ""
    ? true
    : false;
};
