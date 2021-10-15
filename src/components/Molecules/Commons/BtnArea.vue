<script lang="ts">
import Vue from "vue";
import VButton from "@/components/Atoms/VButton/VButton.vue";

export default Vue.extend({
  components: {
    VButton,
  },
});
</script>

<template>
  <section>
    <v-row class="left-user-menu">
      <router-link to="/jobs" class="menu-list">
        <!-- <v-icon class="icon">mdi-magnify</v-icon> -->
      </router-link>
      <router-link class="router" to="/login">
        <VButton bc="primaryWhite">ログイン</VButton>
      </router-link>
    </v-row>
    <v-row class="right-create-btn">
      <router-link class="router" to="/register/personal">
        <VButton bc="primary">登録する</VButton>
      </router-link>
    </v-row>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.icon {
  margin-right: 0.5rem;
}
.router {
  text-decoration: none;
}

.menu-list {
  color: $text-sub-color;
  font-size: 14px;
  text-decoration: none;
  margin-left: 1rem;
}

.left-user-menu {
  width: 35%;
  height: 100%;
  display: inline-block;
  font-weight: bold;

  @media screen and (max-width: $me) {
    width: 45%;
    margin-right: 1rem;
  }
}

.right-create-btn {
  width: 28%;
  height: 100%;
  display: inline-block;
  font-weight: bold;
}
</style>
