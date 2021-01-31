<script lang="ts">
// FIXME: 現在使用していない
import Vue from "vue";

export default Vue.extend({
  methods: {
    logout() {
      this.$store.dispatch("logout", {});
    },
  },
});
</script>

<template>
  <div>
    <button @click="logout">ログアウト</button>
  </div>
</template>

<style></style>
