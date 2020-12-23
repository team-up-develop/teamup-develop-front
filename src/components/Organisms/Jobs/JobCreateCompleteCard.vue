<script lang="ts">
import Vue from 'vue';
import Session from '@/components/Atoms/Commons/Session.vue'

export default Vue.extend({
  components: {
    Session
  }
});

</script>

<template>
  <section>
    <v-sheet class="card">
      <Session :num="3"/>
      <section>
        デザイン作成後
      </section>
    </v-sheet>
  </section>
</template>



<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.card {
  position: relative;
  text-align: left;
  text-decoration: none;
}

</style>