<script lang="ts">
import Vue, { PropType } from 'vue';
import { API_URL } from '@/master'
import axios from 'axios'
import { FavoriteParams } from '@/types/job';

type DataType = {
  userId: number;
  flag: boolean;
}

export default Vue.extend({
  props: {
    jobId: { type: Number as PropType<number>, default: 0 },
  },
  data(): DataType {
    return {
      userId: this.$store.state.auth.userId,
      flag: true,
    }
  },
  created() {
    // * ログインユーザーが保存済みか応募済みではないかを判定する
    axios.get(`${API_URL}/favorite_job/?user_id=${this.userId}`)
    .then(response => {
      const array = []
      for(let i = 0; i < response.data.length; i++){
        const likeData = response.data[i]
        array.push(likeData.job.id)
      }
      if(array.includes(this.jobId)){
        this.flag = false
      }
      else {
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
      axios.post<FavoriteParams>(`${API_URL}/favorite_job/`, params)
      .then(response => {
        this.flag = false
        return response.data
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
      axios.delete<FavoriteParams>(`${API_URL}/favorite_job/`, {data: params })
      .then(response => {
        this.flag = true
        return response.data
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
    <v-icon class="icon" @click="saveJob" v-if="flag">mdi-heart</v-icon>
    <v-icon class="end-icon" @click="deleteJob" v-if="flag == false">mdi-heart</v-icon>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
// * 保存アイコン 
.icon {
  font-size: 20px;
  width: 42px;
  height: 42px;
  padding: 0.5rem;
  color: $white;
  cursor: pointer;
  background-color: #d8d6d6;
  border-radius: 5px / 5px;
}

.end-icon {
  font-size: 20px;
  width: 42px;
  height: 42px;
  padding: 0.5rem;
  color: red;
  cursor: pointer;
  background-color: #d8d6d6;
  border-radius: 5px / 5px;
}
</style>