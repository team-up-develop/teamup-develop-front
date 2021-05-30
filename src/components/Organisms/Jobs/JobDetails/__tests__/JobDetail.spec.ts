// import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import { BtnArea } from "@/components/Organisms/Jobs/JobDetails";
// import { Job } from "@/types";
import { job } from "@/mocks/jobs";
// import { PropsOption }  from "@/components/Organisms/Jobs/JobDetails/BtnArea.vue"

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
