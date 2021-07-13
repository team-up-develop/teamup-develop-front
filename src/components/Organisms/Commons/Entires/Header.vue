<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
} from "@vue/composition-api";
import Logo from "@/components/Atoms/Commons/Entires/Logo.vue";
import CreateBtn from "@/components/Atoms/Commons/Entires/CreateBtn.vue";
import { truncate } from "@/hooks/useUtils";

type State = {
  userId: number;
  userName: string;
};

const initialState = (ctx: SetupContext): State => ({
  userId: ctx.root.$store.getters.userId,
  userName: ctx.root.$store.getters.userName,
});

export default defineComponent({
  components: {
    Logo,
    CreateBtn,
  },

  setup: (_, ctx) => {
    const state = reactive<State>(initialState(ctx));

    return {
      ...toRefs(state),
      truncate,
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
            <CreateBtn />
          </v-row>
          <v-row class="right-user-menu">
            <v-menu left bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <div class="user-image" />
                </v-btn>
              </template>
              <v-list-item-group color="primary">
                <v-list>
                  <v-list-item>
                    <router-link
                      :to="`/account/profile/${userId}/detail`"
                      class="menu-list"
                    >
                      <v-list-item-title>
                        <v-icon class="icon"
                          >mdi-card-account-details-outline</v-icon
                        >
                        {{ truncate(userName, 6) }}
                      </v-list-item-title>
                    </router-link>
                  </v-list-item>
                  <div class="boder-line" />
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
