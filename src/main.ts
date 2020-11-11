import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLaptop, faUser, faBell, faHistory, faBars, faUserPlus, faBookmark, faComments, faArchive, faAddressCard, faUsers, faUserAltSlash, faEye, faThumbsUp, faChevronCircleRight, faHeart, faSearch, faPaperPlane, faArrowUp} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)

library.add(faLaptop, faUser, faBell, faHistory, faBars, faUserPlus, faBookmark, faComments, faArchive, faAddressCard, faUsers, faUserAltSlash, faEye, faThumbsUp, faChevronCircleRight, faHeart, faSearch, faPaperPlane, faArrowUp)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
