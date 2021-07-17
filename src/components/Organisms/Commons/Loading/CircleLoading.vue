<script lang="ts">
import Vue from "vue";
import { VueLoading } from "vue-loading-template";

type DataType = {
  loading: boolean;
};
export default Vue.extend({
  name: "Loading",
  data(): DataType {
    return {
      loading: true,
    };
  },
  components: {
    VueLoading,
  },
});
</script>

<template>
  <div class="container" v-show="loading">
    <div class="fullview">
      <div class="loading-spacer"/>
      <vue-loading
        type="spin"
        color="#2196f3"
        :size="{ width: '63px', height: '38px' }"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 83%;
  height: 45px;
  position: relative;
}
.fullview {
  width: 100%;
  height: 45px;
  position: fixed;
  top: 0;
  right: 0;
  position: absolute;
}
.loading-spacer {
  height: 30%;
}
</style>
