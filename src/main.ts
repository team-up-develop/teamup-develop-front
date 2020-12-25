import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import VueCompositionApi from '@vue/composition-api';
import { library } from '@fortawesome/fontawesome-svg-core'
// FIXME: FontAwesome Package削除
import 
  { 
    faLaptop,
    faUser,
    faBell,
    faHistory,
    faBars,
    faUserPlus,
    faBookmark, 
    faComments, 
    faArchive, 
    faAddressCard, 
    faUsers, 
    faUserAltSlash, 
    faEye, 
    faThumbsUp,
    faChevronCircleRight, 
    faHeart, 
    faSearch, 
    faPaperPlane, 
    faArrowUp,
    faQuestionCircle,
  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.use(VueCompositionApi);
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

library.add(
  faLaptop,
  faUser,
  faBell, 
  faHistory, 
  faBars, 
  faUserPlus, 
  faBookmark, 
  faComments, 
  faArchive, 
  faAddressCard, 
  faUsers, 
  faUserAltSlash, 
  faEye, 
  faThumbsUp, faChevronCircleRight, 
  faHeart, 
  faSearch, 
  faPaperPlane, 
  faArrowUp,
  faQuestionCircle
)