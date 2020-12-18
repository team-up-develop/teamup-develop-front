<script lang="ts">
import Vue from 'vue';
import moment from "moment";

export default Vue.extend({ 
  props: {
    user: Object,
    myselfFlag: Boolean
  },
  computed: {
    enabledBtn() {
      if(this.myselfFlag == true) {
        return true;
      }
      return false;
    }
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
    editEmit() {
      this.$emit('editEmit')
    }
  }
});
</script>

<template>
  <section>
    <v-sheet class="post">
      <v-row>
        <div class="left">
          <div class="user-image"></div>
        </div>
        <div class="right">
          <div class="profile-area">
            <v-col class="name-are">
              <div class="user-name">
                {{ user.userName }}
              </div>
            </v-col>
            <v-col class="introduce-area" style="padding: none">
              <div class="introduce">
                {{ user.learningStartDate | moment("YYYY年 M月 D日")}}
              </div>
            </v-col>
            <v-col class="url-area">
              <v-row>
                <img class="img" @click="gitTab" src="@/assets/github.png" width="35" />
                <img class="img" @click="twitterTab" src="@/assets/images/twitter.png" width="35" />
              </v-row>
            </v-col>
          </div>
        </div>
      </v-row>
      <div class="btn-area">
        <button class="edit-btn" @click="editEmit" v-if="enabledBtn">編集する</button>
      </div>
    </v-sheet>

  </section>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.post {
  border-radius: 4px;
  padding: 2rem 4rem;
  margin-bottom: 2rem;
  position: relative;

  .left {
    .user-image {
      @include user-image;
      width: 150px;
      height: 150px;
    }
  }

  .right {
    width: 50%;
    text-align: left;

    .profile-area {
      width: 80%;
      padding: 0.5rem 0 0 1rem ;

      .name-are
      .user-name {
        font-size: 18px;
        font-weight: bold;
      }

      .introduce-area 
      .introduce {
        font-size: 12px;
      }
    }

    .url-area {
      padding: 0rem 0rem 0 1rem;
      .img {
        padding: 0 0 0 0.5rem;
      }
    }
  }
  .btn-area {
    position: absolute;
    top: 0;
    right: 0;

    .edit-btn {
      @include box-shadow-btn;
      @include purple-btn;
      color: $basic-white;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      width: 160px;
      height: 50px;
      font-weight: bold;
      font-size: 1em;
      appearance: none;
      border: none;
      transition: .3s;
      outline: none;
    }
  }
}

@media screen and (max-width: 650px) {
  .post {
    padding: 2rem 2rem;

    .left {
      .user-image {
        @include user-image;
        width: 150px;
        height: 150px;
      }
    }

    .right {
      width: 65%;

      .profile-area {
        width: 100%;
        padding: 0.5rem 0 0 0rem ;
      }
    }

    .btn-area {
      .edit-btn {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .post {
    padding: 1rem 1rem;

    .right {
      width: 60%;
    }
  }
}


@media screen and (max-width: 420px) {
  .post {
    .left {
      width: 100%;

      .user-image {
        margin: 0 auto;
      }
    }

    .right {
      width: 100%;
      text-align: center;
    }
  }
}

</style>