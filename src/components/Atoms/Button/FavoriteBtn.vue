<script lang="ts">
import Vue, { PropType } from "vue";
import { $fetch, $post, $delete } from "@/libs/axios";
import { API_URL, AUTH_URL } from "@/master";
import { catchError } from "@/libs/errorHandler";
import { FavoriteParams } from "@/types/params";
import { FetchFavoriteJob } from "@/types/fetch";
// import { useUtils } from "@/hooks";

type DataType = {
  userId: number;
  flag: boolean;
  token: string;
};

export default Vue.extend({
  props: {
    jobId: { type: Number as PropType<number>, default: 0 },
  },
  data(): DataType {
    return {
      userId: this.$store.getters.userId,
      token: this.$store.getters.token,
      flag: true,
    };
  },
  async created() {
    // * ログインユーザーが保存済みか応募済みではないかを判定する
    try {
      const res = await $fetch<FetchFavoriteJob>(
        `${API_URL}/favorite_jobs?user_id=${this.userId}`
      );
      const array = [];
      for (const favoriteJob of res.data.response) {
        array.push(favoriteJob.job.id);
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
  methods: {
    // * 案件を保存する
    async saveJob() {
      const params: FavoriteParams = {
        job_id: this.jobId,
        user_id: this.userId,
      };
      try {
        await $post<FavoriteParams>(`${AUTH_URL}/favorite_job`, params, {
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
            // "Cache-Control": "no-cache,no-store",
            // Pragma: "no-cache",
            // Expires: 0,
          },
        });
        this.flag = false;
      } catch (error) {
        catchError(error);
      }
    },
    //* 案件削除
    // TODO: DELETE ができていない
    // https://myteam-qd67443.slack.com/archives/CNYQEFRK3/p1621171067005500
    async deleteJob() {
      const params: FavoriteParams = {
        job_id: this.jobId,
        user_id: this.userId,
      };
      try {
        const res = await $delete<FavoriteParams>(`${AUTH_URL}/favorite_job`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          data: {
            ...params,
          },
        });
        if (res.data) {
          this.flag = true;
        }
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
