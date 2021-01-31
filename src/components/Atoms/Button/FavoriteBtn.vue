<script lang="ts">
import Vue, { PropType } from "vue";
import { API_URL, catchError } from "@/master";
import axios from "axios";
import { FavoriteParams } from "@/types/params";

type DataType = {
  userId: number;
  flag: boolean;
};

export default Vue.extend({
  props: {
    jobId: { type: Number as PropType<number>, default: 0 },
  },
  data(): DataType {
    return {
      userId: this.$store.state.auth.userId,
      flag: true,
    };
  },
  async created() {
    // * ログインユーザーが保存済みか応募済みではないかを判定する
    try {
      const res = await axios.get(
        `${API_URL}/favorite_jobs?user_id=${this.userId}`
      );
      const array = [];
      for (let i = 0; i < res.data.response.length; i++) {
        const likeData = res.data.response[i];
        array.push(likeData.job.id);
      }
      if (array.includes(this.jobId)) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    } catch (error) {
      catchError(error);
    }
  },
  mounted() {
    console.log("毎回よばrててほしい");
  },
  methods: {
    // * 案件を保存する
    async saveJob() {
      const params: FavoriteParams = {
        job_id: this.jobId,
        user_id: this.userId,
      };
      try {
        await axios.post<FavoriteParams>(`${API_URL}/favorite_job`, params);
        this.flag = false;
      } catch (error) {
        catchError(error);
      }
    },
    // * 案件を削除する
    async deleteJob() {
      const params: FavoriteParams = {
        job_id: this.jobId,
        user_id: this.userId,
      };
      try {
        await axios.delete<FavoriteParams>(`${API_URL}/favorite_job`, {
          data: params,
        });
        this.flag = true;
      } catch (error) {
        catchError(error);
      }
    },
  },
});
</script>

<template>
  <section>
    <v-icon class="icon" @click="saveJob" v-if="flag">mdi-heart</v-icon>
    <v-icon class="end-icon" @click="deleteJob" v-if="flag == false"
      >mdi-heart</v-icon
    >
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
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
