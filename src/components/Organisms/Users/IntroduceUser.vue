<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    user: { type: Object, require: true, defalut: {} },
  },
});
</script>

<template>
  <section>
    <v-sheet class="dev-detail-area">
      <div class="detail-leff-area">
        <div class="detail-information">
          <div class="tag"></div>
          <div class="sub-area">
            {{ user.bio }}
          </div>
        </div>
      </div>
    </v-sheet>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.dev-detail-area {
  border-radius: 4px;
  padding: 1rem 4rem 1rem 4rem;
  margin-bottom: 2rem;
  position: relative;
  line-height: 1.8;

  @media screen and (max-width: $sm) {
    padding: 1.5rem 1rem;
  }

  .detail-leff-area {
    display: inline-block;
    width: 100%;
    height: 100%;

    .detail-information {
      margin-top: 1px;
      padding: 1rem 0;
      position: relative;
      flex-direction: column;

      .tag {
        font-weight: bold;
      }

      .sub-area {
        right: 0;
        font-size: 14px;
      }
    }
  }
}
</style>
