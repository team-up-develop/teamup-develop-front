<script>
import MyHeader from "./Header";
export default {
  components: { MyHeader },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    login() {
      this.user = { id: 1, name: "sasaki" };
    },
    logout() {
      this.user = {};
    },
    signUp() {
      // 会員登録ページが開かれるイメージ
      window.open("https://github.com/Sa2Knight/Curriculum-Vitae");
    },
  },
};
</script>

<template>
  <div>
    <MyHeader
      :user="user"
      @onLogin="login"
      @onLogout="logout"
      @onSignUp="signUp"
    />
    <main>
      <div class="content-wrapper">
        <div class="content" :key="i" v-for="i in 10">
          {{ "コンテンツがここに表示されます".repeat(20) }}
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss">
main {
  .content-wrapper {
    padding: 25px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 25px;
    row-gap: 1em;
  }
  @media screen and (max-width: 480px) {
    .content-wrapper {
      grid-template-columns: 1fr;
    }
  }
}
</style>
