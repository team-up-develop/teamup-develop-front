<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { timeChange } from '@/master'

export default defineComponent({ 
  props: {
    job: { type: Object, require: true, defalut: {} }
  },
  setup: (props: any) => {
    const moment = (value: string, format: string) => timeChange(value, format);
    // * Twitter をタブで開く
    const twitterTab = () => {
      if(props.job.user.twitterAccount == null) {
        return props.job.user.twitterAccount;
      } else {
        const url: string = props.job.user.twitterAccount;
        return window.open(url);
      }
    };
    // * Github をタブで開く
    const gitTab = () => {
      if(props.job.user.githubAccount == null) {
        return props.job.user.githubAccount;
      } else {
        const url: string = props.job.user.githubAccount;
        return window.open(url);
      }
    };
    return {
      moment,
      twitterTab,
      gitTab
    }
  }
});
</script>

<template>
  <section>
    <v-sheet class="post-user-area">
      <div class="left-user-area">
        <div class="user-image"></div>
      </div>
      <div class="right-user-area">
        <div class="user-profile-area">
          <div class="user-name-are">
            <div class="user-name-tag">名前</div>
            <router-link :to="`/account/profile/${ job.userId }`"> 
              <div class="user-name">
                {{ job.user.userName }} 
              </div>
            </router-link>
          </div>
          <div class="user-introduce-area">
            <div class="introduce-tag">学習開始</div>
            <div class="introduce">
              {{ moment(job.user.learningStartDate, "YYYY年 M月 D日") }}
            </div>
          </div>
        </div>
        <div class="user-url-area">
          <section>
            <div class="user-github" @click="gitTab">
              <img class="img" src="@/assets/github.png" width="50" />
              </div>
            <div class="user-twtter" @click="twitterTab">
              <img class="img" src="@/assets/images/twitter.png" width="52" />
            </div>
          </section>
        </div>
      </div>
    </v-sheet>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.post-user-area {
  @include card-border-color;
  border-radius: 4px;
  padding: 2rem 4rem;
  margin-bottom: 2rem;
  position: relative;

  .left-user-area {
    width: 20%;
    height: 100%;

    .user-image {
      @include user-image;
      width: 130px;
      height: 130px;
    }
  }

  .right-user-area {
    width: 75%;
    position: absolute;
    right: 0;
    top: 0;
    padding: 1.8rem 2rem 0 2rem;
    text-align: left;

    .user-profile-area {
      width: 65%;
      height: 100%;
      display: inline-block;

      .user-name-are {
        width: 45%;
        display: inline-block;

        .user-name-tag {
          font-weight: bold;
        }

        .user-name {
          margin-top: 0.2rem;
          font-size: 16px;
        }
      }

      .user-study-area {
        width: 45%;
        display: inline-block;

        .study-tag {
          font-weight: bold;
          width: 45%;
        }

        .stydy-time {
          margin-top: 0.2rem;
        }
      }

      .user-introduce-area {
        margin-top: 2rem;

        .introduce-tag {
          font-weight: bold;
        }

        .introduce {
          margin-top: 0.2rem;
          font-size: 14px;
        }
      }
    }

    .user-url-area {
      display: inline-block;
      width: 120px;
      position: absolute;
      top: 0;
      right: 0;
      padding: 1rem 1rem 0 0;

      section {
        position: relative;

        .user-github {
          position: absolute;
          left: 0;
          top: 0;
          cursor: pointer;

          :hover {
            opacity: 0.8;
          }
        }

        .user-twtter {
          position: absolute;
          right: 0;
          top: 0;
          margin-top: 0.1rem;
          font-weight: bold;
          cursor: pointer;

          :hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .post-user-area{
    .right-user-area {
      .user-profile-area {
        width: 65%;
        height: 100%;
        display: inline-block;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .post-user-area {
    padding: 2rem;

    .right-user-area {
      .user-profile-area
      .user-introduce-area {
        margin-top: 2rem;
      }

      .user-url-area {
        padding: 2.2rem 0 0 1rem;
      }
    }
  }
}

//* スマホレスポンシブ 
@media screen and (max-width: 500px) {
  .post-user-area {
    padding: 1.5rem 1rem;

    .right-user-area{
      .user-profile-area
      .user-introduce-area {
        margin-top: 1.3rem;
      }

      .user-url-area {
        padding: 1rem 0 0 0.5rem;
      }
    }
  }
}

@media screen and (max-width: 420px) {
  .post-user-area{
    padding: 2.5rem 1rem;

    .left-user-area {
      .user-image{
        width: 100px;
        height: 100px;
      }
    }
  }
}
</style>