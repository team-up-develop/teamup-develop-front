<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { useUtils } from "@/hooks";

export default defineComponent({
  setup(_, ctx) {
    const { isLogin } = useUtils();

    const onRegister = () => {
      return ctx.root.$router.push({ name: "RegisterPersonal" });
    };
    const onCreateJob = () => {
      return ctx.root.$router.push({ name: "JobCreate" });
    };
    return {
      isLogin,
      onRegister,
      onCreateJob,
    };
  },
});
</script>

<template>
  <section>
    <v-card class="card">
      <div v-if="isLogin" class="content">
        <img class="img" src="@/assets/images/jobs-skills.png" width="100%" />
        <h3><span>開発したいスキル</span>を設定して案件を作成しよう！</h3>
        <div class="btn-area mt-2">
          <button class="register-btn" @click="onCreateJob">
            案件を作成する
          </button>
        </div>
      </div>
      <div v-else class="content">
        <img class="img" src="@/assets/images/jobs-search.png" width="100%" />
        <h3><span>使いたいスキル</span>すぐにチーム開発を始めよう！</h3>
        <div class="btn-area">
          <button class="register-btn mt-3" @click="onRegister">
            簡単登録する
          </button>
        </div>
      </div>
    </v-card>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.card {
  width: 72%;
  // height: calc(44vh - 4rem);
  background-color: $white;
  border-radius: 8px;
  margin-top: 3.5rem;
  margin-bottom: 3rem;
  padding: 0 2rem 3rem 2rem;
  position: sticky;

  .content {
    width: 100%;

    h3 {
      margin-top: 1rem;
      font-weight: bold;
      font-size: 15px;

      span {
        font-size: 22px;
        background: -webkit-linear-gradient(0deg, #1142e2, #19bde6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: bold;
      }
    }
    .btn-area {
      width: 100%;

      .register-btn {
        @include blue-btn;
        @include neumorphism;
        display: block;
        padding: 1.2rem 4rem;
        border-radius: 50px;
        font-size: 0.875rem;
        font-weight: 700;
        color: $white;
        line-height: 1;
        text-align: center;
        max-width: 280px;
        margin: auto;
        font-size: 1rem;
        cursor: pointer;
        transition: 0.3s;
        outline: none;
      }
    }
  }
}
</style>
