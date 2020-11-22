<script lang="ts">
import Vue from 'vue';
import moment from "moment";

export default Vue.extend({ 
  props: {
    user: Object
  },
  filters: {
    // * date型を文字に変換
    moment(value: string, format: string) {
      return moment(value).format(format);
    },
  },
  methods: {
    // * Twitter をタブで開く
    twitterTab() {
      if(this.user.twitterAccount == null) {
        return this.user.twitterAccount;
      } else {
        const url: string = this.user.twitterAccount;
        return window.open(url);
      }
    },
    // * Github をタブで開く
    gitTab() {
      if(this.user.githubAccount == null) {
        return this.user.githubAccount;
      } else {
        const url: string = this.user.githubAccount;
        return window.open(url);
      }
    },
  }
});
</script>

<template>
  <section>
    <v-card class="post-user-area">
      <div class="left-user-area">
        <div class="user-image"></div>
      </div>
      <div class="right-user-area">
        <div class="user-profile-area">
          <div class="user-name-are">
            <div class="user-name-tag">名前</div>
            <router-link :to="`/`"> 
              <div class="user-name">
                {{ user.userName }}
              </div>
            </router-link>
          </div>
          <div class="user-introduce-area">
            <div class="introduce-tag">学習開始</div>
            <div class="introduce">
              {{ user.learningStartDate | moment("YYYY年 M月 D日")}}
            </div>
          </div>
        </div>
        <div class="user-url-area">
          <section>
            <div class="user-github">
              <img class="img" @click="gitTab" src="@/assets/github.png" width="50" />
              </div>
            <div class="user-twtter">
              <img class="img" @click="twitterTab" src="@/assets/images/twitter.png" width="52" />
            </div>
          </section>
        </div>
      </div>
    </v-card>
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
      height: 80%;
      width: 70%;
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
  .post-user-area
  .left-user-area {
      width: 20%;
      height: 100%;

    .user-image {
      @include user-image;
      width: 130px;
      height: 130px;
    }
  }
}

@media screen and (max-width: 900px) {
  .post-user-area {
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
      width: 70%;
      // background-color: yellow;
    }
  }
}

@media screen and (max-width: 768px) {
  .post-user-area
  .right-user-area {
    width: 65%;
  }
}

@media screen and (max-width: 500px) {
  .post-user-area {
    padding: 1.5rem 1rem;

    .left-user-area {
      .user-image{
        width: 100px;
        height: 100px;
      }
    }

    .right-user-area {
      width: 75%;
      padding: 0.5rem 0rem 0 2rem;
    }
  }
}

@media screen and (max-width: 420px) {
  .post-user-area{
    padding: 2.5rem 1rem;

    .left-user-area
    .user-image{
      width: 80px;
      height: 80px;
    }

    .right-user-area
    .user-url-area {
      padding: 1rem 0 0 0.5rem;
    }
  }
}

</style>