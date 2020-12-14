<script lang="ts">
import Vue, { PropType } from 'vue';

export default Vue.extend({ 
  props: {
    type: { type: String as PropType<string>, required: true },
  },
  data() {
    return {
      show2: true,
      rules: { //? パスワード 文字数
        required: (value: any) => !!value || 'パスワードが入力されていません',
        min: (v: any) => v.length >= 8 || '8文字以上で入力してください',
        emailMatch: () => (`The email and password you entered don't match`),
      },
    }
  },
  methods: {
    updatePassword(e: string) {
      this.$emit("input", e);
    }
  }
});
</script>

<template>
  <v-text-field
    :type="type"
    @input="updatePassword($event)"
    :rules="[rules.required, rules.min]"
    name="input-10-2"
    label="password"
    hint="8文字以上で入力してください"
    value=""
    class="input-group--focused"
    outlined
    @click:append="show2 = !show2"
    single-line
    filled
  ></v-text-field>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

</style>