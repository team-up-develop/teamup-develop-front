<script lang="ts">
import Vue from "vue";
import { API_URL, catchError } from "@/master";
import { EditProfileParams } from "@/types/params";
import axios from "axios";

type DataType = {
  id: number;
  userName: string;
  learningStartDate: string;
  bio: string | null;
  githubAccount: string | null;
  twitterAccount: string | null;
};

export default Vue.extend({
  props: {
    userInfo: Object,
  },
  data(): DataType {
    return {
      id: this.userInfo.id,
      userName: this.userInfo.user_name,
      learningStartDate: this.userInfo.learning_start_date.substring(
        0,
        this.userInfo.learning_start_date.indexOf("T")
      ),
      bio: this.userInfo.bio,
      githubAccount: this.userInfo.github_account,
      twitterAccount: this.userInfo.twitter_account,
    };
  },
  created() {
    console.log(this.userInfo);
  },
  methods: {
    // * 編集する
    profileEdit() {
      // * date型に変換のための data用意
      function toDate(str: any, delim: string) {
        const arr = str.split(delim);
        return new Date(arr[0], arr[1] - 1, arr[2]);
      }
      // //* 開始日
      const learningStart = this.learningStartDate;
      const learningStartDate = toDate(learningStart, "-");
      const params: EditProfileParams = {
        id: this.id,
        updated_at: this.userInfo.updated_at,
        user_name: this.userName,
        birthday: this.userInfo.birthday,
        bio: this.bio,
        github_account: this.githubAccount,
        twitter_account: this.twitterAccount,
        learning_start_date: learningStartDate,
        login_name: this.userInfo.login_name,
        login_password: "password",
        programing_language_ids: [
          {
            id: 1,
          },
        ],
        programing_framework_ids: [
          {
            id: 1,
          },
        ],
        skill_ids: [
          {
            id: 1,
          },
        ],
      };
      console.log(params);
      const a = JSON.stringify(params);
      console.log(a);
      axios
        .put<EditProfileParams>(`${API_URL}/user/${this.id}`, params)
        .then((res) => {
          this.$emit("compliteEdit");
          return res;
        })
        .catch((error) => {
          catchError(error);
        });
    },
  },
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
            <input
              type="text"
              v-model="userName"
              class="edit-value"
              placeholder="ユーザー名"
            />
            <br />
            <label for="name" class="label">学習開発開始時期</label>
            <input
              type="date"
              v-model="learningStartDate"
              class="edit-value"
              placeholder="学習を始めた日にちを入力してください"
            />
            <br />
            <label for="name" class="label">自己紹介</label>
            <textarea
              type="text"
              v-model="bio"
              class="edit-text-value"
              placeholder="自己紹介(250文字以内)"
              maxlength="250"
            />
            <br />
            <label for="name" class="label">GitHub</label>
            <input
              type="url"
              v-model="githubAccount"
              class="edit-value"
              placeholder="GitHubアカウント"
            />
            <br />
            <label for="name" class="label">Twitter</label>
            <input
              type="url"
              v-model="twitterAccount"
              class="edit-value"
              placeholder="Twitterアカウント"
            />
            <br />
            <template>
              <div class="btn" @click="profileEdit">
                編集する
              </div>
            </template>
          </section>
          <slot />
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
@import "@/assets/scss/_variables.scss";

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
}

.modal-window {
  background: $white;
  border-radius: 8px;
  overflow: hidden;
}

.modal-content {
  padding: 2rem 2rem;
  min-width: 660px;
  height: 74vh;
  text-align: left;
  overflow: scroll;

  @media screen and (max-width: $me) {
    min-width: 80vw;
  }
  @media screen and (max-width: $sm) {
    width: 50vh;
  }
  @media screen and (max-width: $ti) {
    padding: 2rem 1rem;
    width: 43vh;
  }

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
    .btn {
      @include box-shadow-btn;
      background-color: $secondary-color;
      color: $white;
      text-align: left;
      display: block;
      padding: 1.1rem 4rem;
      border-radius: 25px;
      border: none;
      font-size: 0.875rem;
      font-weight: 600;
      line-height: 1;
      text-align: center;
      max-width: 280px;
      margin: auto;
      font-size: 1rem;
      float: right;
      margin-top: 1.5rem;
      cursor: pointer;
      transition: 0.3s;
      outline: none;
    }
  }
}

.modal-footer {
  width: 100%;
  padding: 2rem 0 1rem 0;
  text-align: right;
  display: inline-block;
  position: relative;
  font-size: 100px;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s;
}

.modal-enter-active,
.modal-window {
  transition: opacity 0.4s, transform 0.4s;
}

.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.modal-enter,
.modal-window {
  transform: translateY(-20px);
}
</style>
