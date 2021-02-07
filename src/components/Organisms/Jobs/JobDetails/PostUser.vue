<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { dayJs, truncate } from "@/master";

export default defineComponent({
  props: {
    job: { type: Object, require: true, defalut: {} },
  },
  setup: () => {
    const day = (value: string, format: string) => dayJs(value, format);
    const limit = (value: string, num: number) => truncate(value, num);

    return {
      day,
      limit,
    };
  },
});
</script>

<template>
  <section>
    <v-sheet class="post-user-area">
      <div class="left-user-area">
        <div class="user-image"></div>
      </div>
      <div class="right-user-area">
        <div class="user-profile-area">
          <div class="user-name-are">
            <div class="user-name-tag">名前</div>
            <router-link :to="`/account/profile/${job.user_id}`">
              <div class="user-name">
                {{ limit(job.user.login_name, 27) }}
              </div>
            </router-link>
          </div>
          <div class="user-introduce-area">
            <div class="introduce-tag">学習開始</div>
            <div class="introduce">
              {{ day(job.user.learning_start_date, "YYYY年 M月 D日") }}
            </div>
          </div>
        </div>
      </div>
    </v-sheet>
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.post-user-area {
  @include card-border-color;
  border-radius: 4px;
  padding: 2rem 4rem;
  margin-bottom: 2rem;
  position: relative;

  @media screen and (max-width: 500px) {
    padding: 2.5rem 1rem;
  }
  @media screen and (max-width: 768px) {
    padding: 2rem;
  }

  .left-user-area {
    width: 20%;
    height: 100%;

    .user-image {
      @include user-image;
      width: 130px;
      height: 130px;

      @media screen and (max-width: 500px) {
        width: 100px;
        height: 100px;
      }
    }
  }

  .right-user-area {
    width: 75%;
    position: absolute;
    right: 0;
    top: 0;
    padding: 1.8rem 2rem 0 2rem;
    text-align: left;

    @media screen and (max-width: 1100px) {
      width: 70%;
    }
    @media screen and (max-width: 500px) {
      padding: 1.5rem 1.2rem 0px;
    }
    @media screen and (max-width: 450px) {
      width: 64%;
    }

    .user-profile-area {
      height: 100%;

      .user-name-are {
        .user-name-tag {
          font-weight: bold;
        }

        .user-name {
          word-wrap: break-word; //* 折り返し
          margin-top: 0.2rem;
          font-size: 16px;
        }
      }

      .user-study-area {
        .study-tag {
          font-weight: bold;
        }

        .stydy-time {
          margin-top: 0.2rem;
        }
      }

      .user-introduce-area {
        margin-top: 2rem;

        @media screen and (max-width: 500px) {
          margin-top: 0.5rem;
        }

        .introduce-tag {
          font-weight: bold;
        }

        .introduce {
          margin-top: 0.2rem;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
