<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import RegisteForm from "@/components/Molecules/Jobs/JobRegisterFalses/RegisteForm.vue";

export default defineComponent({
  components: {
    RegisteForm,
  },
});
</script>

<template>
  <section>
    <div class="false-user-login">
      <div class="top-login-title">
        簡単登録
      </div>
      <RegisteForm />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.false-user-login {
  @include card-border-color;
  width: 75%;
  background-color: $white;
  border-radius: 8px;
  margin-top: 3.5rem;
  padding: 0 2rem 2rem 2rem;
  position: sticky;

  .top-login-title {
    width: 100%;
    padding: 1rem 0;
    text-align: center;
    position: relative;
    color: $secondary-dark;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 0.5rem;

    &:after {
      background-color: $secondary-dark;
      content: "";
      display: block;
      height: 4px;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 6px;
      content: "";
      border-radius: 3px;
    }
  }
}
</style>
