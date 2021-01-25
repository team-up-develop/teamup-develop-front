<script lang="ts">
import { 
  defineComponent,
  reactive,
  toRefs,
} from '@vue/composition-api';
import { 
  API_URL,
  catchError,
} from '@/master'
import axios from 'axios'
import Email from '@/components/Atoms/Forms/Email.vue'
import Password from '@/components/Atoms/Forms/Password.vue'

type State = {
  LoginName: string;
  LoginPassword: string;
}

const initialState = (): State => ({
  LoginName: '',
  LoginPassword: '',
});

export default defineComponent({
  components: {
    Email,
    Password
  },
  setup: () => {
    const state = reactive<State>(initialState());

    const register = async() => {
      const params = {
        LoginName: state.LoginName,
        LoginPassword: state.LoginPassword,
      }
      try { 
        const res = await axios.post(`${API_URL}/signup`, params)
        console.log(res)
        state.LoginName = "";
        state.LoginPassword = "";
      } catch (error) { catchError(error) }
    }

    return {
      ...toRefs(state),
      register
    }
  }
})
</script>

<template>
  <section>
    <div class="register-form-area">
      <label for="name" class="label">メールアドレス</label>
      <Email
        v-model="LoginName"
        type="text"
      />
      <label for="name" class="label">パスワード</label>
      <Password
        v-model="LoginPassword"
        type="password"
      />
    </div>
    <div @click="register" class="register-btn">新規登録</div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.register-form-area {
  width: 100%;
  height: 65%;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;

  .label {
    color: #444444;
    font-size: 14px;
  }
}

.register-btn {
  @include purple-btn ;
  @include neumorphism;
  color: $white;
  display: block;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: .875rem;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  font-size: 1rem;
  cursor: pointer;
  transition: .3s;
  outline: none;

  &:hover {
    @include btn-hover;
    color: #F8FAFF;
    appearance: none;
    border: none;
    transition: .3s;
  }
}
</style>