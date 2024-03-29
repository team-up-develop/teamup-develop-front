import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
import { checkSelfJob, isStatusNew } from "@/modules/jobs";
import { manageJobs } from "@/mocks/jobs";
import { m } from "@/master";

describe("jobs.ts", () => {
  describe("checkSelfJob", () => {
    it("自分の案件の中に指定した jobId が含まれていたら「自分の案件」", () => {
      const jobId = 1;
      const result = checkSelfJob(manageJobs, jobId);

      expect(result).toBe(true);
    });

    it("自分の案件の中に指定した jobId が含まれていなかったら「自分の案件ではない」", () => {
      const jobId = 5;
      const result = checkSelfJob(manageJobs, jobId);

      expect(result).toBe(false);
    });
  });

  describe("isStatusNew", () => {
    it("新規募集案件だったら、ラベルは表示", () => {
      const jobStatusId = m.JOB_STATUS_NEW;
      const result = isStatusNew(jobStatusId);
      expect(result).toBe(true);
    });
    it("新規募集案件でなければ、ラベルは非表示", () => {
      const jobStatusId = m.JOB_STATUS_ADD;
      const result = isStatusNew(jobStatusId);
      expect(result).toBe(false);
    });
  });
});
