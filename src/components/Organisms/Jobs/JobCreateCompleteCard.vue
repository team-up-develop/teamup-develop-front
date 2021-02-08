<script lang="ts">
import Vue from "vue";
import Session from "@/components/Atoms/Commons/Session.vue";

export default Vue.extend({
  components: {
    Session,
  },
});
</script>

<template>
  <section>
    <v-sheet class="card">
      <Session :num="4.4" />
      <section>
        <div class="image-area">
          <img
            src="@/assets/images/complete.png"
            alt="投稿完了"
            class="image"
          />
        </div>
        <div class="text">
          <p><span>案件投稿が完了しました</span></p>
          <p>案件は複数作成することで応募者が多く集まりやすくなります。</p>
          <p>勉強したい技術や、やってみたい技術をどんどん投稿してみよう！</p>
        </div>
        <div class="btn-area">
          <router-link to="/job_create/1" class="create-link">
            続けて投稿する
          </router-link>
          <router-link to="/manage" class="manage-link">
            管理画面にいく
          </router-link>
        </div>
      </section>
    </v-sheet>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.card {
  position: relative;
  text-align: left;
  text-decoration: none;
}

.image-area {
  padding: 0 20%;

  .image {
    width: 100%;
  }
}

.text {
  text-align: center;
  font-weight: bold;

  span {
    font-size: 1.5em;
    color: $primary-color;
  }
}

.btn-area {
  margin: 2.5rem 0 0 0;

  .create-link {
    @include blue-btn;
    @include neumorphism;
    color: $white;
    width: 191px;
    text-align: left;
    display: block;
    padding: 1.1rem 1rem;
    border-radius: 8px;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1rem;
    float: right;
  }

  .manage-link {
    @include neumorphismGrey;
    width: 191px;
    color: $primary-color;
    width: 191px;
    text-align: left;
    display: block;
    padding: 1.1rem 2rem;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    max-width: 280px;
    margin: auto;
    font-size: 1rem;
    float: left;
    transition: 0.3s;
    outline: none;
    text-decoration: none;
  }
}

/* スマホ */
@media (max-width: 500px) {
  .btn-area {
    display: flex;
    flex-direction: column;

    .manage-link {
      margin-top: 1rem;
    }
  }
}
</style>
