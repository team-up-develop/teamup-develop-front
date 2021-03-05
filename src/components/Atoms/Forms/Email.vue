<script lang="ts">
import Vue, { PropType } from "vue";

export default Vue.extend({
  props: {
    type: { type: String as PropType<string>, required: true },
    placeholder: { type: String as PropType<string>, required: true },
  },
  data() {
    return {
      emailRules: [
        //? メールアドレス 文字数
        (v: string) => !!v || "メールアドレスが入力されていません",
        (v: string) =>
          /.+@.+/.test(v) || "有効なメールアドレスを入力してください",
      ],
    };
  },
  methods: {
    updateEmail(e: string) {
      this.$emit("input", e);
    },
  },
});
</script>

<template>
  <v-text-field
    class="input"
    :type="type"
    @input="updateEmail($event)"
    :rules="emailRules"
    :label="placeholder"
    required
    outlined
    filled
  />
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
</style>
