<template>
  <div class="wrapper">
    <v-sheet class="chat-card" v-if="loginFlag === true">
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
            <p>{{ chatGroup.job.jobTitle | truncateDetailTitle }}</p>
            <v-row class="row">
              <label for="name">投稿案件</label>
              <section>12月12日</section>
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

<script>
import axios from 'axios'
export default {
  data() {
    return {
      chatGroups: [],
      loginFlag: false,
      userId: this.$store.state.auth.userId,
      isActive: true,
      hasError: false,
      chatMembers: [],
      myselfUser: {},
    }
  },
  filters: {
    //* 案件タイトル 詳細 文字制限
    truncateDetailTitle: function(value) {
      const length = 36;
      const ommision = "...";
      if (value.length <= length) {
        return value;
      }
      return value.substring(0, length) + ommision;
    },
  },
  mounted() {
    // * 参加案件のみを取得する
    if(this.$store.state.auth.userId !== undefined) {
      this.loginFlag = true
      axios.get(`http://localhost:8888/api/v1/apply_job/?user_id=${ this.userId }`)
      .then(response => {
        const array = [];
        for(let i = 0; i < response.data.length; i++){
          const applyData = response.data[i]
          if(applyData.applyStatusId === 2 || applyData.applyStatusId === 4 ){
            array.push(applyData)
            this.chatGroups = array
          }
          else {
            console.log("Not Found")
          }
        }
      })
    }
  },
}
</script>

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
    background-color: $basic-white;
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
      background-color: sandybrown;
      height: 100%;
      box-shadow: 5px 0 3px #00000011;
      border-radius: 8px 0 0px 8px;
      font-size: 14px;
      background-color: $basic-white;
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
            width: 100%;

            label {
              @include box-shadow-btn;
              @include blue-btn;
              color: $basic-white;
              padding: 0.25rem 1.5rem;
              width: 102px;
              font-weight: bold;
              font-size: 0.8em;
              border-radius: 8px;
              appearance: none;
              border: none;
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
        background-color: $basic-white;
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
            @include box-shadow-btn;
            @include blue-btn;
            color: $basic-white;
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