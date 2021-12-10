<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  computed,
} from "@vue/composition-api";
import Logo from "@/components/Atoms/Commons/Entires/Logo.vue";
import { truncate } from "@/hooks/useUtils";
import { $fetch } from "@/libs/axios";
import { API_URL } from "@/master";
import { fetchError, catchError } from "@/libs/errorHandler";
import { User, Fetch } from "@/types/index";
import { backGroundImage } from "@/modules/images";
import { VButton } from "@/components/Atoms";

type State = {
  userId: number;
  userName: string;
  userImage: User["user_image"];
};

const initialState = (ctx: SetupContext): State => ({
  userId: ctx.root.$store.getters.userId,
  userName: ctx.root.$store.getters.userName,
  userImage: null,
});

export default defineComponent({
  components: {
    Logo,
    VButton,
  },

  setup: (_, ctx) => {
    const state = reactive<State>(initialState(ctx));

    const fetchUser = async () => {
      // * ユーザー情報取得
      try {
        const res = await $fetch<Fetch<User>>(
          `${API_URL}/user/${state.userId}`
        );
        fetchError(res.data.status);
        state.userImage = res.data.response.user_image;
      } catch (error) {
        catchError(error);
      }
    };
    fetchUser();

    return {
      ...toRefs(state),
      truncate,
      backGroundImage: computed(() => backGroundImage(state.userImage)),
    };
  },
});
</script>

<template>
  <div class="header-wrapper">
    <div class="header-wrapper-area">
      <div class="header-main-area">
        <div class="header-main-left">
          <Logo />
        </div>
        <div class="header-main-right">
          <v-row class="left-create-btn">
            <router-link class="router" to="/job_create">
              <VButton bc="primary">募集する</VButton>
            </router-link>
          </v-row>
          <v-row class="right-user-menu">
            <v-menu left bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <div
                    v-if="userImage"
                    class="user-image"
                    :style="backGroundImage"
                  />
                  <div v-else class="user-image">
                    <v-icon class="use-icon">mdi-account</v-icon>
                  </div>
                </v-btn>
              </template>
              <v-list-item-group color="primary">
                <v-list class="list">
                  <v-list-item>
                    <router-link
                      :to="`/account/profile/${userId}/detail`"
                      class="menu-list"
                    >
                      <v-list-item-title class="font-weight-bold">
                        <v-icon class="icon"
                          >mdi-card-account-details-outline</v-icon
                        >
                        {{ truncate(userName, 6) }}
                      </v-list-item-title>
                    </router-link>
                  </v-list-item>
                  <div class="boder-line" />
                  <v-list-item>
                    <router-link to="/manage" class="menu-list">
                      <v-list-item-title class="font-weight-bold">
                        <v-icon class="icon"
                          >mdi-clipboard-multiple-outline</v-icon
                        >
                        案件管理
                      </v-list-item-title>
                    </router-link>
                  </v-list-item>
                </v-list>
              </v-list-item-group>
            </v-menu>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.router {
  text-decoration: none;
}
.list {
  .menu-list {
    color: $text-sub-color;
    font-size: 12px;
    text-decoration: none;
  }
}
.boder-line {
  width: 100%;
  border-bottom: 1px solid rgba(128, 128, 128, 0.442);
}
.v-icon.v-icon {
  margin-right: 0.5rem;
  font-size: 1.5em;
  color: $primary-color;
}

.header-wrapper {
  background-color: $white;
  width: 100%;
  height: 62px;
  margin-bottom: 2px;
  top: 0px;
  top: -100px;
  left: 0;
  z-index: 2;
  transition: 0.3s ease-in-out;
  border-bottom: 1px solid $dark-grey;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.6);

  .header-wrapper-area {
    width: 100%;
    height: 66px;
    position: relative;

    .header-main-area {
      height: 100%;
      width: 100%;
      position: absolute;
      right: 0;
      top: 0;

      .header-main-left {
        width: 150px;
        height: 100%;
        padding: 1.2rem 0 0rem 2rem;

        @media screen and (max-width: $me) {
          width: 100px;
        }

        @media screen and (max-width: $sm) {
          padding: 1.2rem 0 0rem 0.5rem;
        }
      }

      .header-main-right {
        width: 300px;
        padding: 0.7rem 0rem 0 0;
        position: absolute;
        right: 0;
        top: 0;

        @media screen and (max-width: $sm) {
          width: 230px;
        }

        .right-user-menu {
          height: 100%;
          margin: 0;
          display: inline-block;
          position: absolute;
          right: 0;
          margin-right: 2rem;

          @media screen and (max-width: $sm) {
            margin-right: 1rem;
          }

          .user-image {
            @include user-image;
            width: 2.8rem;
            height: 2.6rem;
            border-radius: 50%;
            cursor: pointer;

            .use-icon {
              font-size: 30px;
              margin-left: 0.5rem;
              margin-top: 0.5rem;
              color: $primary-color;
            }
          }
        }

        .left-create-btn {
          height: 100%;
          margin-top: 0.05rem;
          display: inline-block;
          font-weight: bold;
          color: $white;
        }
      }
    }
  }
}
</style>
