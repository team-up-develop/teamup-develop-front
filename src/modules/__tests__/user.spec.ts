import {
  isEmailValid,
  isPasswordValid,
  isFormBaseInfo,
  isFormSkillInfo,
} from "@/modules/user";

describe("user.ts", () => {
  describe("isEmailValid", () => {
    it("emailが入力されていなければエラーは表示をしないこと", () => {
      const email = "";
      const result = isEmailValid(email);
      expect(result).toBeTruthy();
    });
    it("emailの形式でなければエラーをはくこと", () => {
      const email = "test";
      const result = isEmailValid(email);
      expect(result).toBeFalsy();
    });

    it("正しく入力がされること", () => {
      const email = "test@gmail.com";
      const result = isEmailValid(email);
      expect(result).toBeTruthy();
    });
  });

  describe("isPasswordValid", () => {
    it("passwordが入力されていなければエラーは表示をしないこと", () => {
      const password = "";
      const result = isPasswordValid(password);
      expect(result).toBeTruthy();
    });
    it("passwordの形式でなければエラーをはくこと", () => {
      const password = "not8Len";
      const result = isPasswordValid(password);
      expect(result).toBeFalsy();
    });

    it("正しく入力がされること", () => {
      const password = "8lengthPassword";
      const result = isPasswordValid(password);
      expect(result).toBeTruthy();
    });
  });

  describe("isFormBaseInfo", () => {
    it("ユーザー基本情報入力にて必要項目が未入力の場合ボタンを非活性", () => {
      const userName = "";
      const firstName = "";
      const lastName = "";
      const userBirthday = "";
      const learningStartDate = "";
      const password = "";
      const email = "";
      const result = isFormBaseInfo(
        userName,
        firstName,
        lastName,
        userBirthday,
        learningStartDate,
        password,
        email
      );
      expect(result).toBeFalsy();
    });

    it("正しく入力がされていればボタンは活性", () => {
      const userName = "teamUp";
      const firstName = "チームアップ";
      const lastName = "太郎";
      const userBirthday = "1995-12-10";
      const learningStartDate = "2020-01-01";
      const password = "password";
      const email = "xxx@gmail.com";
      const result = isFormBaseInfo(
        userName,
        firstName,
        lastName,
        userBirthday,
        learningStartDate,
        password,
        email
      );
      expect(result).toBeTruthy();
    });
  });

  describe("isFormSkillInfo", () => {
    it("ユーザースキル情報入力にて必要項目が未入力の場合ボタンを非活性", () => {
      const selectedLang: number[] = [];
      const selectedFramwork: number[] = [];
      const selectedSkill: number[] = [];
      const result = isFormSkillInfo(
        selectedLang,
        selectedFramwork,
        selectedSkill
      );
      expect(result).toBeFalsy();
    });

    it("正しく入力がされていればボタンは活性", () => {
      const selectedLang: number[] = [1, 2, 3];
      const selectedFramwork: number[] = [1, 2, 3];
      const selectedSkill: number[] = [1, 2, 3];
      const result = isFormSkillInfo(
        selectedLang,
        selectedFramwork,
        selectedSkill
      );
      expect(result).toBeTruthy();
    });
  });
});
