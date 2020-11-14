<template>
  <div class="chat-wrapper">
    <div class="chat-wrapper-card">
      <div class="card-left">
        <v-card  
          elevation="2" 
          :to="`/chat/${ chatGroup.job.id }`" 
          v-for="chatGroup in chatGroups" 
          :key="chatGroup.job.id" 
          v-bind:class="{ active: isActive, 'text-danger': hasError }"
          >
          <div class="chat-group-area">
            <p>{{ chatGroup.job.jobTitle | truncateDetailTitle }}</p>
            <div v-for="myselfUser in myselfUser" :key="myselfUser.id" class="chat-member-name">
            <div v-for="chatMembar in chatMembers" :key="chatMembar.id" class="chat-member-name">
              <p>{{ myselfUser.user.userName }}  {{ chatMembar.user.userName }}</p>
            </div>
            </div>
          </div>
        </v-card>
      </div>
      <div class="card-right">
        <div class="card-right-main" ref="target" v-show="!loading">
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
        <div class="card-right-bottom">
          <textarea type="text" class="chat-form" v-model="chatMessage" name="" maxlength="250" placeholder="メッセージを入力してください"></textarea>
          <div class="send-btn-area">
            <span @click="chatCreate">
              <font-awesome-icon icon="paper-plane" class="icon"/>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Loading from '@/components/common/loading/Loading.vue'
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
        this.chats = response.data
        console.log(this.chats)
        if(chatLength === this.chats.length) {
          console.log("chatLengt 一緒だよん")
        }
        else {
          console.log("chatLengt 違うよん")
        }
        // ! Getしたデータに変更点があったら下までスクロールするような作りにする
        // ! 初期Getしたら下までスクロールするようにする
      })
      console.log("setInterval")
    }, 1000)
    setTimeout(() => {
      this.loading = false;
      chatLength = this.chats.length
        // ? 一番下にスクロール
        const chatLog = this.$refs.target
        if (!chatLog) return 
        chatLog.scrollTop = chatLog.scrollHeight
    }, 1500);
    // ! チャットのタイトルごとに案件参加者を取得できるようにする
    // * 案件参加者を取得
    axios.get(`http://localhost:8888/api/v1/apply_job/?job_id=${ this.id }&apply_status_id=2`)
    .then(response => {
      // console.log(response.data)
      this.chatMembers = response.data
    })
    // * 投稿者を取得
    axios.get(`http://localhost:8888/api/v1/apply_job/?job_id=${ this.id }&apply_status_id=4`)
    .then(response => {
      // console.log(response.data)
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
.chat-wrapper{
  width: 85%;
  height: 90vh;
  margin: 0 auto;
  position: relative;

  .chat-wrapper-card {
      @include card-border-color;
      background-color: $basic-white;
      width: 100%;
      border-radius: 20px;
      margin: 2rem 0rem;
      padding: 0 0rem;
      position: absolute;
      right: 0;
      height: 93%;
      background-color: $sub-white;
      position: relative;

    .card-left {
      width: 24%;
      height: 100%;
      box-shadow: 5px 0 3px #00000011;
      border-radius: 20px 0 0px 20px;
      font-size: 14px;
      background-color: $basic-white;
      overflow: scroll;
      z-index: 10;

      .router {
        cursor: pointer;
        text-decoration: none;
      }

      .chat-group-area {
        width: 90%;
        margin: 0 auto;
        height: 102px;
        padding: 1rem 0;
        margin-top: 0.2rem;

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

    .card-right {
      width: 76%;
      height: 100%;
      // background-color: rgba(255, 255, 0, 0.367);
      position: absolute;
      top: 0;
      right: 0;
      border-radius: 0 20px 20px 0;

      .card-right-main {
        width: calc(100% - 1rem);
        margin-top: 0.5rem;
        height: 85%;
        padding: 1rem 2rem;
        overflow: scroll;
        display: flex;
        flex-direction: column;
        // align-items: center;
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
            width: 30%;
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
            background-color: #ffffff;
          }
          .balloon-text-right,.balloon-text-left {
            position: relative;
            padding: 0.8rem 1.4rem;
            // border: 1px solid #aaa;
            border-radius: 10px;
            max-width: -webkit-calc(100% - 120px);
            max-width: calc(100% - 120px);
            display: inline-block;
            background-color: #ffffff;
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
            border-right: 10px solid #ffffff;
            top: 15px;
            left: -19px;
          }
          .balloon-text-left:before {
            position: absolute;
            content: '';
            background-color: #ffffff;
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
      }

      .card-right-bottom {
        background-color: #ffffff;
        z-index: 10;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        border-radius: 0 0px 20px 0;
        box-shadow: 0 -3px 2px #00000020;
        padding: 1rem 0 1rem 1rem;

        .chat-form {
          width: 89%;
          border-radius: 8px;
          height: 80%;
          padding: 0.5rem;
          background-color: #DDDDDD;
          border: none;
          float: left;
          resize: none;
          outline: none;
        }

        .send-btn-area {
          font-size: 2rem;
          margin-top: 0.6rem;
          color: $primary-color;
          cursor: pointer;
        }
      }
    }
  }
}

</style>