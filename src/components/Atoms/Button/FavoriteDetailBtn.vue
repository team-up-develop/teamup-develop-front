<script lang="ts">
import Vue, { PropType } from "vue";
import {
  $fetch,
  $post,
  $delete,
  API_URL,
  AUTH_URL,
  catchError,
} from "@/master";
import { FavoriteParams } from "@/types/params";
import { FetchFavoriteJob } from "@/types/fetch";

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
      token: this.$store.state.auth.token,
      userId: this.$store.state.auth.userId,
    };
  },
  mounted() {
    // * ログインユーザーが保存済みか応募済みではないかを判定する
    $fetch<FetchFavoriteJob>(`${API_URL}/favorite_jobs?user_id=${this.userId}`)
      .then((res) => {
        const array = [];
        for (const favoriteJob of res.data.response) {
          array.push(favoriteJob.job.id);
        }
        if (array.includes(this.jobId)) {
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
            params,
          },
        });
        if (res.data) {
          this.flag = false;
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

// * 現在は使用していない
.btn-box-save {
  @include blue-btn;
  display: block;
  padding: 1.4rem 4.3rem;
  box-shadow: 0 0px 5px 2px #d4d4d4;
  border-radius: 50px;
  font-weight: 600;
  // color: $white;
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
  @include grey-btn;
  display: block;
  padding: 1.4rem 4.3rem;
  box-shadow: 0 0px 10px 5px #d4d4d4;
  border-radius: 50px;
  font-weight: 600;
  // color: $white;
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
