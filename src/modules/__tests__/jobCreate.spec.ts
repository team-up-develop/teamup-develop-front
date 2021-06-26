// import { shallowMount } from "@vue/test-utils";
import {
  isFormFirst,
  afterDevEndDate,
  beforeToDate,
  isFormSecond,
  minPeriod,
} from "@/modules/jobCreate";
import { dayjs } from "@/libs/dayjs";

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

  describe("afterDevEndDate", () => {
    it("開発開始日より開発終了日の方が前なら「開発開始日を開発終了日より後に設定してください。」を表示", () => {
      const devStartDate = "2021-10-30";
      const devEndDate = "2021-10-10";
      const errorMessage = afterDevEndDate(devStartDate, devEndDate);
      expect(errorMessage).toBe(true);
    });
  });

  describe("beforeToDate", () => {
    it("開発開始日が現在の日付より前の場合「開発開始日を現在の日付より後に設定してください。」を表示", () => {
      const devStartDate = dayjs()
        .startOf("month")
        .format();
      const errorMessage = beforeToDate(devStartDate);
      expect(errorMessage).toBe(true);
    });
  });

  describe("minPeriod", () => {
    it("開発期間を1ヶ月未満の場合「開発期間を1ヶ月以上に設定してください。」を表示", () => {
      const devStartDate = "2021-10-30";
      const devEndDate = "2021-11-10";
      const errorMessage = minPeriod(devStartDate, devEndDate);
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
