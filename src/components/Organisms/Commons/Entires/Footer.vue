<script>
export default {
  data: () => ({
    links: [
      { name: "トップ", url: "/" },
      { name: "探す", url: "/jobs" },
      { name: "チームアップとは?", url: "/about" },
      { name: "お問い合わせ", url: "/contact" },
    ],
  }),
};
</script>
<template>
  <v-footer color="white darken-1 lighten-2 white--text text-center" padless>
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link.name"
        color="white"
        text
        rounded
        class="my-2"
      >
        <router-link :to="`${link.url}`" class="router-link">
          <span>{{ link.name }}</span>
        </router-link>
      </v-btn>
      <v-col class="white darken-1  py-4 text-center balck--text" cols="12">
        <span class="text"
          >{{ new Date().getFullYear() }} — <strong>TeamUp</strong></span
        >
      </v-col>
    </v-row>
  </v-footer>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.router-link {
  color: $text-main-color;
  text-decoration: none;
  font-weight: bold;
}
.text {
  color: $text-main-color;
  font-weight: bold;
}
</style>
