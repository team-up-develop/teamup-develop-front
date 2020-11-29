<script lang="ts">
import Vue from 'vue';
import axios from 'axios'
import { FavoriteParams } from '@/types/job';

export type DataType = {
  userId: number;
  flag: boolean;
}

export default Vue.extend({
  props: {
    jobId: Number
  },
  data(): DataType {
    return {
      flag: true,
      userId: this.$store.state.auth.userId,
    }
  },
  mounted() {
    // * ログインユーザーが保存済みか応募済みではないかを判定する
    axios.get(`http://localhost:8888/api/v1/favorite_job/?user_id=${this.userId}`)
    .then(response => {
      const array = []
      for(let i = 0; i < response.data.length; i++){
        const likeData = response.data[i]
        array.push(likeData.job.id)
      }
      if(array.includes(this.jobId)){
        this.flag = false
      }
      else{
        this.flag = true
      }
    })
  },
  methods: {
    // * 案件を保存する
    saveJob(){
      const params: FavoriteParams = {
        jobId: this.jobId, 
        userId: this.userId
      };
      axios.post('http://localhost:8888/api/v1/favorite_job/', params)
      .then(response => {
        this.flag = false
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    },
    // * 案件を削除する
    deleteJob() {
      const params: FavoriteParams = {
        jobId: this.jobId,
        userId: this.userId
      };
      axios.delete('http://localhost:8888/api/v1/favorite_job/', {data: params })
      .then(response => {
        this.flag = true
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
  }
});
</script>


<template>
  <section>
    <font-awesome-icon icon="heart" class="icon" @click="saveJob" v-if="flag"/>
    <font-awesome-icon icon="heart" class="save-icon" @click="deleteJob" v-if="flag == false"/>
    <!-- <div class="btn-box-save-false" @click="deleteJob" v-if="flag == false">
      保存削除
    </div> -->
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

// * 現在は使用していない
.btn-box-save {
  @include blue-btn;
  display: block;
  padding: 1.4rem 4.3rem;
  box-shadow: 0 0px 5px 2px #d4d4d4;
  border-radius: 50px;
  font-weight: 600;
  // color: $basic-white;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  font-size: 1.1rem;
  display: inline-block;
  cursor: pointer;
  border: none;

  :hover {
    background-color: red;
    font-size: 100px;
  }
}

.btn-box-save-false {
  @include grey-btn ;
  display: block;
  padding: 1.4rem 4.3rem;
  box-shadow: 0 0px 10px 5px #d4d4d4;
  border-radius: 50px;
  font-weight: 600;
  // color: $basic-white;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  font-size: 1.1rem;
  display: inline-block;
  cursor: pointer;
}

.icon {
  font-size: 30px;
  padding: 10px;
  width: 58px;
  height: 58px;
  color: $basic-white;
  cursor: pointer;
  background-color: #d8d6d6;
  border-radius: 5px / 5px;
}

.save-icon {
  font-size: 30px;
  padding: 10px;
  width: 58px;
  height: 58px;
  color: red;
  cursor: pointer;
  background-color: #d8d6d6;
  border-radius: 5px / 5px;
}


//* スマホレスポンシブ 
@media screen and (max-width: 500px) {
  .icon {
    width: 48px;
    height: 48px;
  }

  .save-icon {
    width: 48px;
    height: 48px;
  }
}
</style>