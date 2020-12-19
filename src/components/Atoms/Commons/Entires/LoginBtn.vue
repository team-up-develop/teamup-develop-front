<template>
  <router-link to="/login" class="router">
    <v-btn class="login-btn">
      ログイン
    </v-btn>
  </router-link>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.login-btn {
  @include blue-cancel-btn;
  background-color: $white;
  font-weight: bold;
}
</style>