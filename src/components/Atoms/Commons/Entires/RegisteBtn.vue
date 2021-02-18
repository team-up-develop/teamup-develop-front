<template>
  <router-link to="/register/step/1" class="router">
    <v-btn class="create-btn">
      登録する
    </v-btn>
  </router-link>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.create-btn {
  @include blue-btn;
  color: $white;
  font-weight: bold;
}
</style>
