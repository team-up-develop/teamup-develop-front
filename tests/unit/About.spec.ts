import { shallowMount } from '@vue/test-utils'
import About from '@/views/Commons/About.vue'

describe('LP画面が正しくRenderされていること', () => {
  it('ログインボタンが存在すること', () => {
    const wrapper = shallowMount(About)
    expect(wrapper.html()).toContain('<button class="login">ログインする</button>')
  })
  it('登録ボタンが存在すること', () => {
    const wrapper = shallowMount(About)
    expect(wrapper.html()).toContain('<button class="register">登録する</button>')
  })
})
