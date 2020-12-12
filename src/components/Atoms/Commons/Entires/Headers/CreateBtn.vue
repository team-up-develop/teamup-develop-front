<template>
  <section>
    <router-link to="/job_create/1" class="router">
      <button class="create-btn">
        募集する
      </button>
    </router-link>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.router {
  text-decoration: none;
}

.create-btn {
  @include purple-btn;
  @include box-shadow-btn;
  font-size: 0.9em;
  color: $basic-white;
  font-weight: bold;
  height: 36px;
  min-width: 64px;
  padding: 0 16px;
  align-items: center;
  border-radius: 4px;
  display: inline-flex;
  flex: 0 0 auto;
  font-weight: 500;
  letter-spacing: 0.0892857143em;
  justify-content: center;
  outline: 0;
  position: relative;
  text-decoration: none;
  text-indent: 0.0892857143em;
  text-transform: uppercase;
  transition-duration: 0.28s;
  transition-property: box-shadow, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
}
</style>