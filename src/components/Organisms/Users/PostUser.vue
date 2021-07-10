<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import {
  InsidePropsType,
  OutsidePropsType,
  PropType,
} from "@icare-jp/vue-props-type";
import { dayJsFormat } from "@/libs/dayjs";
import { User } from "@/types/index";

const propsOption = {
  user: { type: Object as PropType<User>, required: true },
  myselfFlag: {
    type: Boolean as PropType<boolean>,
    required: true,
    defalut: false,
  },
} as const;

type PropsOption = typeof propsOption;
export type PostUserProps = OutsidePropsType<PropsOption>;

export default defineComponent<InsidePropsType<PropsOption>>({
  props: propsOption,
  setup: (props, context) => {
    const twitterTab = () => {
      if (props.user?.twitter_account) {
        const url: string = props.user.twitter_account;
        return window.open(url, "_blank");
      }
      return;
    };

    const gitTab = () => {
      if (props.user?.github_account) {
        const url: string = props.user.github_account;
        return window.open(url, "_blank");
      }
      return;
    };

    const editEmit = () => {
      context.emit("editEmit");
    };

    return {
      dayJsFormat,
      twitterTab,
      gitTab,
      editEmit,
    };
  },
});
</script>

<template>
  <section>
    <div class="post">
      <v-row>
        <div class="left">
          <div class="user-image"></div>
        </div>
        <div class="right">
          <div class="profile-area">
            <v-col class="name-are">
              <div class="user-name">
                {{ user.user_name }}
              </div>
            </v-col>
            <v-col class="introduce-area" style="padding: none">
              <div class="introduce">
                学習開始
                {{ dayJsFormat(user.learning_start_date, "YYYY年 M月 D日") }}
              </div>
            </v-col>
            <v-col class="url-area">
              <v-row>
                <img
                  class="img"
                  @click="gitTab()"
                  src="@/assets/images/github-icon.png"
                  width="35"
                />
                <img
                  class="twitter-img"
                  @click="twitterTab()"
                  src="@/assets/images/twitter-icon.png"
                  width="35"
                />
              </v-row>
            </v-col>
          </div>
        </div>
      </v-row>
      <div class="btn-area">
        <button v-if="myselfFlag" class="edit-btn" @click="editEmit">
          編集する
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.post {
  border-radius: 4px;
  padding: 2rem 4rem;
  margin-bottom: 2rem;
  position: relative;
  background-color: none;

  .left {
    .user-image {
      @include user-image;
      width: 150px;
      height: 150px;
    }
  }

  .right {
    width: 68%;
    text-align: left;

    .profile-area {
      padding: 0.5rem 0 0 1rem;

      .name-are .user-name {
        font-size: 18px;
        font-weight: bold;
      }

      .introduce-area .introduce {
        font-size: 12px;
      }
    }

    .url-area {
      padding: 0.2rem 0rem 0 1rem;
      .img {
        cursor: pointer;
        padding: 0 0 0 0.5rem;
        width: 35px;
        height: 30px;

        &:hover {
          opacity: 0.8;
        }
      }
      .twitter-img {
        cursor: pointer;
        padding: 0 0 0 0.5rem;
        width: 37px;
        height: 32px;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
  .btn-area {
    position: absolute;
    top: 0;
    right: 0;

    .edit-btn {
      @include box-shadow-btn;
      background-color: $secondary-color;
      color: $white;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      width: 160px;
      height: 50px;
      font-weight: bold;
      font-size: 1em;
      appearance: none;
      border: none;
      transition: 0.3s;
      outline: none;
    }
  }
}

@media screen and (max-width: $me) {
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
        padding: 0.5rem 0 0 0rem;
      }
    }

    .btn-area {
      .edit-btn {
        display: none;
      }
    }
  }
}

@media screen and (max-width: $sm) {
  .post {
    padding: 1rem 1rem;

    .right {
      width: 60%;
    }
  }
}

@media screen and (max-width: $ti) {
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
