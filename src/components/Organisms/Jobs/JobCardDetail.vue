<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
} from "@vue/composition-api";
import { InsidePropsType, PropType } from "@icare-jp/vue-props-type";
import { InputSet } from "@/components/Molecules/Forms";
import { truncate } from "@/hooks/useUtils";
import { dayJsFormat } from "@/libs/dayjs";
import CircleLoading from "@/components/Organisms/Commons/Loading/CircleLoading.vue";
import Chip from "@/components/Atoms/Commons/Chip.vue";
import FavoriteBtn from "@/components/Atoms/Button/FavoriteBtn.vue";

type State = {
  userId: number;
};

const initialState = (ctx: SetupContext): State => ({
  userId: ctx.root.$store.getters.userId,
});

const propsOption = {
  job: { type: Object as PropType<any>, required: true },
  notLogin: { type: Boolean, required: true },
  registerRedirect: { type: Function, required: true },
  circleLoading: { type: Boolean, required: true },
  isSelfJob: { type: Boolean, required: true },
  isStatusNew: { type: Boolean, required: true },
  applyFlug: { type: Boolean, required: true },
  onApply: { type: Function, required: true },
} as const;

type PropsOption = typeof propsOption;

export default defineComponent<InsidePropsType<PropsOption>>({
  components: {
    InputSet,
    CircleLoading,
    Chip,
    FavoriteBtn,
  },
  props: propsOption,
  setup: (_, ctx) => {
    const state = reactive<State>(initialState(ctx));

    return {
      ...toRefs(state),
      truncate,
      dayJsFormat,
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
            <button @click="onApply" class="btn-box-apply" v-if="applyFlug">
              応募する
            </button>
            <div class="btn-box-apply-false" v-else>応募済み</div>
            <div class="btn-box-save">
              <FavoriteBtn :job-id="job.id" />
            </div>
            <div v-if="isStatusNew" class="label-area">
              <Chip color="#2196f3" icon="mdi-label" title="新規募集" />
            </div>
          </div>
          <template v-else>
            <div class="top-job-detail-bottom">
              <router-link :to="`/manage/${job.id}/apply_users`">
                <button class="btn-box-manage">管理画面</button>
              </router-link>
              <div v-if="isStatusNew" class="label-area">
                <Chip color="#2196f3" icon="mdi-label" title="新規募集" />
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
          <button class="btn-box-apply" @click="registerRedirect">
            応募する
          </button>
          <div class="btn-box-save">
            <v-icon class="save-icon" @click="registerRedirect"
              >mdi-heart</v-icon
            >
          </div>
          <div v-if="isStatusNew" class="label-area">
            <Chip color="#2196f3" icon="mdi-label" title="新規募集" />
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
  padding: 0.3rem 0 0 1.2rem;
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

// * 管理画面遷移ボタン
.btn-box-manage {
  @include neumorphismGrey;
  padding: 0.75rem 3rem;
  border-radius: 8px;
  font-weight: 600;
  color: $primary-color;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  font-size: 1.1em;
  display: inline-block;
  cursor: pointer;
  border: none;
  margin-top: 4px;
  appearance: none;
  border: none;
  outline: none;
}

// * 応募するボタン
.btn-box-apply {
  @include red-btn;
  @include neumorphism;
  padding: 0.75rem 3rem;
  border-radius: 8px;
  font-weight: 600;
  color: $white;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  font-size: 1.1em;
  display: inline-block;
  cursor: pointer;
  border: none;
  margin-top: 4px;
  appearance: none;
  border: none;
  transition: 0.3s;
  outline: none;
}

// * 応募済みボタン
.btn-box-apply-false {
  @include grey-btn;
  display: block;
  padding: 0.75rem 3rem;
  border-radius: 8px;
  font-weight: 600;
  color: $white;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  margin-top: 4px;
  font-size: 1.1em;
  display: inline-block;
}

// * 保存アイコン
.save-icon {
  font-size: 20px;
  width: 42px;
  height: 42px;
  padding: 0.5rem;
  color: $white;
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