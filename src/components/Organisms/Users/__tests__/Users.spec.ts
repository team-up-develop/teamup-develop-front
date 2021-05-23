import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import { IntroduceUser, PostUser } from "@/components/Organisms/Users";
import { user } from "@/mocks";
import dayjs from "dayjs";

describe("IntroduceUser ", () => {
  it("正常にレンダリングされること", () => {
    const wrapper = shallowMount(IntroduceUser, {
      propsData: {
        user: user,
      },
    });
    // * デバッグ
    // console.log(wrapper.vm.$props.user, "wrapper.vm.$props");
    expect(wrapper.vm.$props.user).toBe(user);
  });
});

describe("PostUser ", () => {
  it("正常にレンダリングされること", () => {
    Vue.prototype.day = dayjs;
    const wrapper = shallowMount(PostUser, {
      propsData: {
        user: user,
        myselfFlag: false,
      },
    });
    expect(wrapper.vm.$props.user).toBe(user);
  });

  it("GitHub Twitter の画像がクリックされたらイベントが発動すること", async () => {
    Vue.prototype.day = dayjs;
    const wrapper = shallowMount(PostUser, {
      propsData: {
        user: user,
        myselfFlag: false,
      },
    });
    wrapper.find("img").trigger("click");
  });
});
