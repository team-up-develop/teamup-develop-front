<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import Error from "@/components/Organisms/Commons/Errors/Error.vue";

export default defineComponent({
  components: {
    Error,
  },
  setup() {
    return {};
  },
});
</script>

<template>
  <div>
    <Error
      :error-number="404"
      title="ページが存在しません"
      describe="URLをご確認ください。"
    />
  </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Press+Start+2P");
@import "@/assets/scss/_variables.scss";
</style>
