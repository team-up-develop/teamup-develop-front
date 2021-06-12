// import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
import { checkSelfJob } from "@/modules/Jobs/jobs";
import { manageJobs } from "@/mocks/jobs";
// import JobDetail from "@/views/Jobs/JobDetail.vue";

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
});
