<template>
  <div class="job-cards">
    <div class="job-cards__top">
      <span>{{ job.jobTitle | truncateTitle }}</span>
      <p>{{ job.jobTitle | truncateTitleResponsive }}</p>
    </div>
    <div class="job-cards__center">
      <!-- カード スキルコンポーネント -->
      <card-job-skill :job="job"></card-job-skill>
    </div>
    <div class="job-cards__bottom">
      <div class="product-start-end">
        <div class="product-start-end-tag">
          開発期間:
        </div>
        <div class="product-start-end-time">
          {{ job.devStartDate | moment("YYYY年 M月 D日") }}  ~  {{ job.devEndDate | moment("YYYY年 M月 D日")}}
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

<script>
import CardJobSkill from '@/components/job/CardJobSkill.vue'
import moment from "moment";
export default {
  props: {
    job: {}
  },
  data() {
    return {
      jobs: [] 
    }
  },
  filters: {
    // * date型を文字に変換
    moment(value, format) {
      return moment(value).format(format);
    },
    //* 案件タイトル 文字制限
    truncateTitle: function(value) {
      const length = 40;
      const ommision = "...";
      if (value.length <= length) {
        return value;
      }
      return value.substring(0, length) + ommision;
    },
    //* 案件タイトル レスポンシブ文字制限
    truncateTitleResponsive: function(value) {
      const length = 35;
      const ommision = "...";
      if (value.length <= length) {
        return value;
      }
      return value.substring(0, length) + ommision;
    },
  },
  components: {
    CardJobSkill
  }
}
</script>

<style lang="scss" scoped>
.job-cards {
  width: 97%;
  height: 292px;
  margin: 10px 0.5%;
  border: solid 1px $card-border-color;
  background-color: $basic-white;
  border-radius: 8px;
  transition: .3s;
  color: $text-main-color;

  &__top {
    width: calc(100% - 60px);
    height: calc(30% - 60px);
    text-align: left;
    padding: 2rem 2rem 1rem 1.5rem;
    font-weight: bold;
    pointer-events: none;
    font-size: 18px;
    text-decoration: underline;
    p {
      display: none;
    }
  }

  &__center {
    width: calc(100% - 40px);
    height: calc(35% - 20px);
    padding: 10px 1.5rem 0 1.5rem;
    text-align: left;
    pointer-events: none;
  }

  &__bottom {
    width: calc(100% - 50px);
    height: calc(38% - 20px);
    padding: 10px 25px;
    pointer-events: none;
    margin-top: 0.2rem;

    .product-start-end {
      width: 100%;
      height: 40%;
      text-align: left;
      pointer-events: none;

      /* font-weight: bold; */

      .product-start-end-tag {
        display: inline-block;
        pointer-events: none;
        font-size: 14px;
      }

      .product-start-end-time {
        display: inline-block;
        padding: 0 20px;
        pointer-events: none;
        font-size: 14px;
      }
    }

    .post-user-area {
      width: 100%;
      height: 60%;
      text-align: left;
      pointer-events: none;

      /* font-weight: bold; */

      .post-user-image {
        width: 55px;
        height: 100%;
        border-radius: 50%;
        -moz-border-radius: 60px;
        -webkit-border-radius: 60px;
        border-radius: 60px;
        box-shadow: 0 0 0 3px $primary-color;
        -webkit-box-shadow: 0 0 0 3px $primary-color;
        -moz-box-shadow: 0 0 0 3px $primary-color;
        display: inline-block;
        pointer-events: none;
      }

      .post-user-name-area {
        display: inline-block;
        width: 50%;
        height: 60%;
        padding: 0.1rem 1rem;
        position: relative;
        pointer-events: none;
        font-size: 14px;

        .post-user-name {
          position: absolute;
          top: 0;
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

@media screen and (max-width: 999px) {
  .job-cards {
    width: 100%;
  }
}

@media screen and (max-width: 500px) {

  .job-cards-top-responsive {
    width: 95%;
    height: calc(30% - 60px);
    text-align: left;
    padding: 2rem 1rem 1rem 1rem;
    font-weight: bold;
    pointer-events: none;
    font-size: 18px;
    text-decoration: underline;
    display: block;
  }
  .job-cards .job-cards-bottom .product-start-end .product-start-end-tag {
    display: none;
  }
  .job-cards .job-cards-bottom .product-start-end .product-start-end-time {
    padding: 0;
  }

  .job-cards-center {
    padding: 10px 1rem 0 1rem;
  }

  .job-cards-bottom {
    padding: 10px 1rem;

    .product-start-end .product-start-end-time {
      padding: 0 10px;
    }
  }
}

@media screen and (max-width: 420px) {
  .job-cards {
    height: 285px;
  }
  .job-cards {
    .job-cards-top {
      font-size: 16px;
      width: calc(100% - 2rem);
      // background-color: yellow;
      padding: 2rem 1rem 1rem 1rem;

      span {
        display: none;
      }
      p {
        display: inline;
      }
    }
  }

  .job-cards  {
    .job-cards-center {
      height: 30%;
      width: calc(100% - 1rem);
      padding: 0.5rem 0.5rem 0.2rem 0.5rem;
    }
  }

  .job-cards  {
    .job-cards-bottom {
      padding: 0 1.2rem;
      height: 33%;

      .post-user-area {
        width: 100%;
        height: 60%;
      }

      .product-start-end .product-start-end-tag {
        display: none;
      }
    }
  }
}
</style>