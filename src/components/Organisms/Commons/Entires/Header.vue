<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/composition-api";
import Logo from "@/components/Atoms/Commons/Entires/Logo.vue";
import CreateBtn from "@/components/Atoms/Commons/Entires/CreateBtn.vue";
import Vuex from "@/store/index";
import { truncate } from "@/master";

type State = {
  userId: number;
  userName: string;
};

const initialState = (): State => ({
  userId: Vuex.state.auth.userId,
  userName: Vuex.state.auth.userName,
});

export default defineComponent({
  components: {
    Logo,
    CreateBtn,
  },

  setup: () => {
    const state = reactive<State>(initialState());

    const limit = (value: string, num: number) => truncate(value, num);

    return {
      ...toRefs(state),
      limit,
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
          <v-row class="left-user-menu">
            <v-menu left bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <div class="user-image"></div>
                </v-btn>
              </template>
              <v-list-item-group color="primary">
                <v-list style="z-index: 100;">
                  <v-list-item>
                    <router-link
                      :to="`/account/profile/${userId}`"
                      class="menu-list"
                    >
                      <v-list-item-title>
                        <v-icon class="icon"
                          >mdi-card-account-details-outline</v-icon
                        >
                        {{ limit(userName, 6) }}
                      </v-list-item-title>
                    </router-link>
                  </v-list-item>
                  <div class="boder-line"></div>
                  <v-list-item>
                    <router-link to="/chat" class="menu-list">
                      <v-list-item-title>
                        <v-icon class="icon">mdi-chat-plus-outline</v-icon>
                        チャット
                      </v-list-item-title>
                    </router-link>
                  </v-list-item>
                  <v-list-item>
                    <router-link to="/manage" class="menu-list">
                      <v-list-item-title>
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
          <v-row class="right-create-btn">
            <CreateBtn />
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.menu-list {
  color: $text-sub-color;
  font-size: 14px;
  text-decoration: none;
}

.boder-line {
  width: 100%;
  border-bottom: 1px solid rgba(128, 128, 128, 0.442);
}

.icon {
  color: $text-sub-color;
}

.v-icon.v-icon {
  margin-right: 1rem;
  font-size: 1.5em;
  color: $text-sub-color;
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
        width: 180px;
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
        padding: 0.7rem 4rem 0 0;
        position: absolute;
        right: 0;
        top: 0;

        @media screen and (max-width: $me) {
          width: 250px;
        }

        @media screen and (max-width: $sm) {
          width: 210px;
        }

        .left-user-menu {
          width: 100px;
          height: 100%;
          margin: 0;
          display: inline-block;

          .user-image {
            @include user-image;
            width: 2.8rem;
            height: 2.6rem;
            border-radius: 50%;
            cursor: pointer;
          }
        }

        .right-create-btn {
          width: 30%;
          height: 100%;
          display: inline-block;
          font-weight: bold;
          color: $white;
        }
      }
    }
  }
}
</style>
