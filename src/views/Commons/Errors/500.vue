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
      :errorNumber="500"
      title="エラーが発生しました"
      describe="システム管理者にお問い合わせください"
    />
  </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Press+Start+2P");
@import "@/assets/scss/_variables.scss";
</style>
