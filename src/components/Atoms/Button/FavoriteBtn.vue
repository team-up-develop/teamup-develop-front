<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  watch,
} from "@vue/composition-api";
import { InsidePropsType } from "@icare-jp/vue-props-type";
import { $fetch, $post, $delete } from "@/libs/axios";
import { AUTH_URL } from "@/master";
import { catchError } from "@/libs/errorHandler";
import { FavoriteParams } from "@/types/params";
import { FetchFavoriteJob } from "@/types/fetch";
import { useUtils } from "@/hooks";

type State = {
  userId: number;
  flag: boolean;
  token: string;
};

const initialState = (ctx: SetupContext): State => ({
  userId: ctx.root.$store.getters.userId,
  token: ctx.root.$store.getters.token,
  flag: true,
});

const propsOption = {
  jobId: { type: Number, default: 0, required: true },
};
type PropsOption = typeof propsOption;

export default defineComponent<InsidePropsType<PropsOption>>({
  props: propsOption,
  setup(props, ctx) {
    const state = reactive<State>(initialState(ctx));
    const { auth } = useUtils();

    const fetchFavorite = async () => {
      try {
        const res = await $fetch<FetchFavoriteJob>(
          `${AUTH_URL}/favorite_jobs?user_id=${state.userId}`,
          {
            headers: auth.value,
          }
        );
        const result = res.data.response.map((v) => v.job_id);
        if (result.includes(props.jobId)) {
          state.flag = false;
        } else {
          state.flag = true;
        }
      } catch (error) {
        catchError(error);
      }
    };

    watch(
      () => props.jobId,
      () => {
        fetchFavorite();
      }
    );

    const saveJob = async () => {
      const params: FavoriteParams = {
        job_id: props.jobId,
        user_id: state.userId,
      };
      try {
        await $post<FavoriteParams>(`${AUTH_URL}/favorite_job`, params, {
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "application/json",
            // "Cache-Control": "no-cache,no-store",
            // Pragma: "no-cache",
            // Expires: 0,
          },
        });
        state.flag = false;
      } catch (error) {
        catchError(error);
      }
    };

    const deleteJob = async () => {
      const params: FavoriteParams = {
        job_id: props.jobId,
        user_id: state.userId,
      };
      try {
        const res = await $delete<FavoriteParams>(`${AUTH_URL}/favorite_job`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
          data: {
            ...params,
          },
        });
        if (res.data) {
          state.flag = true;
        }
      } catch (error) {
        catchError(error);
      }
    };

    return {
      ...toRefs(state),
      saveJob,
      deleteJob,
    };
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

.save-icon {
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
