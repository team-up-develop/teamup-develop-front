
<script lang="ts">
import { 
  defineComponent,
  computed
} from '@vue/composition-api';
import { dayJs } from '@/master';

export default defineComponent({ 
  props: {
    user: { type: Object, require: true, defalut: {} },
    myselfFlag: { type: Boolean, require: true, defalut: false },
  },
  setup: (props: any, context) => {
    const day = (value: string, format: string) => dayJs(value, format);

    const enabledBtn = computed(() => {
      if(props.myselfFlag == true) {
        return true;
      }
      return false;
    });

    const twitterTab = () => {
      if(props.user.twitter_account == null) {
        return props.user.twitter_account;
      } else {
        const url: string = props.user.twitter_account;
        return window.open(url);
      }
    };

    const gitTab = () => {
      if(props.user.github_account == null) {
        return props.user.github_account;
      } else {
        const url: string = props.user.github_account;
        return window.open(url);
      }
    };

    const editEmit = () => {
      context.emit('editEmit')
    }

    return {
      day,
      enabledBtn,
      twitterTab,
      gitTab,
      editEmit
    }
  }
});
</script>

<template>
  <section>
    <v-sheet class="post">
      <v-row>
        <div class="left">
          <div class="user-image"></div>
        </div>
        <div class="right">
          <div class="profile-area">
            <v-col class="name-are">
              <div class="user-name">
                {{ user.login_name }}
              </div>
            </v-col>
            <v-col class="introduce-area" style="padding: none">
              <div class="introduce">
                {{ day(user.learning_start_date, "YYYY年 M月 D日")}}
              </div>
            </v-col>
            <v-col class="url-area">
              <v-row>
                <img class="img" @click="gitTab" src="@/assets/github.png" width="35" />
                <img class="img" @click="twitterTab" src="@/assets/images/twitter.png" width="35" />
              </v-row>
            </v-col>
          </div>
        </div>
      </v-row>
      <div class="btn-area">
        <button class="edit-btn" @click="editEmit" v-if="enabledBtn">編集する</button>
      </div>
    </v-sheet>

  </section>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.post {
  border-radius: 4px;
  padding: 2rem 4rem;
  margin-bottom: 2rem;
  position: relative;

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
      padding: 0.5rem 0 0 1rem ;

      .name-are
      .user-name {
        font-size: 18px;
        font-weight: bold;
      }

      .introduce-area 
      .introduce {
        font-size: 12px;
      }
    }

    .url-area {
      padding: 0rem 0rem 0 1rem;
      .img {
        cursor: pointer;
        padding: 0 0 0 0.5rem;
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
      transition: .3s;
      outline: none;
    }
  }
}

@media screen and (max-width: 650px) {
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
        padding: 0.5rem 0 0 0rem ;
      }
    }

    .btn-area {
      .edit-btn {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .post {
    padding: 1rem 1rem;

    .right {
      width: 60%;
    }
  }
}


@media screen and (max-width: 420px) {
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