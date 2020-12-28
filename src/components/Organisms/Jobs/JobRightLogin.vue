<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  methods: {
    redirectJobCreate() {
      this.$router.push('/job_create/1')
    }
  }
});
</script>

<template>
  <section>
    <div class="card">
      <div class="content">
        <img class="img"  src="@/assets/images/createJob.png" width="100%" />
        <p>自分が<span>開発したい環境</span>を設定して案件を作成しよう！</p>
        <div class="btn-area">
          <button class="register-btn" @click="redirectJobCreate">案件を作成する</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.card {
  @include card-border-color;
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

    p {
      margin-top: 1rem;
      font-weight: bold;
      font-size: 15px;

      span {
        font-size: 22px;
        background: -webkit-linear-gradient(0deg, #1142e2, #19bde6);
        // -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: bold;
      }
    }
    .btn-area {
      width: 100%;

      .register-btn {
        @include purple-btn;
        @include neumorphism;
        display: block;
        padding: 1.2rem 4rem;
        border-radius: 50px;
        font-size: .875rem;
        font-weight: 700;
        color: $white;
        line-height: 1;
        text-align: center;
        max-width: 280px;
        margin: auto;
        font-size: 1rem;
        cursor: pointer;
        transition: .3s;
        outline: none;
      }
    }
  }
}

</style>