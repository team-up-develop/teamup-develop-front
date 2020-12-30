<script lang="ts">
import { 
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed
} from '@vue/composition-api';
import Vuex from '@/store/index'
import axios from 'axios'
import { Job } from '@/types/job';
import { m, dayJs, API_URL, truncate } from '@/master'
import { ManageJob } from '@/types/manage';

type State = {
  chatGroups: Job[];
  userId: number;
  isActive: boolean;
  hasError: boolean;
}

const initialState = (): State => ({
  chatGroups: [],
  userId: Vuex.state.auth.userId,
  isActive: true,
  hasError: false,
});

export default defineComponent({ 
  setup: () => {
    const state = reactive<State>(initialState());

    const isLogin = computed(() => {
      if(state.userId) {
        return true
      } else {
        return false
      }
    });

    const day = (value: string, format: string) => dayJs(value, format);
    const limit = (value: string, num: number) => truncate(value, num);

    onMounted(() => {
      if(!state.userId) {
        return
      }
      axios.get<ManageJob[]>(`${API_URL}/apply_job/?user_id=${ state.userId }`)
      .then(response => {
        const array: ManageJob[] = [];
        for(let i = 0; i < response.data.length; i++){
          const applyData: ManageJob = response.data[i]
          if(applyData.applyStatusId == m.APPLY_STATUS_PARTICIPATE || applyData.applyStatusId  == m.APPLY_STATUS_SELF ) {
            array.push(applyData)
            state.chatGroups = array
          }
        }
      })
    });

    return {
      ...toRefs(state),
      isLogin,
      m: computed(() => m),
      day,
      limit
    }
  }
});
</script>

<template>
  <div class="wrapper">
    <v-sheet class="chat-card" v-if="isLogin">
      <div class="chat-card__left">
        <div class="title">
          チャットグループ
        </div>
        <v-card 
          :to="`/chat/${ chatGroup.job.id }`" 
          v-for="chatGroup in chatGroups" 
          :key="chatGroup.job.id" 
          v-bind:class="{ active: isActive, 'text-danger': hasError }"
          class="group"
          >
          <div class="group__area">
            <p>{{ limit(chatGroup.job.jobTitle, 36) }}</p>
            <v-row class="row">
              <label 
                for="name" 
                class="selfPost" 
                v-if="chatGroup.applyStatusId === m.APPLY_STATUS_SELF"
              >投稿案件</label>
              <label 
                for="name" 
                class="post" 
                v-if="chatGroup.applyStatusId === m.APPLY_STATUS_PARTICIPATE"
              >参加案件</label>
              <section>{{ day(chatGroup.createdAt, "YYYY年 M月 D日") }}</section>
            </v-row>
          </div>
        </v-card>
      </div>
        <div class="chat-card__right">
          <div class="main" ref="target">
          </div>
          <div class="bottom">
            <v-row>
              <textarea type="text" class="chat-form" name="" maxlength="0" placeholder="チャットグループを選択してください"></textarea>
              <span>
                <button class="send">送信する</button>
              </span>
            </v-row>
          </div>
        </div>
    </v-sheet>
      <div v-else>
        ログインが必要です！
      </div>
    </div>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.active {
  text-decoration: none;
}
.router-link-exact-active.router-link-active.active {
  color: $primary-color;
  font-weight: bold;
  text-decoration: underline;
}
.wrapper{
  width: 90%;
  height: 90vh;
  margin: 0 auto;
  position: relative;

  .chat-card {
    @include card-border-color;
    background-color: $white;
    width: 980px;
    border-radius: 8px;
    margin: 2rem auto;
    padding: 0 0rem;
    position: absolute;
    right: 0;
    height: 93%;
    position: relative;

    &__left {
      width: 285px;
      height: 100%;
      box-shadow: 5px 0 3px #00000011;
      border-radius: 8px 0 0px 8px;
      font-size: 14px;
      background-color: $white;
      overflow: scroll;
      z-index: 10;
      position: relative;

      .title {
        width: 100%;
        height: 60px;
        padding: 1rem 0.6rem;
        font-size: 0.5em;
        text-align: left;
        border-bottom: $card-border-color 1px solid;
        background-color: $white;
        z-index: 10;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        left: 0;
        display: flex;
        font-weight: bold;
      }

      .group {
        border-bottom: $card-border-color 1px solid;
        border-radius: none;

        &__area {
          width: 90%;
          height: 102px;
          margin: 0 auto;
          padding: 0.7rem 0 0.5rem 0;
          margin-top: 0.2rem;
          position: relative;

          .row {
            padding: 0rem 0 0.5rem 1rem;
            position: absolute;
            bottom: 0;
            height: 30px;
            width: 100%;

            .selfPost {
              @include box-shadow-btn;
              background-color: $third-dark;
              color: $white;
              padding: 0.2rem 1.5rem;
              width: 102px;
              font-weight: bold;
              font-size: 0.8em;
              border-radius: 8px;
              appearance: none;
              border: none;
              transition: .3s;
              outline: none;
            }

            .post {
              border: $third-dark 1px solid;
              color: $third-dark;
              background-color: $white;
              padding: 0.2rem 1.5rem;
              width: 102px;
              font-weight: bold;
              font-size: 0.8em;
              border-radius: 8px;
              appearance: none;
              transition: .3s;
              outline: none;
            }

            section {
              color: grey;
              font-size: 12px;
              margin-left: 5.5rem;
              position: absolute;
              right: 0;
              top: 0;
            }
          }
          p {
            text-align: left;
            color: $text-main-color;
          }

          .chat-member-name {
            font-size: 12px;
            color: $text-sub-color;
          }
        }
      }

      .router {
        cursor: pointer;
        text-decoration: none;
      }
    }

    &__right {
      width: 71%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      border-radius: 0 20px 20px 0;

      .main {
        margin-top: 0.5rem;
        height: 85%;
        padding: 1rem 2rem;
        overflow: scroll;
        display: flex;
        flex-direction: column;
        background-color: $white;
      }

      .bottom {
        background-color: #f5f5f5;
        z-index: 10;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        border-radius: 0 0px 8px 0;
        box-shadow: 0 -3px 2px #00000020;
        padding: 1rem 0 1rem 1rem;

        .chat-form {
          width: 80%;
          border-radius: 8px;
          padding: 1rem;
          background-color: rgba(128, 128, 128, 0.172);
          border: $card-border-color 1px solid;
          float: left;
          resize: none;
          outline: none;
          margin-left: 1rem
        }

          .send {
            @include blue-btn;
            color: $white;
            padding: 1rem 1rem;
            font-weight: bold;
            font-size: 14px;
            border-radius: 8px;
            appearance: none;
            border: none;
            transition: .3s;
            outline: none;
            margin-left: 0.5rem;
          }
      }
    }
  }
}

// * v-card の boxshadowを消します
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none; 
}

@media screen and (max-width: 1200px) {
  .wrapper{
    width: 100%;
  }
}

@media (max-width: 868px) {
  .wrapper{
    .chat-card {
      width: 95%;

      &__left {
        width: 100%;

        .group__area {
          padding: 0.7rem 0 0.5rem 1rem;
          margin: 0;
        }

      }
      &__right {
        display: none;
      }
    }
  }
}
</style>