<template>
  <div class="job-cards">
    <div class="job-cards__top">
      <span>{{ jobTitle }}</span>
      <p>{{ jobTitleResponsive }}</p>
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
  },
  computed: {
    //* 案件タイトル 文字制限
    jobTitle: function() {
      if(this.job) {
        if(this.job.jobTitle.length > 40) {
          return this.job.jobTitle.substring(0,40) + '...';
        }
        return this.job.jobTitle;
      }
      return "";
    },
    //* 案件タイトル レスポンシブ文字制限
    jobTitleResponsive: function() {
      if(this.job) {
        if(this.job.jobTitle.length > 30) {
          return this.job.jobTitle.substring(0,30) + '...';
        }
        return this.job.jobTitle;
      }
      return "";
    },
  },
  components: {
    CardJobSkill
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
.job-cards {
  width: 97%;
  margin: 10px 0.5%;
  border: solid 1px $card-border-color;
  background-color: $basic-white;
  border-radius: 8px;
  transition: .3s;
  color: $text-main-color;
  cursor: pointer;
  // min-height: 292px; //? 最低限の高さ Card

  &__top {
    text-align: left;
    padding: 2rem 2rem 0 1.5rem;
    font-weight: bold;
    pointer-events: none;
    font-size: 18px;
    text-decoration: underline;
    p {
      display: none;
    }
  }

  &__center {
    padding: 10px 1.5rem 0 1.5rem;
    text-align: left;
    pointer-events: none;
  }

  &__bottom {
    padding: 1rem 0px 1.5rem 0 ;
    pointer-events: none;
    margin-top: 0.2rem;

    .product-start-end {
      padding: 0rem 0px 0 2rem;
      width: 100%;
      height: 40%;
      text-align: left;
      pointer-events: none;

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
  .job-cards 
  .job-cards-bottom 
  .product-start-end 
  .product-start-end-tag {
    display: none;
  }
  .job-cards 
  .job-cards-bottom 
  .product-start-end 
  .product-start-end-time {
    padding: 0;
  }

  .job-cards-center {
    padding: 10px 1rem 0 1rem;
  }

  .job-cards__bottom {
    padding: 10px 1rem;

    .product-start-end {
      padding: 0 0 0 0.5rem;

      .product-start-end-time {
        padding: 0 10px;
      }
    }
  }
}

@media screen and (max-width: 420px) {
  .job-cards {
    &__top {
      font-size: 16px;
      padding: 1rem 0.8rem 0 0.8rem;

      span {
        display: none;
      }
      
      p {
        display: block;
      }
    }
  }

  .job-cards  {
    &__center {
      height: 30%;
      padding: 0rem 0.5rem;
    }
  }

  .job-cards  {
    &__bottom {
      padding: 0.5rem 0 0.5rem 0;

      .post-user-area {
        padding: 0.5rem 0px 0.5rem 1rem;
      }

      .product-start-end .product-start-end-tag {
        display: none;
      }
    }
  }
}
</style>