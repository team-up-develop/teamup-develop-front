// import { shallowMount } from "@vue/test-utils";
import {
  isFormFirst,
  minStartDate,
  isFormSecond,
} from "@/modules/Jobs/jobCreate";

describe("jobCreate.ts", () => {
  describe("isFormFirst", () => {
    it("必須項目の案件タイトル, 開発開始, 開発終了が入力されていればボタンが活性", () => {
      const jobTitle = "サンプル案件タイトル";
      const devStartDate = "2021-10-12";
      const devEndDate = "2021-12-18";
      const result = isFormFirst(jobTitle, devStartDate, devEndDate);

      expect(result).toBe(true);
    });
    it("必須項目が入力されていなければ、ボタンはdisabled", () => {
      const jobTitle = "";
      const devStartDate = "";
      const devEndDate = "";
      const result = isFormFirst(jobTitle, devStartDate, devEndDate);

      expect(result).toBe(false);
    });
  });

  describe("minStartDate", () => {
    it("開発開始日より開発終了日の方が前なら「開始日が終了日より前です」を表示", () => {
      const devStartDate = "2021-10-30";
      const devEndDate = "2021-10-10";
      const errorMessage = minStartDate(devStartDate, devEndDate);
      expect(errorMessage).toBe(true);
    });
  });

  describe("isFormSecond", () => {
    it("必須項目の案件タイトル, 開発言語, 開発フレームワーク, その他スキル, 募集人数, ステータス が入力されていればボタンが活性", () => {
      const selectedLang = [1, 2, 3];
      const selectedFramwork = [1, 2, 3];
      const selectedSkill = [1, 2, 3];
      const recruitNumber = "1";
      const jobStatusId = "1"; //新規募集
      const result = isFormSecond(
        selectedLang,
        selectedFramwork,
        selectedSkill,
        recruitNumber,
        jobStatusId
      );
      expect(result).toBe(true);
    });
  });
});
