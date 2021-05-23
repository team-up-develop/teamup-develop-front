// import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import CardJob from "@/components/Organisms/Jobs/CardJob.vue";
// import dayjs from "dayjs";
// import { dayJsFormat } from "@/libs/dayjs";
// import { truncate } from "@/hooks/useUtils";
// beforeEach(() => {

// });

const job = {
  created_at: new Date(),
  deleted_at: new Date(),
  updated_at: new Date(),
  dev_end_date: new Date(),
  dev_start_date: new Date(),
  id: 1,
  job_description: "",
  job_status_id: "",
  job_title: "",
  programing_frameworks: [],
  programing_languages: [],
  skills: [],
  recruitment_numbers: 1,
  user: {},
  user_id: 1,
};

describe("CardJob ", () => {
  it("正常にレンダリングされること", () => {
    const wrapper = shallowMount(CardJob, {
      propsData: {
        job: job,
      },
    });
    console.log(wrapper);
    // expect(wrapper.vm.$props.job).toBe(job);
  });
});
