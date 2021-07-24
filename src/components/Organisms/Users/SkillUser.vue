<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { InsidePropsType, PropType } from "@icare-jp/vue-props-type";
import { User } from "@/types/index";
import InputSet from "@/components/Molecules/Forms/InputSet.vue";

const propsOption = {
  user: { type: Object as PropType<User>, required: true, defalut: {} },
} as const;

type PropsOption = typeof propsOption;
export default defineComponent<InsidePropsType<PropsOption>>({
  components: {
    InputSet,
  },
  props: propsOption,
});
</script>

<template>
  <section>
    <v-sheet class="skill-detail-area" elevation="1">
      <div class="lang-area">
        <InputSet
          :skills="user.programing_languages"
          label="開発言語"
          color="#651fff"
        />
      </div>
      <div class="lang-area">
        <InputSet
          :skills="user.programing_frameworks"
          label="フレームワーク"
          color="#2196f3"
        />
      </div>
      <div class="lang-area">
        <InputSet :skills="user.skills" label="その他スキル" color="#00bcd4" />
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
  }
}
</style>
