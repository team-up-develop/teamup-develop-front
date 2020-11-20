<template>
  <section>
    <v-card class="dev-detail-area">
      <div class="detail-leff-area">
        <div class="detail-information">
          <div class="tag"></div>
          <div class="sub-area">
            応募の情報をここに記載する予定です”””””””応募の情報をここに記載する予定です”””””””！！！！！！
            ！！！！！！応募の情報をここに記載する予定です”””””””！！！！！！応募の情報をここに記載する予定です”””””””！！！！！！
            応募の情報をここに記載する予定です”””””””！！！！！！応募の情報をここに記載する予定です”””””””！！！！！！
            応募の情報をここに記載する予定です”””””””！！！！！！応募の情報をここに記載する予定です”””””””！！！！！！
            応募の情報をここに記載する予定です”””””””！！！！！！応募の情報をここに記載する予定です”””””””！！！！！！
            応募の情報をここに記載する予定です”””””””！！！！！！応募の情報をここに記載する予定です”””””””！！！！！！
            応募の情報をここに記載する予定です”””””””！！！！！！応募の情報をここに記載する予定です”””””””！！！！！！
            応募の情報をここに記載する予定です”””””””！！！！！！応募の情報をここに記載する予定です”””””””！！！！！！
            </div>
        </div>
        </div>
    </v-card>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.dev-detail-area {
  @include card-border-color;
  border-radius: 4px;
  padding: 1rem 4rem 1rem 4rem;
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

/* スマホレスポンシブ */
@media screen and (max-width: 500px) {
  .dev-detail-area {
    padding: 1.5rem 1rem;
  }
}
</style>