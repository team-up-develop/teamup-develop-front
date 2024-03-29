<script lang="ts">
import { defineComponent, PropType, computed } from "@vue/composition-api";
import { truncate } from "@/hooks/useUtils";
import { dayjs } from "@/libs/dayjs";
import { Job } from "@/types";
import { backGroundImage } from "@/modules/images";

export default defineComponent({
  props: {
    job: { type: Object as PropType<Job>, required: true },
  },
  setup: (props) => {
    return {
      dayjs,
      truncate,
      backGroundImage: computed(() =>
        backGroundImage(props.job.user?.user_image)
      ),
    };
  },
});
</script>

<template>
  <section>
    <v-sheet class="post-user-area">
      <div class="left-user-area">
        <div
          v-if="job.user.user_image"
          class="user-image"
          :style="backGroundImage"
        />
        <div v-else class="user-image">
          <v-icon class="icon">mdi-account</v-icon>
        </div>
      </div>
      <div class="right-user-area">
        <div class="user-profile-area">
          <div class="user-name-are">
            <div class="user-name-tag">名前</div>
            <router-link :to="`/account/profile/${job.user_id}/detail`">
              <div class="user-name">
                {{ truncate(job.user.user_name, 27) }}
              </div>
            </router-link>
          </div>
          <div class="user-introduce-area">
            <div class="introduce-tag">学習開始</div>
            <div class="introduce">
              {{ dayjs(job.user.learning_start_date).format("YYYY年 M月 D日") }}
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
  border-radius: 4px;
  padding: 2rem 4rem;
  margin-bottom: 2rem;
  position: relative;

  @media screen and (max-width: $sm) {
    padding: 2.5rem 1rem;
  }

  .left-user-area {
    width: 20%;
    height: 100%;

    .user-image {
      @include user-image;
      width: 130px;
      height: 130px;

      @media screen and (max-width: $sm) {
        width: 100px;
        height: 100px;
      }

      .icon {
        font-size: 80px;
        margin-left: 1.5rem;
        margin-top: 1.5rem;
        color: $primary-color;
        @media screen and (max-width: $sm) {
          font-size: 60px;
          margin-left: 1.2rem;
          margin-top: 1rem;
          color: $primary-color;
        }
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

    @media screen and (max-width: $la) {
      width: 70%;
      padding: 1.8rem 2rem 0 1.5rem;
    }
    @media screen and (max-width: $me) {
      padding: 1.8rem 2rem 0 2rem;
    }
    @media screen and (max-width: $sm) {
      padding: 1.8rem 2rem 0 1.1rem;
    }
    @media screen and (max-width: $ti) {
      padding: 1.8rem 2rem 0 1rem;
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

        @media screen and (max-width: $sm) {
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
