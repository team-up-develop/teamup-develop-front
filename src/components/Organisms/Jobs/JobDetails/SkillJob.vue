<script lang="ts">
import Vue, { PropType } from "vue";
import { Job } from "@/types";

export default Vue.extend({
  props: {
    job: { type: Object as PropType<Job> },
  },
});
</script>

<template>
  <section>
    <v-sheet class="skill-detail-area">
      <div class="lang-area">
        <label for="name" class="name-tag">開発言語</label>
        <div class="lang-box">
          <div
            class="skill-tag"
            v-for="langage in job.programing_languages"
            :key="langage.id"
          >
            {{ langage.name }}
          </div>
        </div>
      </div>
      <div class="lang-area">
        <label for="name" class="name-tag">フレームワーク</label>
        <div class="lang-box">
          <div
            class="flame-tag"
            v-for="framework in job.programing_frameworks"
            :key="framework.id"
          >
            {{ framework.name }}
          </div>
        </div>
      </div>
      <div class="lang-area">
        <label for="name" class="name-tag">その他関連スキル</label>
        <div class="lang-box">
          <div class="other-tag" v-for="skill in job.skills" :key="skill.id">
            {{ skill.name }}
          </div>
        </div>
      </div>
    </v-sheet>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.skill-detail-area {
  border-radius: 4px;
  padding: 1.5rem 4rem 1rem 4rem;
  margin-bottom: 2rem;
  position: relative;

  @media screen and (max-width: $sm) {
    padding: 1.5rem 1rem;
  }

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
      width: 100%;
      text-align: left;
      padding: 10px 0px 30px 0;

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
</style>
