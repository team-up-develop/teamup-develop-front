<script lang="ts">
import { defineComponent, computed, PropType } from "@vue/composition-api";
import { m } from "@/master";
import { truncate } from "@/hooks/useUtils";
import { dayjs } from "@/libs/dayjs";
import JobStatusNew from "@/components/Atoms/Ribon/JobStatusNew.vue";
import { Job } from "@/types/index";
import { backGroundImage } from "@/modules/images";
import { isStatusNew } from "@/modules/jobs";
import { VChip } from "@/components/Atoms";

export default defineComponent({
  components: {
    JobStatusNew,
    VChip,
  },
  props: {
    job: { type: Object as PropType<Job>, defalut: null, required: true },
  },
  setup: (props) => {
    return {
      ...useUtils(),
      backGroundImage: computed(() =>
        backGroundImage(props.job.user?.user_image)
      ),
      isStatusNew: computed(() => isStatusNew(props.job.job_status_id)),
      // ...useJobStatus(props),
    };
  },
});

const useUtils = () => {
  return {
    m: computed(() => m),
    dayjs: computed(() => dayjs),
    truncate,
  };
};

// const useJobStatus = (props: Job[]) => {
//   const isStatusNew = computed(() => {
//     console.log(props);
//     return props.job.job_status_id == m.JOB_STATUS_NEW ? true : false;
//   });

//   return {
//     isStatusNew,
//   };
// };
</script>

<template>
  <v-sheet elevation="1" class="job-cards">
    <div v-if="isStatusNew" class="pb-2">
      <JobStatusNew :job="job" />
    </div>
    <div class="job-cards__top">
      <span>{{ truncate(job.job_title, 40) }}</span>
      <p>{{ truncate(job.job_title, 30) }}</p>
    </div>
    <div class="job-cards__center d-flex flex-wrap">
      <!-- TODO:  カード スキルコンポーネント -->
      <div
        v-for="(langage, index) in job.programing_languages.slice(0, 3)"
        :key="`language-${index}`"
      >
        <VChip color="purp" class="mr-1 mb-1 font-weight-bold langage">{{
          langage.name
        }}</VChip>
        <VChip
          size="sm"
          color="purp"
          class="mr-1 mb-1 font-weight-bold langage-responsive"
          >{{ langage.name }}</VChip
        >
      </div>
      <div
        v-for="(framework, index) in job.programing_frameworks.slice(0, 3)"
        :key="`framework-${index}`"
      >
        <VChip color="pri" class="mr-1 mb-1 font-weight-bold framework">{{
          framework.name
        }}</VChip>
        <VChip
          size="sm"
          color="pri"
          class="mr-1 mb-1 font-weight-bold framework-responsive"
          >{{ framework.name }}</VChip
        >
      </div>
      <div
        v-for="(skill, index) in job.skills.slice(0, 4)"
        :key="`skill-${index}`"
      >
        <VChip color="gree" class="mr-1 mb-1 font-weight-bold skill">{{
          skill.name
        }}</VChip>
        <VChip
          size="sm"
          color="gree"
          class="mr-1 mb-1 font-weight-bold skill-responsive"
          >{{ skill.name }}</VChip
        >
      </div>
    </div>
    <div class="job-cards__bottom">
      <div class="product-start-end">
        <div class="product-start-end-tag">
          開発期間:
        </div>
        <div class="product-start-end-time">
          {{ dayjs(job.dev_start_date).format("YYYY年 M月 D日") }} ~
          {{ dayjs(job.dev_end_date).format("YYYY年 M月 D日") }}
        </div>
      </div>
      <div class="post-user-area">
        <div
          v-if="job.user.user_image"
          class="post-user-image"
          :style="backGroundImage"
        />
        <div v-else class="post-user-image">
          <v-icon class="icon">mdi-account</v-icon>
        </div>
        <div class="post-user-name-area">
          <div class="post-user-name">
            {{ truncate(job.user.user_name, 12) }}
          </div>
        </div>
      </div>
    </div>
  </v-sheet>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.job-cards {
  width: 97%;
  margin: 10px 0.5%;
  background-color: $white;
  border-radius: 8px;
  transition: 0.3s;
  color: $text-main-color;
  cursor: pointer;
  min-width: 300px;
  position: relative;

  @media screen and (max-width: $la) {
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

    @media screen and (max-width: $me) {
      padding: 1.5rem 0.5rem 0rem 1rem;
      min-height: none;
    }

    p {
      display: none;

      @media screen and (max-width: $me) {
        display: block;
      }
    }
    @media screen and (max-width: $me) {
      span {
        display: none;
      }
    }
  }

  &__center {
    min-height: 88px;
    padding: 10px 1.5rem 0 1.5rem;
    text-align: left;
    width: 100%;
    pointer-events: none;

    @media screen and (max-width: $me) {
      padding: 0 0.5rem 0 0.8rem;
      min-height: 75px;
    }
    // TODO: あまり良くない書き方だが...
    .langage-responsive,
    .framework-responsive,
    .skill-responsive {
      display: none;
    }

    @media screen and (max-width: $sm) {
      .langage-responsive,
      .framework-responsive,
      .skill-responsive {
        display: block;
      }
      .langage,
      .framework,
      .skill {
        display: none;
      }
    }
  }

  &__bottom {
    padding: 1rem 0px 1.5rem 0;
    pointer-events: none;
    margin-top: 0.2rem;

    @media screen and (max-width: $me) {
      padding: 0rem 0px 1.1rem 0;
    }

    .product-start-end {
      padding: 0rem 0px 0 2rem;
      width: 100%;
      height: 40%;
      text-align: left;
      pointer-events: none;

      @media screen and (max-width: $me) {
        padding: 0.2rem 0px 0 0rem;
      }

      .product-start-end-tag {
        display: inline-block;
        pointer-events: none;
        font-size: 14px;

        @media screen and (max-width: $me) {
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

      @media screen and (max-width: $me) {
        padding: 0.5rem 0px 0 1.5rem;
      }

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

        .icon {
          font-size: 40px;
          margin-left: 0.5rem;
          margin-top: 0.3rem;
          color: $primary-color;
        }
      }

      .post-user-name-area {
        max-width: 180px;
        text-align: left;
        padding: 1.5rem 0rem;
        position: relative;
        pointer-events: none;
        font-size: 14px;
        position: absolute;
        left: 0;
        margin-left: 6rem;

        @media screen and (max-width: $me) {
          margin-left: 5.5rem;
        }

        .post-user-name {
          pointer-events: none;
        }
      }

      .label-area {
        position: absolute;
        right: 0;
        margin-right: 1rem;
      }
    }
  }
  // レスポンシブ時
  .job-cards-top-responsive {
    display: none;
  }
}
</style>
