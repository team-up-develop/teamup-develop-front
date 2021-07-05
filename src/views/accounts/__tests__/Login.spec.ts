import { shallowMount } from "@vue/test-utils";
import Login from "@/views/Accounts/Login.vue";

// beforeEach(() => {

// });

describe("ログイン画面がRenderされていること", () => {
  it("メールアドレスが存在すること", () => {
    const wrapper = shallowMount(Login);
    // console.log(wrapper, "wrapper");
    expect(wrapper.html()).toContain("メールアドレス");
  });
  it("パスワードが存在すること", () => {
    const wrapper = shallowMount(Login);
    // console.log(wrapper, "wrapper");
    expect(wrapper.html()).toContain("パスワード");
  });
  it("ログインボタンが正しく存在すること", () => {
    // const LoginBtn = `<v-btn @click="login()" class="login-btn">ログインする</v-btn>`;
    const wrapper = shallowMount(Login);
    expect(wrapper.html()).toContain("ログインする");

    // const loginBtn = wrapper.find("div");
    // expect(loginBtn.is("ログインする")).toBe(true);
  });
});
