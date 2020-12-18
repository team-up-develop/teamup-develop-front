<script lang="ts">
import Vue from 'vue';
import axios from 'axios'
import { ManageJob } from '@/types/manage';
import { User } from '@/types/user';

export type DataType = {
  userId: number;
  user: User | {};
  manageNum: number;
  favoriteNum: number;
  applyNum: number;
  applyJob: {}[];
}

export default Vue.extend({ 
  data(): DataType {
    return {
      userId: this.$store.state.auth.userId,
      user: {},
      manageNum: 0,
      favoriteNum: 0,
      applyNum: 0,
      applyJob: [],
    }
  },
  created() {
    // * user 取得
    axios.get(`http://localhost:8888/api/v1/user/${this.userId}`)
    .then(response => {
      this.user = response.data
    })

    // * 管理案件数
    axios.get(`http://localhost:8888/api/v1/job/?user_id=${this.userId}`)
    .then(response => {
      this.manageNum = response.data.length
    })

    // * 保存案件数
    axios.get(`http://localhost:8888/api/v1/favorite_job/?user_id=${this.userId}`)
    .then(response => {
      this.favoriteNum = response.data.length
    })

    axios.get(`http://localhost:8888/api/v1//apply_job/?user_id=${this.userId}`)
    .then(response => {
      for(let i = 0; i < response.data.length; i++) {
        const applyJobCorrect: ManageJob = response.data[i];
        if(applyJobCorrect.applyStatusId === 1 || applyJobCorrect.applyStatusId === 2) {
          this.applyJob.push(applyJobCorrect);
        }
      }
      this.applyNum = this.applyJob.length
    })
  }
});
</script>

<template>
  <section>
    <v-sheet class="card">
      <v-col>
        <v-row class="card__top">
          <div class="user-image"></div>
          <div class="user-name">{{ user.userName }}</div>
        </v-row>
        <v-row class="card__center">
          <button class="edit-btn">編集する</button>
          <v-row class="data-area">
            <div class="value">
              <div class="num">{{ manageNum }}</div>
              <label for="name">投稿数</label>
            </div>
            <div class="value">
              <div class="num">{{ applyNum }}</div>
              <label for="name">応募数</label>
            </div>
            <div class="value">
              <div class="num">{{ favoriteNum }}</div>
              <label for="name">保存数</label>
            </div>
          </v-row>
        </v-row>
      </v-col>
    </v-sheet>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
section {
  width: 30%;

  @media screen and (max-width: 900px) {
    width: 100%;
  }

}
.card {
  @include card-border-color;
  width: 360px;
  padding: 1rem 1.2rem ;
  border-radius: 8px;

  @media screen and (max-width: 900px) {
    margin: 0 auto;
    width: 85%;
    margin-bottom: 1.5rem;
  }

  @media screen and (max-width: 600px) {
    width: 95%;
  }

  @media screen and (max-width: 450px) {
    width: 98%;
  }

  &__top {
    padding: 0.2rem 0 0 1.45rem;
    height: 70px;

    .user-image {
      width: 52px;
      height: 52px;
      @include user-image;
    }
    .user-name {
      margin-left: 1rem;
      margin-top: 0.9rem;
      font-weight: bold;
    }
  }

  &__center {
    height: 120px;
    position: relative;

    .edit-btn {
      @include box-shadow-btn;
      @include purple-btn;
      color: $basic-white;
      padding: 0.5rem 4rem;
      position: absolute;
      left: 0;
      width: 100%;
      font-weight: bold;
      font-size: 0.8em;
      border-radius: 8px;
      appearance: none;
      border: none;
      transition: .3s;
      outline: none;
    }
    .data-area {
      padding: 3.5rem 0 0 0;

      .value {
        width: 33%;

        .num {
          font-size: 1.5em;
        }
      }
    }
  }
}
</style>