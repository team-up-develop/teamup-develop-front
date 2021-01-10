<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Organisms/Commons/Entires/Header.vue'
import Footer from '@/components/Organisms/Commons/Entires/Footer.vue'
import HeaderLoginFalse from '@/components/Organisms/Commons/Entires/HeaderLoginFalse.vue'

type DataType = {
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
    <div class="container">
      <router-view/>
      <footer class="footer">
        <Footer/>
      </footer>
    </div>
  </v-app>
</template>

<style lang="scss" scoped>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #111111;
  position: relative;
  width: 100%;
  // height: 100vh;
}

.container {
  min-height: 112vh;
  width: 100%;
  position: relative;
  margin-top: 1rem;
  // box-sizing: border-box;
  padding-bottom: 15rem;

  footer {
    margin-top: auto;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
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