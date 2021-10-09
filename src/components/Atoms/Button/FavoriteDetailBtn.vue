<script lang="ts">
import Vue, { PropType } from "vue";
import { $fetch, $post, $delete } from "@/libs/axios";
import { AUTH_URL } from "@/master";
import { catchError } from "@/libs/errorHandler";
import { FavoriteParams } from "@/types/params";
import { FavoriteJob, Fetch } from "@/types/index";

type DataType = {
  userId: number;
  token: string;
  flag: boolean;
};

export default Vue.extend({
  props: {
    jobId: { type: Number as PropType<number>, default: 0 },
  },
  data(): DataType {
    return {
      flag: true,
      token: this.$store.getters.token,
      userId: this.$store.getters.userId,
    };
  },
  mounted() {
    // * ログインユーザーが保存済みか応募済みではないかを判定する
    $fetch<Fetch<FavoriteJob[]>>(
      `${AUTH_URL}/favorite_jobs?user_id=${this.userId}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    )
      .then((res) => {
        const result = res.data.response.map((v) => v.job_id);
        if (result.includes(this.jobId)) {
          this.flag = false;
        } else {
          this.flag = true;
        }
      })
      .catch((error) => {
        catchError(error);
      });
  },
  methods: {
    // * 案件を保存する
    async saveJob() {
      const params: FavoriteParams = {
        job_id: this.jobId,
        user_id: this.userId,
      };
      await $post<FavoriteParams>(`${AUTH_URL}/favorite_job`, params, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
        .then((res) => {
          this.flag = false;
          return res.data;
        })
        .catch((error) => {
          catchError(error);
        });
    },
    // * 案件を削除する
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
    <v-icon class="save-icon" @click="deleteJob" v-if="flag == false"
      >mdi-heart</v-icon
    >
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.icon {
  font-size: 30px;
  padding: 10px;
  width: 58px;
  height: 58px;
  color: $white;
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
@media screen and (max-width: $sm) {
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
