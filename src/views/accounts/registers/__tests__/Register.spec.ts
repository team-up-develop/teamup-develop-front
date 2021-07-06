import { shallowMount } from "@vue/test-utils";
import RegisterStepBase from "@/views/Accounts/registers/RegisterStepBase.vue";

// beforeEach(() => {
//   let wrapper = shallow(RegisterStepBase, {
//     data: {
//       pageSize: count,
//     },
//     propsData: {
//       userId,
//       managerId,
//     },
//   });
// });

const initilaState = () => ({
  userName: "",
  lastName: "",
  firstName: "",
  password: "",
  userBirthday: "",
  learningStartDate: "",
  email: "",
});

// const defalutInput = () => ({
//   userName: "Test",
//   lastName: "Test",
//   firstName: "User",
//   password: "password",
//   userBirthday: "1900-10-10",
//   learningStartDate: "2000-10-10",
//   email: "test@test.com",
// });

describe("正常にRenderされていること", () => {
  it("is a Vue instance", () => {
    const wrapper = shallowMount(RegisterStepBase);
    expect(wrapper.vm).toBeTruthy();
  });
});

describe("データチェック", () => {
  it("必須項目が入力されていない場合、ボタンを表示しない", () => {
    const props = initilaState();
    const wrapper = shallowMount(RegisterStepBase, {
      ...props,
    });
    expect(wrapper.find(".next-btn").exists()).toBe(false);
  });

  // it("statusがtrueだったらLikedボタンが見えること", (done) => {
  //   const wrapper = shallowMount(RegisterStepBase);
  //   const onMounted = jest.fn();
  //   const { count } = wrapper(onMounted);
  //   wrapper.setData({ status: true });
  //   console.log(wrapper.vm, "wrapper.vm.status");
  //   // expect(wrapper.vm.status).toBe(true);

  //   return wrapper.vm.$nextTick().then(function() {
  //     expect(wrapper.text()).toBe("Liked");
  //     done();
  //   });
  // });

  //   test("必須項目が入力されている場合、ボタンを表示する", async () => {
  //     const item = {
  //       userName: "Test",
  //       lastName: "Test",
  //       firstName: "User",
  //       password: "password",
  //       userBirthday: "1900-10-10",
  //       learningStartDate: "2000-10-10",
  //       email: "test@test.com",
  //     };
  //     const wrapper = shallowMount(RegisterStepBase);
  //     expect(wrapper.vm).toBeTruthy();
  //     await wrapper.setData({ userName: "Lachlan" });
  //     await console.log(wrapper);
  //     await expect(wrapper.find(".bottom-a").exists()).toBe(true);
  //     expect(wrapper.text()).toBe("次へ1/3");
  //   });
});
