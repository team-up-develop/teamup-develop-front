<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
</script>

<template>
  <section>
    <v-card class="skill-detail-area">
      <div class="lang-area">
        <label for="name" class="name-tag">開発言語</label>
        <div class="lang-box">
          <div class="skill-tag">
            JavaScript ハリボテ
          </div>
        </div>
      </div>
      <div class="lang-area">
        <label for="name" class="name-tag">フレームワーク</label>
        <div class="lang-box">
          <div class="flame-tag">
            Vue ハリボテ
          </div>
        </div>
      </div>
      <div class="lang-area">
        <label for="name" class="name-tag">その他関連スキル</label>
        <div class="lang-box">
          <div class="other-tag">
            Docker ハリボテ
          </div>
        </div>
      </div>
    </v-card>
  </section>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.skill-detail-area {
  @include card-border-color;
  border-radius: 4px;
  padding: 1.5rem 4rem 1rem 4rem;
  margin-bottom: 2rem;
  position: relative;

  .lang-area {
    width: 100%;
    position: relative;

    .name-tag {
      font-weight: bold;
      text-align: left;
      position: absolute;
      left: 0;
    }

    .lang-box {
      width: 95%;
      text-align: left;
      padding: 10px 20px 30px 0;

      .skill-tag {
        @include detail-language;
      }

      .flame-tag {
        @include detail-framework;
      }

      .other-tag {
        @include detail-skill;
      }
    }
  }
}

/* スマホレスポンシブ */
@media screen and (max-width: 500px) {
  .skill-detail-area {
    padding: 1.5rem 1rem;
  }
}
</style>