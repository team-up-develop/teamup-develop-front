<script lang="ts">
// FIXME: 現状は使用していない
import Vue from "vue";
import axios from "axios";
import { API_URL } from "@/master";
import { truncate } from "@/hooks/useUtils";
import { dayJsFormat } from "@/libs/dayjs";

export default Vue.extend({
  data() {
    return {
      newJobsDesktop: [], //? デスクトップサイズ 案件4つ
      newJobs: [], //? 通常 案件3つ
    };
  },
  created() {
    axios.get(`${API_URL}/job`).then((res) => {
      this.newJobsDesktop = res.data.slice(0, 4);
      this.newJobs = res.data.slice().reverse(); //? 最新にする
      this.newJobs = this.newJobs.slice(0, 3);
    });
  },
  methods: {
    day(value: string, format: string) {
      return dayJsFormat(value, format);
    },
    limit(value: string, num: number) {
      return truncate(value, num);
    },
  },
});
</script>

<template>
  <section>
    <!-- 案件カード デスクトップ -->
    <router-link
      :to="`/jobs/${newJob.id}/detail`"
      class="job-card-desktop"
      v-for="newJob in newJobsDesktop"
      :key="newJob.id"
    >
      <div class="job-card-desktop__top">
        <span>{{ limit(newJob.jobTitle, 40) }}</span>
      </div>
      <div class="job-card-desktop__center">
        <div
          class="langage"
          v-for="(langage, index) in newJob.programingLanguage.slice(0, 2)"
          :key="`langageDesktop-${index}`"
        >
          {{ langage.programingLanguageName }}
        </div>
        <div
          class="framework"
          v-for="(framework, index) in newJob.programingFramework.slice(0, 2)"
          :key="`frameworkDesktop-${index}`"
        >
          {{ framework.programingFrameworkName }}
        </div>
        <div
          class="skill"
          v-for="(skill, index) in newJob.skill.slice(0, 2)"
          :key="`skillDesktop-${index}`"
        >
          {{ skill.skillName }}
        </div>
      </div>
      <div class="job-card-desktop__bottom">
        <div class="product-start-end">
          <div class="product-start-end-tag">
            開発期間:
          </div>
          <div class="product-start-end-time">
            {{ day(newJob.devStartDate, "YYYY年 M月 D日") }} ~
            {{ day(newJob.devEndDate, "YYYY年 M月 D日") }}
          </div>
        </div>
        <div class="post-user-area">
          <div class="post-user-image" />
          <div class="post-user-name-area">
            <div class="post-user-name">
              {{ newJob.user.userName }}
            </div>
          </div>
        </div>
      </div>
    </router-link>
    <v-row :align="align" no-gutters>
      <!-- 通常時案件カード -->
      <v-card
        :to="`/jobs/${newJob.id}/detail`"
        class="job-card"
        v-for="newJob in newJobs"
        :key="newJob.id"
      >
        <div class="job-card__top">
          <span>{{ limit(newJob.jobTitle, 35) }}</span>
        </div>
        <div class="job-card__center">
          <div
            class="langage"
            v-for="(langage, index) in newJob.programingLanguage.slice(0, 2)"
            :key="`langage-${index}`"
          >
            {{ langage.programingLanguageName }}
          </div>
          <div
            class="framework"
            v-for="(framework, index) in newJob.programingFramework.slice(0, 2)"
            :key="`framework-${index}`"
          >
            {{ framework.programingFrameworkName }}
          </div>
          <div
            class="skill"
            v-for="(skill, index) in newJob.skill.slice(0, 2)"
            :key="`skill-${index}`"
          >
            {{ skill.skillName }}
          </div>
        </div>
        <div class="job-card__bottom">
          <div class="product-start-end">
            <div class="product-start-end-tag">
              開発期間:
            </div>
            <div class="product-start-end-time">
              {{ day(newJob.devStartDate, "YYYY年 M月 D日") }} ~
              {{ day(newJob.devEndDate, "YYYY年 M月 D日") }}
            </div>
          </div>
          <div class="post-user-area">
            <div class="post-user-image" />
            <div class="post-user-name-area">
              <div class="post-user-name">
                {{ newJob.user.userName }}
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-row>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.job-card {
  display: none;
}
.job-card-desktop {
  width: 23.5%;
  height: 252px;
  margin: 1rem 0.5%;
  border: solid 1px $card-border-color;
  background-color: $white;
  border-radius: 8px;
  transition: 0.3s;
  color: $text-main-color;
  display: inline-block;

  &__top {
    width: calc(100% - 3.5rem);
    height: calc(38% - 60px);
    text-align: left;
    padding: 1.2rem 2rem 1rem 1.5rem;
    font-weight: bold;
    pointer-events: none;
    font-size: 16px;
    text-decoration: underline;
    // background-color: yellow;
  }

  &__center {
    width: calc(100% - 3rem);
    height: calc(40% - 20px);
    padding: 0px 1.5rem 0 1.5rem;
    text-align: left;
    pointer-events: none;
    // background-color: blue;

    .langage {
      // @include border_language;
      color: $language-color;
      margin: 5px 0px 0px 5px;
      text-align: left;
      display: inline-block;
      font-size: 12px;
      padding: 7px 1.2rem;
      border-radius: 5px / 5px;
      font-weight: bold;
      pointer-events: none;
    }

    .framework {
      // @include border_framework;
      margin: 5px 0px 0 5px;
      text-align: left;
      display: inline-block;
      color: $framework-color;
      font-size: 12px;
      padding: 7px 1.2rem;
      border-radius: 5px / 5px;
      font-weight: bold;
      pointer-events: none;
    }

    .skill {
      // @include border-skill;
      color: $skill-color;
      margin: 5px 0px 0 5px;
      text-align: left;
      display: inline-block;
      font-size: 12px;
      padding: 7px 1.2rem;
      border-radius: 5px / 5px;
      font-weight: bold;
      pointer-events: none;
    }
  }

  &__bottom {
    width: calc(100% - 50px);
    height: calc(38% - 20px);
    padding: 0px 25px 10px 25px;
    pointer-events: none;
    margin-top: 0.5rem;
    // background-color: rgba(0, 128, 0, 0.544);

    .product-start-end {
      width: 100%;
      height: 40%;
      text-align: left;
      pointer-events: none;

      .product-start-end-tag {
        display: inline-block;
        pointer-events: none;
        font-size: 14px;
      }

      .product-start-end-time {
        display: inline-block;
        padding: 0 20px;
        pointer-events: none;
        font-size: 14px;
      }
    }

    .post-user-area {
      width: 100%;
      text-align: left;
      pointer-events: none;
      position: relative;

      .post-user-image {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        -moz-border-radius: 60px;
        -webkit-border-radius: 60px;
        border-radius: 60px;
        box-shadow: 0 0 0 3px $primary-color;
        -webkit-box-shadow: 0 0 0 3px $primary-color;
        -moz-box-shadow: 0 0 0 3px $primary-color;
        display: inline-block;
        pointer-events: none;
      }

      .post-user-name-area {
        display: inline-block;
        width: 50%;
        height: 60%;
        padding: 0.1rem 1rem;
        pointer-events: none;
        font-size: 14px;

        .post-user-name {
          position: absolute;
          top: 0;
          pointer-events: none;
          margin-top: 1rem;
        }
      }
    }
  }
}

// * 案件カード 1440 ~ 320
@media screen and (max-width: 1440px) {
  .job-card-desktop {
    display: none;
  }
  .job-card {
    // width: 32%;
    width: 430px;
    // height: 252px;
    margin: 1rem 0.5%;
    border: solid 1px $card-border-color;
    background-color: $white;
    border-radius: 8px;
    transition: 0.3s;
    color: $text-main-color;
    display: block;
    // display: inline-block;

    &__top {
      text-align: left;
      padding: 2rem 2rem 0 1.5rem;
      font-weight: bold;
      pointer-events: none;
      font-size: 18px;
      text-decoration: underline;
      // background-color: green;
    }

    &__center {
      padding: 10px 1.5rem 0 1.5rem;
      text-align: left;
      pointer-events: none;
      // background-color: blue;

      .langage {
        @include border_language;
        color: $language-color;
        margin: 5px 0px 0px 5px;
        text-align: left;
        display: inline-block;
        font-size: 12px;
        padding: 7px 1.2rem;
        border-radius: 5px / 5px;
        font-weight: bold;
        pointer-events: none;
      }

      .framework {
        @include border_framework;
        margin: 5px 0px 0 5px;
        text-align: left;
        display: inline-block;
        color: $framework-color;
        font-size: 12px;
        padding: 7px 1.2rem;
        border-radius: 5px / 5px;
        font-weight: bold;
        pointer-events: none;
      }

      .skill {
        @include border-skill;
        color: $skill-color;
        margin: 5px 0px 0 5px;
        text-align: left;
        display: inline-block;
        font-size: 12px;
        padding: 7px 1.2rem;
        border-radius: 5px / 5px;
        font-weight: bold;
        pointer-events: none;
      }
    }

    &__bottom {
      // background-color: purple;
      padding: 0px 25px 10px 25px;
      pointer-events: none;
      margin-top: 0.5rem;
      // background-color: rgba(0, 128, 0, 0.544);

      .product-start-end {
        width: 100%;
        height: 40%;
        text-align: left;
        pointer-events: none;

        .product-start-end-tag {
          display: inline-block;
          pointer-events: none;
          font-size: 14px;
        }

        .product-start-end-time {
          display: inline-block;
          padding: 0 20px;
          pointer-events: none;
          font-size: 14px;
        }
      }

      .post-user-area {
        width: 100%;
        text-align: left;
        pointer-events: none;
        position: relative;

        .post-user-image {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          -moz-border-radius: 60px;
          -webkit-border-radius: 60px;
          border-radius: 60px;
          box-shadow: 0 0 0 3px $primary-color;
          -webkit-box-shadow: 0 0 0 3px $primary-color;
          -moz-box-shadow: 0 0 0 3px $primary-color;
          display: inline-block;
          pointer-events: none;
        }

        .post-user-name-area {
          display: inline-block;
          width: 50%;
          height: 60%;
          padding: 0.1rem 1rem;
          pointer-events: none;
          font-size: 14px;

          .post-user-name {
            position: absolute;
            top: 0;
            pointer-events: none;
            margin-top: 1rem;
          }
        }
      }
    }
  }
}
</style>
