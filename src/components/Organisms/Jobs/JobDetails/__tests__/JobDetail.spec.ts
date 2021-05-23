// import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import { BtnArea } from "@/components/Organisms/Jobs/JobDetails";
import { Job } from "@/types";
import { user } from "@/mocks";
// import { PropsOption }  from "@/components/Organisms/Jobs/JobDetails/BtnArea.vue"
const job = {
  created_at: new Date(),
  deleted_at: new Date(),
  updated_at: new Date(),
  dev_end_date: new Date(),
  dev_start_date: new Date(),
  id: 1,
  job_description: "",
  job_status_id: 1,
  job_title: "",
  programing_frameworks: [
    {
      id: 1,
      updated_at: new Date(),
      name: "typescript",
    },
  ],
  programing_languages: [
    {
      id: 1,
      updated_at: new Date(),
      name: "typescript",
    },
  ],
  skills: [
    {
      id: 1,
      updated_at: new Date(),
      name: "typescript",
    },
  ],
  recruitment_numbers: 1,
  user: user,
  user_id: 1,
};

type Props = {
  id: number;
  job: any;
  selfjob: boolean;
  applyFlug: boolean;
  isLogin: boolean;
};

const mockProps: Props = {
  id: 1,
  job: job,
  selfjob: true,
  applyFlug: true,
  isLogin: true,
};
console.log(mockProps);

describe("JobDetail ", () => {
  it("正常にレンダリングされること", () => {
    const wrapper = shallowMount(BtnArea, {
      propsData: mockProps,
    });
    // , {
    //   propsData: {
    //     id: 11,
    //     job: job,
    //     selfJob: true,
    //     applyFlug: true,
    //     isLogin: true,
    //   },
    // }
    console.log(wrapper);
    expect(wrapper.html()).toContain("応募する");
  });
});
