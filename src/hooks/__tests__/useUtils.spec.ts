import { useUtils } from "@/hooks";
import { truncate } from "@/hooks/useUtils";
import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);

describe("useUtils.ts", () => {
  describe("isLogin", () => {
    it("userがログインしていなかったらfalse", () => {
      const { isLogin } = useUtils();
      expect(isLogin.value).toBe(false);
    });
    it("userがログインしていたらtrue", () => {
      const { isLogin, ...state } = useUtils();
      state.userId.value = 1;
      expect(isLogin.value).toBe(true);
    });
  });

  describe("auth", () => {
    it("ログインしていなかったら、Authorizationのtokenが空", () => {
      const { auth } = useUtils();
      expect(auth.value).toStrictEqual({
        Authorization: "Bearer ",
      });
    });
    it("ログインし、tokenを保持していたらAuthorizationを返す", () => {
      const { auth, ...state } = useUtils();
      state.token.value =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZXhwIjoxNjIzNDE4Njk1LCJpYXQiOiIyMDIxLTA2LTEwVDIyOjM4OjE1LjYyMDI5NjcrMDk6MDAiLCJzdWIiOjd9.SzPrW2HF-3CX8SY2ks-L_dsICvNispifXi0b0NK-iq0";
      expect(auth.value).toStrictEqual({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZXhwIjoxNjIzNDE4Njk1LCJpYXQiOiIyMDIxLTA2LTEwVDIyOjM4OjE1LjYyMDI5NjcrMDk6MDAiLCJzdWIiOjd9.SzPrW2HF-3CX8SY2ks-L_dsICvNispifXi0b0NK-iq0",
      });
    });
  });

  describe("truncate", () => {
    it("正しく指定した文字以内で「...」でテキストが表示されること", () => {
      const text =
        "本気でキャリアを変えようと努力している未経験エンジニア同士がオンラインでの「チーム開発」を通じて相互に成長し、エンジニアとしてキャリアをスタートを切ることをサポートします。";
      expect(truncate(text, 20)).toStrictEqual(
        "本気でキャリアを変えようと努力している未..."
      );
    });
  });
});
