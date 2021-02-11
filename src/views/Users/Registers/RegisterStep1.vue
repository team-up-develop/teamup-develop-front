<script lang="ts">
import Vue from "vue";
import { RegisterSessionParams } from "@/types/params";
import Session from "@/components/Atoms/Commons/Session.vue";
import DatePicker from "@/components/Atoms/Forms/DatePicker.vue";
import InputArea from "@/components/Molecules/Forms/InputArea.vue";

type DataType = {
  userName: string;
  nickName: string;
  userBirthday: string;
  learningStartDate: string;
  dialog: boolean;
  Password: string;
};

export default Vue.extend({
  components: {
    Session,
    DatePicker,
    InputArea,
  },
  data(): DataType {
    return {
      userName: "",
      nickName: "",
      Password: "",
      userBirthday: "",
      learningStartDate: "",
      dialog: false,
    };
  },
  methods: {
    nextStep2() {
      if (
        this.userName &&
        this.nickName &&
        this.userBirthday &&
        this.learningStartDate
      ) {
        const params: RegisterSessionParams = {
          userName: this.userName,
          nickName: this.nickName,
          userBirthday: this.userBirthday,
          learningStartDate: this.learningStartDate,
        };
        console.log("入力された値は" + params + "です。");
        sessionStorage.setItem("userName", params.userName);
        sessionStorage.setItem("nickName", params.nickName);
        sessionStorage.setItem("userBirthday", params.userBirthday);
        sessionStorage.setItem("learningStartDate", params.learningStartDate);

        return this.$router.push("/step/2");
      } else {
        console.log("必須が入力されていません");
      }
    },
  },
});
</script>

<template>
  <section>
    <div class="wrapper">
      <div class="title">基本情報入力</div>
      <v-card class="pa-1">
        <div class="session">
          <Session :num="2" />
        </div>
        <v-col class="container text-left">
          <div class="input-area">
            <InputArea
              v-model="userName"
              type="text"
              name="jobTitle"
              textLabel="氏名"
              :mandatory="true"
              mandatoryText=""
              placeholder="例) チームアップ 太郎"
              maxlength="30"
              :remaining="false"
            />
          </div>
          <div class="input-area">
            <InputArea
              v-model="nickName"
              type="text"
              name="nickName"
              textLabel="ユーザー名"
              :mandatory="true"
              mandatoryText=""
              placeholder="例) Tarou"
              maxlength="30"
              :remaining="false"
            />
          </div>
          <div class="input-area">
            <label for="name" class="label">パスワード</label
            ><label for="name" class="label-required">必須</label>
            <input
              type="password"
              v-model="Password"
              placeholder="パスワード"
              maxlength="30"
            />
          </div>
          <div class="input-area">
            <label for="name" class="label">生年月日</label
            ><label for="name" class="label-required">必須</label>
            <div class="datepicker">
              <DatePicker
                v-model="userBirthday"
                placeholder="生年月日"
                type="text"
              />
            </div>
          </div>
          <div class="input-area">
            <label for="name" class="label">学習開始日</label
            ><label for="name" class="label-required">必須</label>
            <div class="datepicker">
              <DatePicker
                v-model="learningStartDate"
                placeholder="学習開始日"
                type="text"
              />
            </div>
          </div>
          <div class="btn">
            <div class="btn__next" @click="nextStep2">次へ1/3</div>
          </div>
        </v-col>
      </v-card>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.wrapper {
  width: 550px;
  height: 90%;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 95%;
  }

  .title {
    color: $primary-color;
    font-size: 1.8rem;
    font-weight: bold;
    height: 50px;
    padding: 1rem 2rem;
    margin-top: 1rem;
  }

  .session {
    height: 80px;
  }

  .container {
    padding: 0 2rem;

    @media (max-width: 500px) {
      padding: 0 1rem;
    }
  }
}

.label {
  font-weight: bold;
  margin-bottom: 1rem;
}
.label-required {
  color: $white;
  background-color: $error-message-color;
  font-size: 12px;
  font-weight: bold;
  border-radius: 25px;
  padding: 0.25rem 0.9rem;
  text-align: center;
  margin-left: 10px;
}
.input-area {
  height: 90px;
}

input[type="password"] {
  background-color: $dark-white;
  color: $text-main-color;
  font: 16px/24px sans-serif;
  box-sizing: border-box;
  width: 100%;
  padding: 0.3em;
  transition: 0.3s;
  letter-spacing: 1px;
  border-radius: 4px;
  padding: 0.5rem;
  margin-top: 0.5rem;

  &:focus {
    @include form-hover;
  }
}
.datepicker {
  width: 100%;
  height: 100px;
}

.btn {
  width: 100%;
  height: 100px;

  &__next {
    @include box-shadow-btn;
    @include blue-btn;
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

    &:hover {
      @include box-shadow-btn;
    }
  }
}
</style>
