<template>
  <div id="app">
    <Header  v-if="$store.state.auth.userId || this.loginFlag == true"/>
    <header-login-false v-else />
    <div class="container">
      <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Vue from 'vue';
import Header from '@/components/common/entire/Header.vue'
import Footer from '@/components/common/entire/Footer.vue'
import HeaderLoginFalse from '@/components/common/entire/HeaderLoginFalse.vue'

export default Vue.extend({ 
  name: 'App',
  data() {
    return {
      loginFlag: false
    }
  },
  components: {
    // LeftSideBar
    Header,
    Footer,
    HeaderLoginFalse,
    // login
  },
  mounted() {
  console.log(this.$store.state.auth.userId)
    if(this.$store.state.auth.userId) {
      this.loginFlag = true;
      console.log(this.loginFlag)
      console.log("ログイン中です")
    }
    else {
      console.log("ログアウト中")
    }
  }
});
</script>

<style scoped>
#app {
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
  /* margin-top: 3.7rem; */
  /* height: 100%; */
  /* background-color: #F2F6F7; */
  /* background-color: #FAFAFA; */
  /* right: 0; */
  display: inline-block;
  position: relative;
}
</style>
