<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import Logo from "@/components/Atoms/Commons/Entires/Logo.vue";
import BtnArea from "@/components/Molecules/Commons/BtnArea.vue";

export default defineComponent({
  components: {
    Logo,
    BtnArea,
  },
  props: {
    flag: { type: Boolean, default: false },
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
  background-color: $white;
  width: 100%;
  height: 62px;
  margin-bottom: 2px;
  top: 0px;
  top: -100px;
  left: 0;
  z-index: 2;
  transition: 0.3s ease-in-out;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.6);

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
        padding: 1.2rem 0 0rem 2rem;

        @media screen and (max-width: $me) {
          width: 100px;
        }

        @media screen and (max-width: $sm) {
          padding: 1.2rem 0 0rem 0.5rem;
        }
      }

      .header-main-right {
        width: 440px;
        position: absolute;
        right: 0;
        top: 0;

        @media screen and (max-width: $me) {
          width: 300px;
        }

        @media screen and (max-width: $sm) {
          width: 260px;
        }
      }
    }
  }
}
</style>
