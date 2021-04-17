<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { dayJs } from "@/master";
import { Job } from "@/types";

export default defineComponent({
  props: {
    job: { type: Object as PropType<Job>, require: true },
  },
  setup: () => {
    const day = (value: string, format: string) => dayJs(value, format);
    return {
      day,
    };
  },
});
</script>

<template>
  <section>
    <v-sheet class="dev-detail-area">
      <div class="detail-leff-area">
        <div class="detail-information">
          <div class="tag">タイトル</div>
          <div class="sub-area">{{ job.job_title }}</div>
        </div>
        <div class="detail-information">
          <div class="tag">募集人数</div>
          <div class="sub-area">{{ job.recruitment_numbers }}人</div>
        </div>
        <div class="detail-information">
          <div class="tag">開発期間</div>
          <div class="sub-area">
            {{ day(job.dev_start_date, "YYYY年 M月 D日") }} ~
            {{ day(job.dev_end_date, "YYYY年 M月 D日") }}
          </div>
        </div>
        <div class="detail-information">
          <div class="tag">詳細</div>
          <div class="sub-area pre-wrap">{{ job.job_description }}</div>
        </div>
      </div>
    </v-sheet>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.dev-detail-area {
  border-radius: 4px;
  padding: 1.5rem 4rem 1rem 4rem;
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
      .pre-wrap {
        white-space: pre-wrap;
      }
    }
  }
}
</style>
