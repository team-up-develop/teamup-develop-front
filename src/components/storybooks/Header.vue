<script>
import MyButton from "./Button";
export default {
  components: { MyButton },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <header>
    <h1>Vue × Storybook 6 Sample App</h1>
    <div class="buttons">
      <template v-if="user.id">
        <MyButton
          size="small"
          label="ログアウト"
          @onClick="$emit('onLogout', user)"
        />
      </template>
      <template v-else>
        <MyButton size="small" label="ログイン" @onClick="$emit('onLogin')" />
        <MyButton size="small" label="会員登録" @onClick="$emit('onSignUp')" />
      </template>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 45px;
  h1 {
    font-weight: 900;
    font-size: 20px;
    line-height: 1;
    margin: 6px 0 6px 10px;
    display: inline-block;
    vertical-align: top;
  }
  button + button {
    margin-left: 10px;
  }
  @media (max-width: (480px)) {
    button {
      display: none !important;
    }
  }
}
</style>
