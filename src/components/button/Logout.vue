<template>
  <div>
    <button @click="logout">ログアウト</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout', {
      })
    },
  },
}
</script>

<style>

</style>