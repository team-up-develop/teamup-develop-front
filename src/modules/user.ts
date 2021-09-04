const isEmailValid = (email: string) => {
  if (!email) {
    return true;
  }
  const EMAIL_VALID = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return EMAIL_VALID.test(email!);
};

const isPasswordValid = (password: string) => {
  if (!password) {
    return true;
  }
  return password.length > 7 ? true : false;
};

const isFormBaseInfo = (
  userName: string,
  firstName: string,
  lastName: string,
  userBirthday: string,
  learningStartDate: string,
  password: string,
  email: string
) => {
  return userName &&
    firstName &&
    lastName &&
    userBirthday &&
    learningStartDate &&
    password &&
    email
    ? true
    : false;
};

const isFormSkillInfo = (
  selectedLang: number[],
  selectedFramwork: number[],
  selectedSkill: number[]
) => {
  return selectedLang.length !== 0 &&
    selectedFramwork.length !== 0 &&
    selectedSkill.length !== 0
    ? true
    : false;
};

const blankURL = (url: string) => {
  if (url.match("https://")) {
    return window.open(url, "_blank");
  }
  return window.open("https://" + url, "_blank");
};

export {
  isEmailValid,
  isPasswordValid,
  isFormBaseInfo,
  isFormSkillInfo,
  blankURL,
};
