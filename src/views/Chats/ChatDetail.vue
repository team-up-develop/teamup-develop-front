<script lang="ts">
import Vue, { PropType } from 'vue';
import axios from 'axios'
import Loading from '@/components/Organisms/Commons/Loading/Loading.vue'
import { Message, messageParams } from '@/types/chat'
import { Job } from '@/types/job';
import {
  m, 
  dayJs,
  API_URL, 
  truncate 
} from '@/master'

type DataType = {
  chatGroups: Job[]; //? 今使ってない
  chats: Message[];
  chatMessage: string;
  chatMembers: []; //? 今使ってない
  myselfUser: {}; //? 今使ってない
  postUser: null; //? 今使ってない
  userId: number;
  isActive: boolean;
  hasError: boolean;
  loading: boolean;
  jobTitle: string;
  clickJobId: number;
}

export default Vue.extend({ 
  components: {
    Loading
  },
  props: {
    // * job.idを受け取る
    id: { type: Number as PropType<number>, required: true },
    // id: { type: Number },
  },
  data(): DataType {
    return {
      chatGroups: [],
      chats: [],
      chatMessage: "",
      chatMembers: [],
      myselfUser: {},
      postUser: null,
      userId: this.$store.state.auth.userId,
      isActive: true,
      hasError: false,
      loading: true,
      jobTitle: "",
      clickJobId: 0
    }
  },
  computed: {
    m: () => m,
  },
  created() {
    let chatLength = 0;
    // * チャット詳細画面実装
    setInterval(() => {
      axios.get<Message[]>(`${API_URL}/chat_message/?job_id=${this.id}`)
      .then(response => {
        this.loading = false;
        this.chats = response.data
        if(chatLength === this.chats.length) {
          console.log("chatLengt 一緒だよん")
        } else {
          chatLength = this.chats.length
          // ? GET 際に変今点があったら下にスクロールする
          const chatLog: any = this.$refs.target
          if (!chatLog) return 
          chatLog.scrollTop = chatLog.scrollHeight
        }
      })
      .catch(error =>{
        console.log(error)
      })
      axios.get(`${API_URL}/job/${this.id}`)
      .then(response => {
        this.jobTitle = response.data.jobTitle
        this.clickJobId = response.data.id
      })
      .catch(error =>{
        console.log(error)
      })
    }, 1000)
    // ! チャットのタイトルごとに案件参加者を取得できるようにする
    // // * 案件参加者を取得
    // axios.get(`http://localhost:8888/api/v1/apply_job/?job_id=${ this.id }&apply_status_id=2`)
    // .then(response => {
    //   this.chatMembers = response.data
    // })
    // // * 投稿者を取得
    // axios.get(`http://localhost:8888/api/v1/apply_job/?job_id=${ this.id }&apply_status_id=4`)
    // .then(response => {
    //   this.myselfUser= response.data
    // })
    axios.get(`${API_URL}/apply_job/?user_id=${ this.userId }`)
    .then(response => {
      const array = [];
      for(let i = 0; i < response.data.length; i++){
        const applyData = response.data[i]
        if(applyData.applyStatusId === m.APPLY_STATUS_PARTICIPATE || applyData.applyStatusId  == m.APPLY_STATUS_SELF ){
          array.push(applyData)
          this.chatGroups = array
        }
        else {
          console.log("Not Found")
        }
      }
    })
    .catch(error =>{
      console.log(error)
    })
  },
  methods: {
    day(value: string, format: string) {
      return dayJs(value, format)
    },
    limit(value: string, num: number) {
      return truncate(value, num)
    },
    // * メッセージの送信
    chatCreate() {
      const params: messageParams = {
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
      axios.post<messageParams>(`${API_URL}/chat_message`, params)
      .then(response => {
        console.log(response.data)
        axios.get<Message[]>(`${API_URL}/chat_message/?job_id=${this.id}`)
        .then(response => {
          this.chats = response.data
          // ! Postされた内容がDOMに反映される前にスクロールされるため、最新投稿までスクロールされていない
          // ? 一番下にスクロール
          const chatLog: any = this.$refs.target
          if (!chatLog) return 
          chatLog.scrollTop = chatLog.scrollHeight
        })
        .catch(error =>{
          console.log(error)
        })
      })
      .catch(error =>{
        console.log(error)
      })
      this.chatMessage = "";
    },
  }
});
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
          <router-link :to="`/jobs/${ clickJobId }`" class="router">
            <header class="header">{{ limit(jobTitle, 60) }}</header>
          </router-link>
          <section class="room">
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
          </section>
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
  font-weight: bold;
  text-decoration: underline;
}

.router {
  text-decoration: none;
  color: $text-main-color;
}
.router:hover {
  color: $primary-color;
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
    margin: 0rem auto;
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
            padding: 0rem 0 1rem 1rem;
            position: absolute;
            bottom: 0;
            // height: 30px;
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
        height: 85%;
        display: flex;
        flex-direction: column;

        header {
          background-color: $white;
          position: -webkit-sticky;
          position: sticky;
          top: 0;
          left: 0;
          display: flex;
          font-weight: bold;
          text-align: left;
          padding: 0.4rem 2rem;
          border-bottom: $card-border-color 1px solid;
          margin-left: 0.2rem;
          border-radius: 0 20px 0 0;
          height: 60px;
        }

        .room {
          padding: 1rem 2rem;
          overflow: scroll;
        }
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
        padding: 1.5rem 0 1.5rem 1rem;

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
          @include neumorphism;
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
        
        .room {
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