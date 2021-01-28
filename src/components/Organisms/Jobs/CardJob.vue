<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import CardJobSkill from "@/components/Atoms/Jobs/CardJobSkill.vue";
import { truncate, dayJs, m } from "@/master";
import JobStatusNew from "@/components/Atoms/Jobs/JobStatusNew.vue";

export default defineComponent({
  components: {
    CardJobSkill,
    JobStatusNew,
  },
  props: {
    job: { type: Object, defalut: null, require: true },
  },
  setup: (props: any) => {
    const day = (value: string, format: string) => dayJs(value, format);
    const limit = (value: string, num: number) => truncate(value, num);

    const isStatusNew = computed(() => {
      if (props.job.job_status_id == m.JOB_STATUS_NEW) {
        return true;
      }
      return false;
    });

    return {
      limit,
      day,
      m: computed(() => m),
      isStatusNew,
    };
  },
});
</script>

<template>
  <div class="job-cards">
    <div class="job-cards__top">
      <span>{{ limit(job.job_title, 40) }}</span>
      <p>{{ limit(job.job_title, 30) }}</p>
    </div>
    <div class="job-cards__center">
      <!-- カード スキルコンポーネント -->
      <CardJobSkill :job="job" />
    </div>
    <div class="job-cards__bottom">
      <div class="product-start-end">
        <div class="product-start-end-tag">
          開発期間:
        </div>
        <div class="product-start-end-time">
          {{ day(job.dev_start_date, "YYYY年 M月 D日") }} ~
          {{ day(job.dev_end_date, "YYYY年 M月 D日") }}
        </div>
      </div>
      <div class="post-user-area">
        <div class="post-user-image"></div>
        <div class="post-user-name-area">
          <div class="post-user-name">
            {{ job.user.user_name }}
          </div>
        </div>
        <div class="label-area mt-5">
          <JobStatusNew :job="job" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.job-cards {
  width: 97%;
  margin: 10px 0.5%;
  border: solid 1px $card-border-color;
  background-color: $white;
  border-radius: 8px;
  transition: 0.3s;
  color: $text-main-color;
  cursor: pointer;

  @media screen and (max-width: 999px) {
    width: 100%;
  }

  &__top {
    min-height: 86px;
    text-align: left;
    padding: 2rem 2rem 0 1.5rem;
    font-weight: bold;
    pointer-events: none;
    font-size: 18px;
    text-decoration: underline;

    @media screen and (max-width: 420px) {
      padding: 2rem 0.5rem 0rem 1.5rem;
      min-height: none;
    }

    p {
      display: none;

      @media screen and (max-width: 420px) {
        display: block;
      }
    }
    @media screen and (max-width: 420px) {
      span {
        display: none;
      }
    }
  }

  &__center {
    min-height: 88px;
    padding: 10px 1.5rem 0 1.5rem;
    text-align: left;
    pointer-events: none;

    @media screen and (max-width: 420px) {
      padding: 0 0.5rem 0 1.1rem;
    }
  }

  &__bottom {
    padding: 1rem 0px 1.5rem 0;
    pointer-events: none;
    margin-top: 0.2rem;

    @media screen and (max-width: 420px) {
      padding: 0.5rem 0px 1.1rem 0;
    }

    .product-start-end {
      padding: 0rem 0px 0 2rem;
      width: 100%;
      height: 40%;
      text-align: left;
      pointer-events: none;

      @media screen and (max-width: 420px) {
        padding: 0rem 0px 0 1.1rem;
      }

      .product-start-end-tag {
        display: inline-block;
        pointer-events: none;
        font-size: 14px;

        @media screen and (max-width: 420px) {
          display: none;
        }
      }

      .product-start-end-time {
        display: inline-block;
        padding: 0 20px;
        pointer-events: none;
        font-size: 14px;
      }
    }

    .post-user-area {
      position: relative;
      padding: 0.5rem 0px 0 2rem;
      text-align: left;
      pointer-events: none;
      position: relative;
      display: grid;
      gap: 10px;
      grid-template-columns: 2fr 1fr;

      .post-user-image {
        width: 55px;
        height: 55px;
        border-radius: 50%;
        -moz-border-radius: 60px;
        -webkit-border-radius: 60px;
        border-radius: 60px;
        box-shadow: 0 0 0 3px $primary-color;
        -webkit-box-shadow: 0 0 0 3px $primary-color;
        -moz-box-shadow: 0 0 0 3px $primary-color;
        pointer-events: none;
        position: relative;
      }

      .post-user-name-area {
        text-align: left;
        padding: 1.5rem 0rem;
        position: relative;
        pointer-events: none;
        font-size: 14px;
        position: absolute;
        left: 0;
        margin-left: 6rem;

        .post-user-name {
          pointer-events: none;
        }
      }

      // TODO: 修正
      .label-area {
        margin-left: 1rem;

        @media screen and (max-width: 1100px) {
          margin-left: 0.2rem;
        }

        @media screen and (max-width: 999px) {
          margin-left: 4rem;
        }
        @media screen and (max-width: 800px) {
          margin-left: 2rem;
        }
        @media screen and (max-width: 768px) {
          margin-left: 1rem;
        }
        @media screen and (max-width: 500px) {
          margin-left: 0.5rem;
        }
        @media screen and (max-width: 430px) {
          margin-left: 0rem;
        }
      }
    }
  }
  // レスポンシブ時
  .job-cards-top-responsive {
    display: none;
  }
}
</style>
