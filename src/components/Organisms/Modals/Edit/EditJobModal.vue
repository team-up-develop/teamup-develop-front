// TODO: 現在は使用していない
<script lang="ts">
import Vue from "vue";
import { $fetch, $put, API_URL, catchError } from "@/master";
import vSelect from "vue-select";
// import 'vue-select/dist/vue-select.css';
import { Language } from "@/types/index";
import { FetchLanguages } from "@/types/fetch";

type DataType = {
  jobId: number;
  jobTitle: string;
  devStartDate: string;
  devEndDate: string;
  jobDescription: string;
  selectedLang: any;
  selectlangNumber: any;
  languages: Language[];
};

export default Vue.extend({
  components: {
    vSelect,
  },
  props: {
    job: Object,
  },
  data(): DataType {
    return {
      jobId: this.job.id,
      jobTitle: this.job.jobTitle,
      devStartDate: this.job.devStartDate.substring(
        0,
        this.job.devStartDate.indexOf("T")
      ),
      devEndDate: this.job.devEndDate.substring(
        0,
        this.job.devEndDate.indexOf("T")
      ),
      jobDescription: this.job.jobDescription,
      selectedLang: [], //? プログラミング言語
      selectlangNumber: [], //? 開発言語 編集用 array[Number, Number...]
      languages: [], //? プログラミング言語全て
    };
  },
  created() {
    // * 開発言語
    $fetch<FetchLanguages>(`${API_URL}/programing_language`).then((res) => {
      this.languages = res.data.response;
    });
    this.selectedLang = this.job.programingLanguage;
    for (let l = 0; l < this.selectedLang.length; l++) {
      this.selectlangNumber.push(this.selectedLang[l].id); //? 開発言語 配列 [Number, Number...]
    }
  },
  methods: {
    jobEdit() {
      // * date型に変換のための data用意
      function toDate(str: any, delim: string) {
        const arr = str.split(delim);
        return new Date(arr[0], arr[1] - 1, arr[2]);
      }
      // //* 開始日
      const devStart = this.devStartDate;
      const devStartDate = toDate(devStart, "-");
      // *終了日
      const devEnd = this.devEndDate;
      const devEndDate = toDate(devEnd, "-");
      // * 言語を {id: Number}に変換
      const languageArray = [];
      for (let i = 0; i < this.selectlangNumber.length; i++) {
        const langages = this.selectlangNumber[i];
        languageArray.push({ id: langages });
      }

      const params = {
        jobTitle: this.jobTitle,
        devStartDate,
        devEndDate,
        jobDescription: this.jobDescription,
        programingLanguage: languageArray,
      };
      $put(`${API_URL}/job/${this.jobId}`, params)
        .then((res) => {
          catchError(res);
          // this.$emit('compliteAssgin', this.message)
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
          <slot />
          <div class="job-create-title-area">
            <label for="name" class="label">案件タイトル</label
            ><label for="name" class="label-required">必須</label>
            <input type="text" v-model="jobTitle" />
          </div>
          <div class="job-create-time-area">
            <label for="name" class="label">開発開始</label
            ><label for="name" class="label-required">必須</label>
            <input type="date" v-model="devStartDate" />
            <h5>{{ devStartDate }}</h5>
          </div>
          <div class="job-create-time-area">
            <label for="name" class="label">開発終了</label
            ><label for="name" class="label-required">必須</label>
            <input type="date" v-model="devEndDate" />
          </div>
          <div class="job-create-detail-area">
            <label for="name" class="label">開発詳細</label>
            <textarea type="text" v-model="jobDescription"></textarea>
          </div>
          <div class="job-create-area">
            <label for="name" class="label">開発言語</label
            ><label for="name" class="label-required">必須</label>
            <!-- <label v-if="selectedLangErrors.length" class="error-label">
              <p v-for="selectedLangError in selectedLangErrors" :key="selectedLangError" class="error-message">
                {{ selectedLangError }}</p>
            </label> -->
            <v-select
              class="input-area"
              multiple
              :options="languages"
              label="programingLanguageName"
              v-model="selectlangNumber"
              :reduce="(languages) => languages.id"
            />
            <h3>{{ selectedLang }}</h3>
            <h1>Selected 言語:{{ selectlangNumber }}</h1>
          </div>
        </div>
        <footer class="modal-footer">
          <div class="modal-edit-btn" @click="jobEdit">
            編集する
          </div>
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
  /* font-weight: bold; */
}

.modal-window {
  background: $white;
  width: 70%;
  height: 90%;
  border-radius: 8px;
  overflow: hidden;
  overflow: scroll;

  @media screen and (max-width: $me) {
    width: 85%;
  }
  @media screen and (max-width: $sm) {
    width: 92%;
  }
}

// * モーダル
.label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0.7rem;
  display: inline-block;
}
// *必須タグ
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

.modal-content {
  padding: 2rem 2rem;
  text-align: left;
  overflow: scroll;

  .job-create-title-area {
    width: 100%;
    height: 100px;
    text-align: left;

    input[type="text"] {
      @include input-border-color;
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

      &:focus {
        @include form-hover;
      }
    }
  }

  .job-create-time-area {
    width: 100%;
    height: 100px;
    text-align: left;

    input[type="date"] {
      @include input-border-color;
      background-color: $dark-white;
      color: $text-main-color;
      font: 16px/24px sans-serif;
      box-sizing: border-box;
      width: 40%;
      display: flex;
      padding: 0.3em;
      transition: 0.3s;
      letter-spacing: 1px;
      border-radius: 4px;
      padding: 0.5rem;

      &:focus {
        @include form-hover;
      }
    }
  }

  .job-create-detail-area {
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    text-align: left;

    textarea[type="text"] {
      @include input-border-color;
      background-color: $dark-white;
      color: $text-main-color;
      font: 16px/24px sans-serif;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 0.3em;
      transition: 0.3s;
      letter-spacing: 1px;
      border-radius: 4px;
      padding: 0.5rem;

      &:focus {
        @include form-hover;
      }
    }
  }

  // * 言語 フレームワーク その他スキル
  .job-create-area {
    width: 100%;
    text-align: left;

    .input-area {
      margin: 0.7rem 0rem;
      font: 16px/24px sans-serif;
      box-sizing: border-box;
      width: 100%;
      transition: 0.3s;
      letter-spacing: 1px;
      color: $text-main-color;
      border-radius: 4px;
      background-color: $white;
      background-color: $dark-white;
    }

    .radio-btn {
      margin: 0.7rem 0rem;
      margin-left: 0.5rem;
    }
  }
}

// * モーダル内 編集するボタン
.modal-edit-btn {
  background-color: $secondary-color;
  display: block;
  padding: 1.4rem 5rem;
  box-shadow: 0 0px 5px 2px #d4d4d4;
  border-radius: 50px;
  font-weight: 600;
  color: $white;
  line-height: 1;
  text-align: center;
  max-width: 800px;
  font-size: 1.1rem;
  display: inline-block;
  cursor: pointer;
  border: none;
  margin-bottom: 2rem;
  outline: none;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 1rem;
}

.modal-footer {
  position: relative;
  height: 10%;
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
