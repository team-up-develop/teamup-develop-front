<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import Vuex from "@/store/index";
import { Language, Framework, Skill } from "@/types/index";

export default defineComponent({
  props: {
    options: {
      type: Array as PropType<Language[] | Framework[] | Skill[]>,
      require: true,
      defalut: {},
    },
    color: { type: Number as PropType<1 | 2 | 3>, require: true, defalut: 0 }, //? 1: language 2: Framework 3: Skill
  },
  setup: (_, ctx) => {
    const router = ctx.root.$router;
    // * トップページ 言語検索
    const languageClick = (language: Language) => {
      Vuex.dispatch("languageSearch", {
        language: [language.id],
      });
      return router.push({ name: "Jobs" });
    };
    // * トップページ フレームワーク検索
    const framworkClick = (framwork: Framework) => {
      Vuex.dispatch("framworkSearch", {
        framwork: [framwork.id],
      });
      return router.push({ name: "Jobs" });
    };
    // * トップページ その他スキル検索
    const skillClick = (skill: Skill) => {
      Vuex.dispatch("skillSearch", {
        skill: [skill.id],
      });
      return router.push({ name: "Jobs" });
    };
    return {
      languageClick,
      framworkClick,
      skillClick,
    };
  },
});
</script>

<template>
  <section>
    <section v-if="color == 1">
      <div
        class="language-box"
        v-for="option in options"
        :key="option.id"
        @click="languageClick(option)"
      >
        {{ option.name }}
      </div>
    </section>
    <section v-if="color == 2">
      <div
        class="framework-box"
        v-for="option in options"
        :key="option.id"
        @click="framworkClick(option)"
      >
        {{ option.name }}
      </div>
    </section>
    <section v-if="color == 3">
      <div
        class="skill-box"
        v-for="option in options"
        :key="option.id"
        @click="skillClick(option)"
      >
        {{ option.name }}
      </div>
    </section>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.language-box {
  background-color: $white;
  color: $language-color;
  border: 1px solid $language-color;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  max-width: 130px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
  outline: none;
  margin-right: 0.8rem;
  margin-top: 0.4rem;
  display: inline-block;
  &:hover {
    @include btn-hover;
  }
}
.framework-box {
  background-color: $white;
  color: $framework-color;
  border: 1px solid $framework-color;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  max-width: 130px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
  outline: none;
  margin-right: 0.8rem;
  margin-top: 0.4rem;
  display: inline-block;
  &:hover {
    @include btn-hover;
  }
}
.skill-box {
  background-color: $white;
  color: $skill-color;
  border: 1px solid $skill-color;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  max-width: 130px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
  outline: none;
  margin-right: 0.8rem;
  margin-top: 0.4rem;
  display: inline-block;
  &:hover {
    @include btn-hover;
  }
}
</style>
