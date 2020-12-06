<script lang="ts">
import Vue from 'vue';
import Header from '@/components/common/entire/Header.vue'
import Footer from '@/components/common/entire/Footer.vue'
import HeaderLoginFalse from '@/components/common/entire/HeaderLoginFalse.vue'

export type DataType = {
  loginFlag: boolean;
}

export default Vue.extend({
  name: 'App',

  components: {
    Header,
    Footer,
    HeaderLoginFalse,
  },

  data(): DataType {
    return {
      loginFlag: false,
    }
  },  
  mounted() {
    if(this.$store.state.auth.userId) {
      this.loginFlag = true;
    }
  }
});
</script>

<template>
  <v-app class="app">
    <Header  v-if="$store.state.auth.userId || this.loginFlag == true"/>
    <HeaderLoginFalse v-else />
    <v-main class="container">
      <router-view/>
      <Footer/>
    </v-main>
  </v-app>
</template>

<style scoped>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #111111;
  position: relative;
  width: 100%;
  height: 100vh;
}
.container {
  width: 100%;
  display: inline-block;
  position: relative;
}

@media (min-width: 960px) {
.container[data-v-7ba5bd90] {
  max-width: none;
}
}
@media (min-width: 960px) {
  .container {
    max-width: none;
  }
}
</style>