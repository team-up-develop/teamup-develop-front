<template>
  <div class="container" v-show="loading">
    <div class="fullview">
      <div class="loading-spacer"></div>
      <vue-loading 
        type="bubbles"
        color="#2196F3"
        :size="{ width: '200px', height: '105px' }"
        >
      </vue-loading>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { VueLoading } from 'vue-loading-template'

export type DataType = {
  loading: boolean;
}
export default Vue.extend({ 
  name: 'loading',
  data(): DataType {
    return {
      loading: true
    }
  },
  components: {
    VueLoading,
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: 90%;
  height: 68vh;
  position: relative;
}
.fullview {
  width: 80%;
  height: 120%;
  position: fixed;
  top: 0;
  right: 0;
  position: absolute;
}
.loading-spacer {
  height: 30%;
}
</style>
