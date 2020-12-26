<script lang="ts">
import { 
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed
} from '@vue/composition-api';
import CardJobSkill from '@/components/Atoms/Jobs/CardJobSkill.vue'
import { timeChange, truncate } from '@/master'
import { Job } from '@/types/job';

export default defineComponent({ 
  components: {
    CardJobSkill
  },
  props: {
    job: { type: Object, defalut: null, require: true }
  },
  setup: () => {
    const moment = (value: string, format: string) => timeChange(value, format);
    const limit = (value: string, num: number) => truncate(value, num);
    return {
      moment,
      limit
    }
  }
});
</script>

<template>
  <div class="job-cards">
    <div class="job-cards__top">
      <span>{{ limit(job.jobTitle, 40) }}</span>
      <p>{{ limit(job.jobTitle, 30) }}</p>
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
          {{ moment(job.devStartDate , "YYYY年 M月 D日") }}  ~  {{ moment(job.devEndDate , "YYYY年 M月 D日")}}
        </div>
      </div>
      <div class="post-user-area">
        <div class="post-user-image"></div>
        <div class="post-user-name-area">
          <div class="post-user-name">
            {{ job.user.userName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.job-cards {
  width: 97%;
  margin: 10px 0.5%;
  border: solid 1px $card-border-color;
  background-color: $white;
  border-radius: 8px;
  transition: .3s;
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
    padding: 1rem 0px 1.5rem 0 ;
    pointer-events: none;
    margin-top: 0.2rem;

    @media screen and (max-width: 420px) {
      padding: 0.5rem 0px 1.1rem 0 ;
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
      padding: 0.5rem 0px 0 2rem;
      // width: 30%;
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
    }
  }
  // レスポンシブ時
  .job-cards-top-responsive {
    display: none;
  }
}

</style>