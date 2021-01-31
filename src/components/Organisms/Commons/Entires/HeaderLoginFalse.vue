<script lang="ts">
import Vue, { PropType } from "vue";
import Logo from "@/components/Atoms/Commons/Entires/Logo.vue";
import BtnArea from "@/components/Molecules/Commons/Entires/BtnArea.vue";

export default Vue.extend({
  components: {
    Logo,
    BtnArea,
  },
  props: {
    flag: Boolean as PropType<boolean>,
  },
});
</script>

<template>
  <div class="header-wrapper">
    <div class="header-wrapper-area">
      <div class="header-main-area">
        <div class="header-main-left">
          <Logo />
        </div>
        <div class="header-main-right">
          <BtnArea />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.header-wrapper {
  background-color: #ffffff;
  width: 100%;
  height: 58px;
  margin-bottom: 2px;
  top: 0px;
  top: -100px;
  left: 0;
  z-index: 2;
  transition: 0.3s ease-in-out;

  .header-wrapper-area {
    width: 100%;
    height: 66px;
    position: relative;

    .header-main-area {
      height: 100%;
      width: 100%;
      position: absolute;
      right: 0;
      top: 0;

      .header-main-left {
        width: 180px;
        height: 100%;
        padding: 1rem 0 0rem 2rem;

        @media screen and (max-width: 768px) {
          width: 100px;
        }

        @media screen and (max-width: 500px) {
          padding: 1rem 0 0rem 0.5rem;
        }
      }

      .header-main-right {
        width: 440px;
        padding: 0.7rem 0rem 0 0;
        position: absolute;
        right: 0;
        top: 0;

        @media screen and (max-width: 768px) {
          width: 300px;
        }

        @media screen and (max-width: 500px) {
          width: 260px;
        }
      }
    }
  }
}

/* スマホ */
@media (max-width: 500px) {
  .header-wrapper .header-logo-area {
    padding: 0 0 0 0.3rem;
  }
}
</style>
