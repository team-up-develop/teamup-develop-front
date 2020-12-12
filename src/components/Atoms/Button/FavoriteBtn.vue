<script lang="ts">
// FIXME: 使用していない
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
      userId: this.$store.state.auth.userId,
      flag: true,
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
  <div>
    <font-awesome-icon icon="heart" class="icon" @click="saveJob" v-if="flag"/>
    <font-awesome-icon icon="heart" class="save-icon" @click="deleteJob" v-if="flag == false"/>
    <div class="btn-box-save-false" @click="deleteJob" v-if="flag == false">
      削除する
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
.icon {
  font-size: 30px;
  padding: 10px;
  width: 50px;
  height: 50px;
  color: $basic-white;
  cursor: pointer;
  background-color: #d8d6d6;
  border-radius: 5px / 5px;
}

.save-icon {
  font-size: 30px;
  padding: 10px;
  width: 50px;
  height: 50px;
  color: red;
  cursor: pointer;
  background-color: #d8d6d6;
  border-radius: 5px / 5px;
}
</style>