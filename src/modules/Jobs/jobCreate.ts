export const isFormFirst = (
  jobTitle?: string,
  devStartDate?: string,
  devEndDate?: string
) => {
  return jobTitle && devStartDate && devEndDate ? true : false;
};

export const minStartDate = (devStartDate: string, devEndDate: string) => {
  if (devStartDate && devEndDate) {
    const a = new Date(devStartDate);
    const b = new Date(devEndDate);
    return a > b ? true : false;
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
