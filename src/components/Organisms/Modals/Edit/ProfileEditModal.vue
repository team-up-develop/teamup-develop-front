<script lang="ts">
import Vue from 'vue';
import { API_URL } from '@/master'
import axios from 'axios';

type DataType = {
  id: number;
  userName: string;
  learningStartDate: string;
  bio: string | null;
  githubAccount: string | null;
  twitterAccount: string | null;
}

type EditParams = {
  userName: string;
  learningStartDate: Date;
  bio: string | null;
  githubAccount: string | null;
  twitterAccount: string | null;
}

export default Vue.extend({
  props: {
    userInfo: Object
  },
  data(): DataType {
    return {
      id: this.userInfo.id,
      userName: this.userInfo.userName,
      learningStartDate: this.userInfo.learningStartDate.substring(0,this.userInfo.learningStartDate.indexOf("T")),
      bio: this.userInfo.bio,
      githubAccount: this.userInfo.githubAccount,
      twitterAccount: this.userInfo.twitterAccount,
    }
  },
  methods: {
    // * 編集する
    profileEdit() {
      // * date型に変換のための data用意
      function toDate (str: any, delim: string) {
        const arr = str.split(delim)
        return new Date(arr[0], arr[1] - 1, arr[2]);
      }
      // //* 開始日
      const learningStart = this.learningStartDate
      const learningStartDate = toDate(learningStart, '-');

      const params: EditParams = {
        userName: this.userName,
        learningStartDate: learningStartDate,
        bio: this.bio,
        githubAccount: this.githubAccount,
        twitterAccount: this.twitterAccount,
      }
      axios.put<EditParams>(`${API_URL}/user/${this.id}`, params)
      .then(response => {
        this.$emit('compliteEdit')
      })
      .catch(error => {
        console.log(error)
      })
    },
  }
});
</script>


<template>
  <transition name="modal" appear>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <div class="modal-content">
          <section>
            <p class="label-lang">プロフィール編集</p>
            <label for="name" class="label">名前</label>
            <input type="text" v-model="userName" class="edit-value" placeholder="ユーザー名">
            <br>
            <label for="name" class="label">学習開発開始時期</label>
            <input type="date" v-model="learningStartDate" class="edit-value" placeholder="学習を始めた日にちを入力してください">
            <br>
            <label for="name" class="label">自己紹介</label>
            <textarea type="text" v-model="bio" class="edit-text-value" placeholder="自己紹介(250文字以内)" maxlength="250" />
            <br>
            <label for="name" class="label">GitHub</label>
            <input type="url" v-model="githubAccount" class="edit-value" placeholder="GitHubアカウント">
            <br>
            <label for="name" class="label">Twitter</label>
            <input type="url" v-model="twitterAccount" class="edit-value" placeholder="Twitterアカウント">
            <br>
            <template>
              <div class="serach-btn" @click="profileEdit">
                編集する
              </div>
            </template>
          </section>
          <slot/>
        </div>
        <footer class="modal-footer">
          <!-- <slot name="footer">
            <button @click="$emit('close')">Close</button>
          </slot> -->
        </footer>
      </div>
    </div>
  </transition>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 3000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $modal-background;

  /* font-weight: bold; */
}

.modal-window {
  background: $white;
  border-radius: 8px;
  overflow: hidden;
}

.modal-content {
  padding: 2rem 2rem;
  width: 40vw;
  height: 64vh;
  text-align: left;
  overflow: scroll;

  // * モーダル
  section {
    .label-lang {
      font-weight: bold;
    }
    .label {
      display: block;
      font-weight: bold;
    }
    .edit-value {
      display: block;
      width: 100%;
      height: 48px;
      padding: 0.5rem;
      background-color: $dark-white;
    }
    .edit-text-value {
      display: block;
      width: 100%;
      height: 120px;
      padding: 0.5rem;
      background-color: $dark-white;
    }
    .serach-btn {
      @include box-shadow-btn;
      background-color: $secondary-color;
      color: $white;
      text-align: left;
      display: block;
      padding: 1.1rem 4rem;
      border-radius: 25px;
      border: none;
      font-size: .875rem;
      font-weight: 600;
      line-height: 1;
      text-align: center;
      max-width: 280px;
      margin: auto;
      font-size: 1rem;
      float: right;
      margin-top: 1.5rem;
      cursor: pointer;
      transition: .3s;
      outline: none;
    }
  }
}

//* 編集するボタン 
.btn-box-edit {
  @include box-shadow-btn;
  background-color: $secondary-color;
  color: $white;
  padding: 1.2rem 8rem;
  transition: .3s;
  border-radius: 50px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  margin: auto;
  font-size: 1.3rem;
  display: inline-block;
  cursor: pointer;
  border: none;

  &:hover {
    @include btn-hover;
  }
}

.modal-footer {
  /* background: #ccc; */
  width: 100%;
  padding: 2rem 0 1rem 0;
  text-align: right;
  display: inline-block;
  position: relative;
  font-size: 100px;
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.4s;
}

.modal-enter-active, .modal-window {
  transition: opacity 0.4s, transform 0.4s;
}

.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter, .modal-leave-to {
  opacity: 0;
}

.modal-enter, .modal-window {
  transform: translateY(-20px);
}
</style>