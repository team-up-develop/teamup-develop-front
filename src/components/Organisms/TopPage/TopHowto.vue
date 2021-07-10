<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  setup: () => {
    return {};
  },
});
</script>

<template>
  <section>
    <v-row>
      <v-card class="container">
        <div class="title">STEP 1</div>
        <img class="img" src="@/assets/images/top-search.png" width="100%" />
        <div class="description">
          <div class="title">開発したい案件を作成しよう！</div>
          <div class="text">
            気になるスキルの案件を
            簡単な2ステップで案件を作成することができます。
          </div>
        </div>
      </v-card>
      <v-card class="container">
        <div class="title">STEP 2</div>
        <img class="img" src="@/assets/images/top-chat.png" width="95%" />
        <div class="description">
          <div class="title">チャットで連絡を取り合おう！</div>
          <div class="text">
            一緒に開発したいメンバーを決めると自動的にグループに参加し、
            チャットで連絡が取れます。
          </div>
        </div>
      </v-card>
      <v-card class="container">
        <div class="title">STEP 3</div>
        <img class="img" src="@/assets/images/top-complite.png" width="100%" />
        <div class="description">
          <div class="title">さあ！チーム開発を進めよう！</div>
          <div class="text">
            Slackやbacklogなどを使用して連絡を取り合いながら開発進めることができます。
          </div>
        </div>
      </v-card>
    </v-row>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

section {
  margin: 2rem auto;
  width: 85%;
}
.container {
  margin-top: 1rem;
  width: 350px;

  .description {
    padding: 0.5rem;

    .title {
      color: $primary-color;
      font-weight: bold;
    }

    .text {
      font-size: 14px;
      padding: 0.5rem 0;
    }
  }
}
</style>
