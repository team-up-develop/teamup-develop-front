<script>
import axios from 'axios'
import Loading from '@/components/Organisms/Commons/Loading/Loading.vue'
export default {
  components: {
    Loading
  },
  props: {
    // * job.idを受け取る
    id: Number,
    // id: { type: Number },
  },
  data() {
    return {
      chatGroups: [],
      chats: null,
      chatMessage: "",
      chatMembers: [],
      myselfUser: {},
      postUser: null,
      userId: this.$store.state.auth.userId,
      f: null,
      isActive: true,
      hasError: false,
      loading: true
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
  created() {
    let chatLength = 0;
    // * チャット詳細画面実装
    setInterval(() => {
      axios.get(`http://localhost:8888/api/v1/chat_message/?job_id=${this.id}`)
      .then(response => {
        this.loading = false;
        this.chats = response.data
        if(chatLength === this.chats.length) {
          console.log("chatLengt 一緒だよん")
        }
        else {
          chatLength = this.chats.length
          // ? GET 際に変今点があったら下にスクロールする
          const chatLog = this.$refs.target
          if (!chatLog) return 
          chatLog.scrollTop = chatLog.scrollHeight
        }
      })
    }, 1000)
    // ! チャットのタイトルごとに案件参加者を取得できるようにする
    // * 案件参加者を取得
    axios.get(`http://localhost:8888/api/v1/apply_job/?job_id=${ this.id }&apply_status_id=2`)
    .then(response => {
      this.chatMembers = response.data
    })
    // * 投稿者を取得
    axios.get(`http://localhost:8888/api/v1/apply_job/?job_id=${ this.id }&apply_status_id=4`)
    .then(response => {
      this.myselfUser= response.data
    })
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
  },
  methods: {
    // * メッセージの送信
    chatCreate() {
      const params = {
          message: this.chatMessage,
          userID: this.userId,
          jobID: this.id
      }
      // ? 空のメッセージは送信させない
      if(params.message == "") {
        console.log("空のメッセージは送信させない")
        return
      }
      // ? 投稿
      axios.post(`http://localhost:8888/api/v1/chat_message`, params)
      .then(response => {
        console.log(response.data)
        axios.get(`http://localhost:8888/api/v1/chat_message/?job_id=${this.id}`)
        .then(response => {
          this.chats = response.data
          // ! Postされた内容がDOMに反映される前にスクロールされるため、最新投稿までスクロールされていない
          // ? 一番下にスクロール
          const chatLog = this.$refs.target
          if (!chatLog) return 
          chatLog.scrollTop = chatLog.scrollHeight
        })
      })
      this.chatMessage = "";
    },
  }
}
</script>

<template>
  <div class="wrapper">
    <v-sheet class="chat-card">
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
            <!-- <div v-for="myselfUser in myselfUser" :key="myselfUser.id" class="chat-member-name">
            <div v-for="chatMembar in chatMembers" :key="chatMembar.id" class="chat-member-name">
              <p>{{ myselfUser.user.userName }}  {{ chatMembar.user.userName }}</p>
            </div>
            </div> -->
          </div>
        </v-card>
      </div>
      <div class="chat-card__right">
        <div class="main" ref="target" v-show="!loading">
          <div class="balloon" v-for="chat in chats" :key="chat.id">
            <div class="balloon-image-left">
              <div class="balloon-img"></div>
            </div>
            <div class="user-name">
              {{ chat.user.userName }}
            </div>
            <div class="balloon-text-right">
              <p>{{ chat.message }}</p>
            </div>
          </div>
        </div>
      <Loading v-show="loading">
      </Loading>
        <div class="bottom">
          <v-row>
            <textarea type="text" class="chat-form" v-model="chatMessage" name="" maxlength="250" placeholder="メッセージを入力してください"></textarea>
            <span @click="chatCreate">
              <button class="send">送信する</button>
            </span>
          </v-row>
        </div>
      </div>
    </v-sheet>
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
        background-color:$light-grey;
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
          background-color: #ffffff;
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

// * ここからトーク周り
.balloon {
  margin-bottom: 2em;
  position: relative;
}
.balloon:before,.balloon:after {
  clear: both;
  content: "";
  display: block;
}
.balloon-image-left,.balloon-image-right {
  width: 68px;
  height: 68px;
}
.balloon-image-left {
  float: left;
  // margin-right: 20px;
}
.user-name {
  padding: 0.2rem 1rem;
  text-align: left;
  color: $text-sub-color;
  font-size: 12px;
}
.balloon-image-right {
  float: right;
}
.balloon-img {
  @include user-image;
  width: 70%;
  height: 70%;
  border-radius: 50%;
  margin: 0;
  background-color: #ffffff;
}
.balloon-image-description {
  padding: 5px 0 0;
  font-size: 10px;
  text-align: center;
  background-color: $light-grey;
}
.balloon-text-right,.balloon-text-left {
  position: relative;
  padding: 0.8rem 1.4rem;
  // border: 1px solid #aaa;
  border-radius: 10px;
  max-width: -webkit-calc(100% - 120px);
  max-width: calc(100% - 120px);
  display: inline-block;
  background-color: $light-grey;
  text-align: left;
}
.balloon-text-right {
  float: left;
}
.balloon p {
  margin: 0 0 20px;
}
.balloon p:last-child {
  margin-bottom: 0;
}
/* 三角部分 */
.balloon-text-right:before {
  position: absolute;
  content: '';
  // border: 10px solid transparent;
  border-right: 10px solid #aaa;
  top: 15px;
  left: -20px;
}
.balloon-text-right:after {
  position: absolute;
  content: '';
  border: 10px solid transparent;
  border-right: 10px solid$light-grey;
  top: 15px;
  left: -19px;
}
.balloon-text-left:before {
  position: absolute;
  content: '';
  background-color: $light-grey;
  border: 10px solid transparent;
  border-left: 10px solid #aaa;
  top: 15px;
  right: -20px;
}
.balloon-text-left:after {
  position: absolute;
  content: '';
  border: 10px solid transparent;
  border-left: 10px solid #f2f2f2;
  top: 15px;
  right: -19px;
  background-color: #ffffff;
}
// * ここまでトーク周り

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
        display: none;

      }
      &__right {
        width: 100%;
        
        .main {
          padding: 1rem 0.5rem 1rem 1rem;
        }

        .bottom 
        .chat-form {
          width: 70%;
        }
      }
    }
  }
}

@media (max-width: 500px) {
  .wrapper .chat-card__right .bottom { 
    padding: 1rem 0 1rem 0.1rem;
    .chat-form{
      width: 65%;
    }
  }
}

@media (max-width: 380px) {
  .wrapper .chat-card__right .bottom .chat-form{
    width: 60%;
  }
}
</style>