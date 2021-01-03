<script lang="ts">
import { 
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed
} from '@vue/composition-api';
import Vuex from '@/store/index'
import Loading from '@/components/Organisms/Commons/Loading/Loading.vue'
import UserCard from '@/components/Organisms/Manages/UserCard.vue'
import JobCreateCompleteCard from '@/components/Organisms/Jobs/JobCreateCompleteCard.vue'

type State = {
  loading: boolean;
  userId: number;
}

const initialState = (): State => ({
  loading: true,
  userId: Vuex.state.auth.userId,
});

export default defineComponent({ 
  components: {
    Loading,
    UserCard,
    JobCreateCompleteCard
  },
  setup: () => {
    const state = reactive<State>(initialState());

    const isLogin = computed(() => {
      if(state.userId) {
        return true
      } else {
        return false
      }
    });

    const Loading = () => {
      setTimeout(() => {
        state.loading = false;
      }, 1500)
    };

    onMounted(() => {
      Loading();
    });

    return {
      ...toRefs(state),
      Loading,
      isLogin
    }
  }
});
</script>

<template>
  <section>
    <v-container class="wrapper" v-show="!loading">
      <v-row v-if="isLogin">
        <UserCard />
        <v-sheet class="create">
          <v-col>
            <JobCreateCompleteCard />
          </v-col>
        </v-sheet>
      </v-row>
      <div v-else>
        ログインが必要です
      </div>
    </v-container>
    <Loading v-show="loading">
    </Loading>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';


.wrapper {
  width: 90%;
  max-width: none;
  margin-bottom: 1rem;

  @media screen and (max-width: 1100px) {
    width: 97%;
  }
}

.create {
  @include card-border-color;
  width: 60%;
  border-radius: 8px;
  margin: 0 auto;
  background-color: #ffffff;
  position: relative;
  font-size: 14px;
  padding: 0 2rem 2rem 2rem;
  color: $text-main-color;

  @media screen and (max-width: 1000px) {
    width: 50%;
  }

  @media screen and (max-width: 900px) {
    width: 85%;
    padding: 0 1rem 2rem 1rem;
  }

  @media screen and (max-width: 600px) {
    width: 95%;
  }

  @media screen and (max-width: 450px) {
    width: 98%;
    padding: 1rem;
  }
}
.jobs {
  text-decoration: none;
}
</style>


