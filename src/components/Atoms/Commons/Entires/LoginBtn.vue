<template>
  <router-link to="/login" class="router">
    <v-btn class="login-btn">
      ログイン
    </v-btn>
  </router-link>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.login-btn {
  @include neumorphism;
  color: $primary-color;
  font-weight: bold;
}
</style>
