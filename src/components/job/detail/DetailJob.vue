<script lang="ts">
import Vue from 'vue';
import moment from "moment";

export default Vue.extend({ 
  props: {
    job: Object
  },
  filters: {
    moment(value: string, format: string) {
      return moment(value).format(format);
    }
  },
});
</script>

<template>
  <section>
    <v-sheet class="dev-detail-area">
      <div class="detail-leff-area">
        <div class="detail-information">
          <div class="tag">タイトル</div>
          <div class="sub-area">{{ job.jobTitle }}</div>
        </div>
        <div class="detail-information">
          <div class="tag">募集人数</div>
          <div class="sub-area">{{ job.recruitmentNumbers }}人</div>
        </div>
        <div class="detail-information">
          <div class="tag">応募ケース</div>
          <div class="sub-area">新規開発</div>
        </div>
        <div class="detail-information">
          <div class="tag">開発期間</div>
          <div class="sub-area">{{ job.devStartDate | moment("YYYY年 M月 D日") }} ~ {{ job.devEndDate  | moment("YYYY年 M月 D日")}}</div>
        </div>
        <div class="detail-information">
          <div class="tag">応募ケース</div>
          <div class="sub-area">{{ job.jobDescription }}</div>
        </div>
      </div>
      <!-- <div class="detail-right-area">
        <div class="tag">募集内容詳細</div>
        <div class="description">
          {{ job.jobDescription }}
        </div>
      </div> -->
    </v-sheet>
  </section>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.dev-detail-area {
  @include card-border-color;
  border-radius: 4px;
  padding: 1.5rem 4rem 1rem 4rem;
  margin-bottom: 2rem;
  position: relative;
  line-height: 1.8;

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

//* スマホレスポンシブ 
@media screen and (max-width: 500px) {
  .dev-detail-area {
    padding: 1.5rem 1rem;
  }
}
</style>