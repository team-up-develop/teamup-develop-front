<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { InsidePropsType, PropType } from "@icare-jp/vue-props-type";
import { User } from "@/types/index";

const propsOption = {
  user: { type: Object as PropType<User>, required: true, defalut: {} },
} as const;

type PropsOption = typeof propsOption;
export default defineComponent<InsidePropsType<PropsOption>>({
  props: propsOption,
});
</script>

<template>
  <section>
    <v-sheet class="skill-detail-area" elevation="1">
      <div class="lang-area">
        <label for="name" class="name-tag">開発言語</label>
        <div class="lang-box">
          <div
            class="skill-tag"
            v-for="langage in user.programing_languages"
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
            v-for="framework in user.programing_frameworks"
            :key="framework.id"
            class="flame-tag"
          >
            {{ framework.name }}
          </div>
        </div>
      </div>
      <div class="lang-area">
        <label for="name" class="name-tag">その他関連スキル</label>
        <div class="lang-box">
          <div class="other-tag" v-for="skill in user.skills" :key="skill.id">
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
      padding: 10px 0px 2rem 0;

      .skill-tag {
        @include detail-language;

        @media screen and (max-width: $sm) {
          @include language-responsive;
        }
      }

      .flame-tag {
        @include detail-framework;

        @media screen and (max-width: $sm) {
          @include framework-responsive;
        }
      }

      .other-tag {
        @include detail-skill;

        @media screen and (max-width: $sm) {
          @include skill-responsive;
        }
      }
    }
  }
}
</style>
