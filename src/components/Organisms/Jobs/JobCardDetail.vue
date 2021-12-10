<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  watch,
} from "@vue/composition-api";
import { InsidePropsType, PropType } from "@icare-jp/vue-props-type";
import { InputSet } from "@/components/Molecules/Forms";
import { truncate } from "@/hooks/useUtils";
import { dayJsFormat } from "@/libs/dayjs";
import CircleLoading from "@/components/Organisms/Commons/Loading/CircleLoading.vue";
import { VButton, VChip, VIcons } from "@/components/Atoms";
import { $fetch, $post, $delete } from "@/libs/axios";
import { AUTH_URL } from "@/master";
import { catchError } from "@/libs/errorHandler";
import { FavoriteParams } from "@/types/params";
import { FavoriteJob, Fetch } from "@/types/index";
import { useUtils } from "@/hooks";

type State = {
  userId: number;
  isFavorite: boolean;
  token: string | undefined;
};

const initialState = (ctx: SetupContext): State => ({
  userId: ctx.root.$store.getters.userId,
  isFavorite: true,
  token: ctx.root.$store.getters.token,
});

const propsOption = {
  job: { type: Object as PropType<any>, required: true },
  notLogin: { type: Boolean, required: true },
  registerRedirect: { type: Function as PropType<() => void>, required: true },
  circleLoading: { type: Boolean, required: true },
  isSelfJob: { type: Boolean, required: true },
  isStatusNew: { type: Boolean, required: true },
  applyFlug: { type: Boolean, required: true },
  onApply: { type: Function as PropType<() => Promise<void>>, required: true },
} as const;

type PropsOption = typeof propsOption;

export default defineComponent<InsidePropsType<PropsOption>>({
  components: {
    InputSet,
    CircleLoading,
    VButton,
    VChip,
    VIcons,
  },
  props: propsOption,
  setup: (props, ctx) => {
    const state = reactive<State>(initialState(ctx));
    const { headerAuth } = useUtils();

    const fetchFavorite = async () => {
      try {
        const res = await $fetch<Fetch<FavoriteJob[]>>(
          `${AUTH_URL}/favorite_jobs?user_id=${state.userId}`,
          headerAuth.value
        );
        const result = res.data.response.map((v) => v.job_id);
        if (result.includes(props.job.id)) {
          state.isFavorite = false;
        } else {
          state.isFavorite = true;
        }
      } catch (error) {
        catchError(error);
      }
    };

    watch(
      () => props.job.id,
      () => {
        fetchFavorite();
      }
    );

    const saveJob = async () => {
      const params: FavoriteParams = {
        job_id: props.job.id,
        user_id: state.userId,
      };
      try {
        await $post<FavoriteParams>(
          `${AUTH_URL}/favorite_job`,
          params,
          headerAuth.value
        );
        state.isFavorite = false;
      } catch (error) {
        catchError(error);
      }
    };
    const deleteJob = async () => {
      const params: FavoriteParams = {
        job_id: props.job.id,
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
          state.isFavorite = true;
        }
      } catch (error) {
        catchError(error);
      }
    };

    return {
      ...toRefs(state),
      truncate,
      dayJsFormat,
      saveJob,
      deleteJob,
    };
  },
});
</script>

<template>
  <v-card class="job-wrapper-right">
    <div class="top-job-detail-area">
      <div class="top-job-detail-area__title">
        {{ truncate(job.job_title, 60) }}
      </div>
      <!-- ログイン時 -->
      <template v-if="!notLogin">
        <div v-show="!circleLoading">
          <div class="top-job-detail-bottom" v-if="!isSelfJob">
            <VButton
              v-if="applyFlug"
              bc="red"
              size="lg"
              class="px-12 body-1"
              @click="onApply"
              >応募する</VButton
            >
            <VButton v-else bc="grey" size="lg" class="px-12 body-1"
              >応募済み</VButton
            >
            <div class="btn-box-save">
              <VIcons class="save-icon" @click="saveJob" v-if="isFavorite"
                >mdi-heart</VIcons
              >
              <VIcons
                class="saved-icon"
                size="md"
                @click="deleteJob"
                v-if="isFavorite == false"
                >mdi-heart</VIcons
              >
            </div>
            <div v-if="isStatusNew" class="label-area">
              <VChip color="pri"
                ><v-icon class="mr-1">mdi-label</v-icon>新規募集</VChip
              >
            </div>
          </div>
          <template v-else>
            <div class="top-job-detail-bottom">
              <router-link
                class="text-decoration-none"
                :to="`/manage/${job.id}/apply_users`"
              >
                <VButton bc="primaryWhite" size="lg" class="px-12 body-1"
                  >管理画面</VButton
                >
              </router-link>
              <div v-if="isStatusNew" class="label-area">
                <VChip color="pri"
                  ><v-icon class="mr-1">mdi-label</v-icon>新規募集</VChip
                >
              </div>
            </div>
          </template>
        </div>
        <div v-show="circleLoading" class="pb-4">
          <CircleLoading />
        </div>
      </template>

      <template v-else>
        <div class="top-job-detail-bottom">
          <VButton
            bc="red"
            size="lg"
            class="px-12 body-1"
            @click="registerRedirect"
            >応募する</VButton
          >
          <div class="btn-box-save">
            <VIcons class="save-icon" @click="registerRedirect"
              >mdi-heart</VIcons
            >
          </div>
          <div v-if="isStatusNew" class="label-area">
            <VChip color="pri"
              ><VIcons class="mr-1">mdi-label</VIcons>新規募集</VChip
            >
          </div>
        </div>
      </template>
    </div>
    <!-- 右側案件詳細 -->
    <div class="main-job-detail-area">
      <div class="tag-area">
        投稿者
      </div>
      <router-link :to="`/account/profile/${job.user_id}/detail`">
        <div class="post-user-name-area">
          {{ truncate(job.user.user_name, 55) }}
        </div>
      </router-link>
      <InputSet
        :skills="job.programing_languages"
        label="開発言語"
        color="#651fff"
      />
      <InputSet
        :skills="job.programing_frameworks"
        label="フレームワーク"
        color="#2196f3"
      />
      <InputSet :skills="job.skills" label="その他スキル" color="#00bcd4" />
      <div class="tag-area">
        開発期間
      </div>
      <div class="post-user-area">
        {{ dayJsFormat(job.dev_start_date, "YYYY年 M月 D日") }} ~
        {{ dayJsFormat(job.dev_end_date, "YYYY年 M月 D日") }}
      </div>
      <div class="tag-area">
        募集人数
      </div>
      <div class="post-user-area">{{ job.recruitment_numbers }} 人</div>
      <div class="tag-area">
        開発詳細
      </div>
      <div class="post-user-area pre-wrap">
        {{ job.job_description }}
      </div>
      <div class="jobDetail-time-area">
        投稿期日 {{ dayJsFormat(job.created_at, "YYYY年 M月 D日") }}
      </div>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

// * 案件詳細画面
.job-wrapper-right {
  width: 52%;
  height: 90vh;
  margin-left: 2rem;
  margin-top: 1rem;
  background-color: $white;
  position: sticky;
  display: inline-block;
  margin-bottom: 0.2rem;
  bottom: 0;
  border-radius: 8px;
  color: $text-main-color;
  text-align: left;

  .top-job-detail-area {
    font-weight: bold;
    padding: 1.5rem 2rem 1rem 2rem;
    box-shadow: 2px 4px 3px -2px rgba(3, 29, 41, 0.15);

    &__title {
      width: 100%;
      height: 50%;
      font-size: 1.2em;
    }

    .top-job-detail-bottom {
      width: 100%;
      height: 65%;
      display: inline-block;
      position: relative;
      margin-top: 0.8rem;

      .label-area {
        float: right;
        margin-top: 0.6rem;

        .label {
          width: 146px;
          font-size: 14px;
          background-color: $third-dark;
          color: $white;
          border-radius: 8px;
          font-weight: bold;
          text-decoration: none;
        }
      }
    }
  }
}

.btn-box-save {
  display: inline-block;
  padding: 0rem 0 0 1.2rem;
  position: absolute;
  top: 0;
}

.job-wrapper-right .main-job-detail-area {
  height: calc(79% - 1rem);
  overflow: auto;
  padding: 0 2rem 1rem 2rem;
  position: relative;

  .tag-area {
    font-weight: bold;
    margin: 1rem 0 0rem 0;
    font-size: 1em;

    .icon {
      color: $primary-color;
    }
  }
}

.post-user-area {
  line-height: 1.8;
  font-size: 14px;
}

.jobDetail-time-area {
  margin-top: 1rem;
  font-size: 12px;
  color: $dark-grey;
  float: right;
}

.post-user-name-area {
  line-height: 1.8;
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 0.3rem;
  font-size: 16px;

  &:hover {
    color: $primary-color;
    transition: 0.3s;
  }
}

// * 保存アイコン
.save-icon {
  max-width: 42px !important;
  height: 42px;
  padding: 0.5rem;
  color: $white;
  cursor: pointer;
  background-color: #d8d6d6;
  border-radius: 5px / 5px;
}

.saved-icon {
  max-width: 42px !important;
  height: 42px;
  padding: 0.5rem;
  color: red;
  cursor: pointer;
  background-color: #d8d6d6;
  border-radius: 5px / 5px;
}

.pre-wrap {
  white-space: pre-wrap;
}

@media screen and (max-width: 1289px) {
  .job-wrapper-right {
    margin-left: 0.5rem;
  }
}

@media screen and (max-width: $la) {
  // * 右側案件をdisplaynone
  .job-wrapper-right {
    display: none;
  }

  .job-wrapper-left,
  .job-wrapper-right-false {
    display: none;
  }
}
</style>
