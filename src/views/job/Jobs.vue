<template>
  <div class="job-wrapper">
    <!-- 右側浮いてるボタン -->
    <transition name="button">
      <div class="scroll-area" v-show="buttonActive">
        <a href="#"><font-awesome-icon icon="arrow-up" class="icon"/></a>
      </div>
    </transition>
    <!-- 言語検索 モーダル画面 -->
    <div class="example-modal-window">
      <LanguageSearchModal @close="closeLangSearchModal" v-if="langModal">
        <p class="label-lang">開発言語 選択</p>
          <div class="round" v-for="lang in languages" v-bind:key="lang.id">
          <input type="checkbox"  id="checkbox" v-model="selectedLang" v-bind:value="lang.id">
            <label for="" class="checkbox">{{ lang.programingLanguageName }}</label>
          </div>
        <template slot="footer">
          <div @click="searchLanguage" class="serach-btn">
            検索する
          </div>
        </template>
      </LanguageSearchModal>
    </div>
    <!-- フレームワーク検索 モーダル画面 -->
    <div class="example-modal-window">
      <FrameworkSearchModal @close="closeFrameworkSearchModal" v-if="frameworkModal">
        <p class="label-lang">フレームワーク 選択</p>
          <div class="round" v-for="framework in frameworks" v-bind:key="framework.id">
          <input type="checkbox"  id="checkbox" v-model="selectedFramework" v-bind:value="framework.id">
            <label for="" class="checkbox">{{ framework.programingFrameworkName }}</label>
          </div>
        <template slot="footer">
          <div @click="searchFramework" class="serach-btn">
            検索する
          </div>
        </template>
      </FrameworkSearchModal>
    </div>
    <!-- その他スキル検索 モーダル画面 -->
    <div class="example-modal-window">
      <SkillSearchModal @close="closeSkillSearchModal" v-if="skillModal">
        <p class="label-lang">その他スキル 選択</p>
          <div class="round-skill" v-for="skill in skills" v-bind:key="skill.id">
          <input type="checkbox"  id="checkbox" v-model="selectedSkill" v-bind:value="skill.id">
            <label for="" class="checkbox">{{ skill.skillName }}</label>
          </div>
        <template slot="footer">
          <div @click="searchSkill" class="serach-btn">
            検索する
          </div>
        </template>
      </SkillSearchModal>
    </div>
    <!-- 応募する モーダル画面 -->
    <div class="example-modal-window">
      <ApplyModal @close="closeModal" v-if="modal">
        <p>応募を完了してよろしいですか？</p>
        <template slot="footer">
          <applybtn @compliteEntry="compliteEntry" :jobId='id' ></applybtn>
          <button @click="doSend" class="modal-btn">キャンセル</button>
        </template>
      </ApplyModal>
    </div>
    <!-- 検索エリアバー -->
    <div class="search-area">
      <button class="search-area__modal-btn" @click="langSearchModal">開発言語</button>
      <button class="search-area__modal-btn" @click="frameworkSearchModal">フレームワーク</button>
      <button class="search-area__modal-btn" @click="skillSearchModal">その他技術</button>
      <input
        type="text" 
        v-model="freeWord" 
        placeholder="フリーワード" 
        class="search-area__freewrod"
        @keyup.enter="searchFreeword"
      >
    </div>
    <!-- 案件表示エリア -->
    <div class="job-wrapper-center" v-show="!loading">
      <div class="job-wrapper-left" v-if="jobsNullFlag === false">
        <div 
          v-for="job in jobs" 
          class="router" 
          :key="job.id"  
          :value="job.id"
          @click="getJob(job)" 
          :jobId='job'
        >
          <!-- 案件カード コンポーネント -->
          <card-job :job="job"></card-job>
        </div>
      </div>
      <!-- 検索結果が無い場合 -->
      <div class="job-wrapper-left-false" v-else>
        この条件での開発案件はありませんでした。<br>
        別のキーワードで検索してください。
        <p>検索キーワード <span> {{ freeWord }}{{ selectedLang }}{{ selectedFramework }}{{ selectedSkill }}</span></p>
      </div>
      <router-link :to="`/jobs/${ job.id }`" class="router-1" v-for="job in jobs" :key="job.id" >
        <card-job :job="job"></card-job>
      </router-link>
      <div class="job-wrapper-right" v-if="detailFlag === true">
        <div class="top-job-detail-area">
          <div class="top-job-detail-area__title">
            {{ detailJobTitle }}
          </div>
          <!-- ログイン時 -->
          <div v-if="entryRedirect == false">
            <div class="top-job-detail-bottom" v-if="selfJobPost === false">
              <button @click="openModal" class="btn-box-apply" v-if="applyFlug">応募する</button>
              <div class="btn-box-apply-false" v-if="applyFlug === false">
                応募済み
              </div>
              <div class="btn-box-save">
                <font-awesome-icon icon="heart" class="save-icon" @click="saveJob" v-if="saveFlag"/>
                <font-awesome-icon icon="heart" class="save-end-icon" @click="deleteJob" v-if="saveFlag == false"/>
              </div>
            </div>
            <div v-else>
              <div class="top-job-detail-bottom">
                <router-link :to="`/manage/apply/${ jobDetail.id }`">
                  <button class="btn-box-manage">管理画面</button>
                </router-link>
              </div>
            </div>
          </div>
          <!-- 非ログイン時 リダイレクトさせる -->
          <div v-else>
            <div class="top-job-detail-bottom">
              <button class="btn-box-apply" @click="registerRedirect">応募する</button>
              <div class="btn-box-save">
                <button @click="registerRedirect">仮ボタン</button>
                <font-awesome-icon icon="heart" class="save-icon" @click="registerRedirect"/>
              </div>
            </div>
          </div>
        </div>
        <!-- 右側案件詳細 -->
        <div class="main-job-detail-area">
          <div class="tag-area">
            <font-awesome-icon icon="chevron-circle-right" class="icon"/> 
            投稿者
          </div>
          <router-link :to="`/account/profile/${ jobDetail.userId }`"> 
            <div class="post-user-name-area">
              {{ jobDetail.user.userName }}
            </div>
          </router-link>
          <div class="tag-area">
            <font-awesome-icon icon="chevron-circle-right" class="icon"/> 
            開発言語
          </div>
          <div class="post-user-area">
            <div 
              class="detail-langage" 
              v-for="langage in jobDetail.programingLanguage.slice(0,5)" 
              :key="langage.id">
              {{ langage.programingLanguageName }}
            </div>
          </div>
          <div class="tag-area">
            <font-awesome-icon icon="chevron-circle-right" class="icon"/> 
            フレームワーク
          </div>
          <div class="post-user-area">
            <div class="detail-framework" 
              v-for="framework in jobDetail.programingFramework.slice(0,5)" 
              :key="framework.programingFrameworkName">
              {{ framework.programingFrameworkName }}
            </div>
          </div>
          <div class="tag-area">
            <font-awesome-icon icon="chevron-circle-right" class="icon"/> 
            その他スキル
          </div>
          <div class="post-user-area">
            <div class="detail-skill" 
              v-for="skill in jobDetail.skill.slice(0,5)" 
              :key="skill.skillName"
            >
              {{ skill.skillName }}
            </div>
          </div>
          <div class="tag-area">
            <font-awesome-icon icon="chevron-circle-right" class="icon"/> 
            開発期間
          </div>
          <div class="post-user-area">
            {{ jobDetail.devStartDate | moment("YYYY年 M月 D日") }}  ~  {{ jobDetail.devEndDate | moment("YYYY年 M月 D日")}}
          </div>
          <div class="tag-area">
            <font-awesome-icon icon="chevron-circle-right" class="icon"/> 
            募集人数
          </div>
          <div class="post-user-area">
            {{ jobDetail.recruitmentNumbers }} 人
          </div>
          <div class="tag-area">
            <font-awesome-icon icon="chevron-circle-right" class="icon"/> 
            開発詳細
          </div>
          <div class="post-user-area">
            {{ jobDetail.jobDescription }}
          </div>
          <div class="jobDetail-time-area">
            投稿期日   {{ jobDetail.createdAt | moment("YYYY年 M月 D日") }}
          </div>
        </div>
      </div>
      <div class="job-wrapper-right-false" v-else>
        <!-- 右側の登録コンポーネント -->
        <job-register-false/>
      </div>
    </div>
    <Loading v-show="loading">
    </Loading>
  </div>
</template>

<script>
// import $ from 'jquery';
import Vue from 'vue';
import axios from 'axios'
import moment from "moment";
import Loading from '@/components/common/loading/Loading.vue'
import ApplyModal from '@/components/modal/ApplyModal.vue'
import Applybtn from '@/components/button/Applybtn.vue'
import JobRegisterFalse from '@/components/job/JobRegisterFalse.vue'
import CardJob from '@/components/job/CardJob.vue'
import LanguageSearchModal from '@/components/modal/LanguageSearchModal.vue'
import FrameworkSearchModal from '@/components/modal/FrameworkSearchModal.vue'
import SkillSearchModal from '@/components/modal/SkillSearchModal.vue'

export default Vue.extend({ 
  data() {
    return {
      jobs: [], //? 案件一覧配列
      jobsNullFlag: false, //? 案件が存在しない場合 表示のため
      selectedLang: [], //? 言語 v-model
      languages: [], //? 言語取得
      selectedFramework: [], //? フレームワーク v-model
      frameworks: [],//? フレームワーク取得
      selectedSkill: [], //? その他スキル v-model
      skills: [], //? その他スキル取得
      freeWord: this.$store.state.search.freeWord, 
      loading: true, 
      jobDetail: null, //? 案件詳細 
      detailFlag: false, //? 案件詳細を表示するためのフラグ
      selfJobPost: false, //? 自分の案件かを判定
      selfJob: null,  //? 自分の案件を格納する
      applyFlug: true, //?応募済みかの判定フラグ
      id: Number, //? clickした案件のIdを取得
      modal: false, //?モーダルを開いてるか否か
      saveFlag: true, //? 案件保存しているかを判定
      limitationList:1,
      userId: this.$store.state.auth.userId, 
      entryRedirect: false, //? 非ログイン時にエントリー押下後 登録にリダイレクトするためのフラグ
      langModal: false, //? 言語モーダル
      frameworkModal: false, //? フレームワークモーダル
      skillModal: false, //? その他スキルモーダル
      buttonActive: false, //? 右側浮いてるボタン
      username: 'Helloaaaaaaaaaaa'
    }
  },
  filters: {
    // * date型を文字に変換
    moment(value, format) {
      return moment(value).format(format);
    },
  },
  computed: {
    //* 案件タイトル 詳細 文字制限
    detailJobTitle: function () {
      if(this.jobDetail) {
        if(this.jobDetail.jobTitle.length > 60) {
          return this.jobDetail.jobTitle.substring(0,60) + '...';
        }
        return this.jobDetail.jobTitle;
      }

      return "";
    }
  },
  created() {
    // * 投稿一覧取得
    const posts = [];
    axios.get('http://localhost:8888/api/v1/job', {
      // headers: {
      //   Authorization: `Bearer ${ localStorage.userId }`
      // }
    })
    .then(response => {
      setTimeout(() => {
        this.loading = false;
        this.jobs = response.data
        //* トップページから フリーワード 検索をした際の処理
        for(const i in response.data){
          const jobs = response.data[i];
          if(jobs.jobDescription.indexOf(this.freeWord) !== -1){
            posts.push(jobs)
          }
        }
        this.jobs = posts
        // * トップページから 開発言語 検索した際の処理
        // if(!this.$store.state.search.language) {
        //   console.log("language はnullです")
        // }
        // else {
        //   const arrayLanguagekNum = [];
        //   const languageNum = this.$store.state.search.language;
        //   for(let s = 0; s < languageNum.length; s++) {
        //     const languageNumParams = languageNum[s]
        //     this.selectedLang.push(languageNumParams)
        //     const queryParamsLanguage =  'programing_framework_id' + '[' + Number(languageNumParams - 1) + ']' + '=' + languageNumParams + '&';
        //     arrayLanguagekNum.push(queryParamsLanguage)
        //   }
        //   const LastLanguageNum = arrayLanguagekNum.join('');
        //   axios.get(`http://localhost:8888/api/v1/job/?${LastLanguageNum}`)
        //   .then(response => {
        //     this.jobs = response.data
        //     if(this.jobs.length == 0) {
        //       this.jobsNullFlag = true;
        //     }
        //   })
        //   // * もし案件が存在しなかったら処理が走る
        //   if(!this.jobs.length) {
        //     this.jobsNullFlag = true;
        //   }
        // }
        // // * トップページから フレームワーク 検索した際の処理
        // if(!this.$store.state.search.framwork) {
        //   console.log("framwork はnullです")
        // }
        // else {
        //   const arrayFrameworkNum = [];
        //   const framworkNum = this.$store.state.search.framwork;
        //   for(let k = 0; k < framworkNum.length; k++) {
        //     const framworkNumParams = framworkNum[k]
        //     this.selectedFramework.push(framworkNumParams)
        //     const queryParams =  'programing_framework_id' + '[' + Number(framworkNumParams - 1) + ']' + '=' + framworkNumParams + '&';
        //     arrayFrameworkNum.push(queryParams)
        //   }
        //   const LastFrameworkNum = arrayFrameworkNum.join('');
        //   axios.get(`http://localhost:8888/api/v1/job/?${LastFrameworkNum}`)
        //   .then(response => {
        //     this.jobs = response.data
        //     if(this.jobs.length == 0) {
        //       this.jobsNullFlag = true;
        //     }
        //   })
        // }
        // // * トップページから その他スキル 検索した際の処理
        // if(!this.$store.state.search.skill) {
        //   console.log("skill はnullです")
        // }
        // else {
        //   const arraySkillNum = [];
        //   const skillNum = this.$store.state.search.skill;
        //   for(let l = 0; l < skillNum.length; l++) {
        //     const skillNumParams = skillNum[l]
        //     this.selectedSkill.push(skillNumParams)
        //     const queryParamsSkill = 'skill_id' + '[' + Number(skillNumParams - 1) + ']' + '=' + skillNumParams + '&';
        //     arraySkillNum.push(queryParamsSkill)
        //   }
        //   const LastSkillNum = arraySkillNum.join('');
        //   axios.get(`http://localhost:8888/api/v1/job/?${LastSkillNum}`)
        //   .then(response => {
        //     this.jobs = response.data
        //     if(this.jobs.length == 0) {
        //       this.jobsNullFlag = true;
        //     }
        //   })
        // }
        // // * もし案件が存在しなかったら処理が走る
        // if(!this.jobs.length) {
        //   this.jobsNullFlag = true;
        // }
      }, 2000);
    })
    .catch(error => {
      console.log(error)
    })
    // * プログラミング言語 取得
    axios.get('http://localhost:8888/api/v1/programing_language')
      .then(response => {
          this.languages = response.data
      })
    // * フレームワーク取得
    axios.get('http://localhost:8888/api/v1/programing_framework')
      .then(response => {
          this.frameworks = response.data
      })
    // * フレームワーク取得
    axios.get('http://localhost:8888/api/v1/skill')
      .then(response => {
          this.skills = response.data
      })
    // * 非ログイン時は応募/いいねを押下した際にリダイレクトでログインに遷移させる
    if(!this.userId) {
      this.entryRedirect = true //* 非ログイン時表示に
    }
  },
  methods: {
    // * 非ログイン時 登録リダイレクト
    registerRedirect() {
      this.$router.push('/register');
    },
    // * 開発言語検索
    searchLanguage() {
      const array = [];
      const languageState = []; //? Stateにフレームワークを複数いれるための配列
      const params = {
        language: this.selectedLang,
      }
      for(let i =0; i < params.language.length; i++) {
        const languageParams = params.language[i];
        languageState.push(languageParams)
        const queryParams =  'programing_language_id' + '[' + Number(languageParams - 1) + ']' + '=' + languageParams + '&';
        array.push(queryParams)
      }
      const languageStateEnd = languageState.slice(0)
      const result = array.join('');
      // console.log( result );
        axios.get(`http://localhost:8888/api/v1/job/?${result}`)
        .then(response => {
          this.jobs = response.data
          this.langModal = false
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.jobsNullFlag = false; //? 案件が存在しない際のフラグをFalseに
            this.detailFlag = false; //? 右側案件詳細を閉じる

            // * 言語 検索語 Vuexに値を格納する
            this.$store.dispatch('languageSearch', {
              language: languageStateEnd,
            })
            // * 言語が１つも選択されていない時の処理
            if(params.language.length == 0 ) {
              this.$store.dispatch('languageSearch', {
                language: null,
              })
            }
            // * もし案件が存在しなかったら処理が走る
            if(!this.jobs.length) {
              this.jobsNullFlag = true;
            }
          }, 1500)
        })
    },
    // * フレームワーク検索
    searchFramework() {
      const arrayFramework = [];
      const frameworkState = []; //? Stateにフレームワークを複数いれるための配列
      const params = {
        framework: this.selectedFramework,
      }
      for(let i =0; i < params.framework.length; i++) {
        const frameworkParams = params.framework[i];
        frameworkState.push(frameworkParams)
        const queryParams =  'programing_framework_id' + '[' + Number(frameworkParams - 1) + ']' + '=' + frameworkParams + '&';
        arrayFramework.push(queryParams)
      }
      const frameworkStateEnd = frameworkState.slice(0)
      const result = arrayFramework.join('');
        axios.get(`http://localhost:8888/api/v1/job/?${result}`)
        .then(response => {
          this.jobs = response.data
          this.frameworkModal = false
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.jobsNullFlag = false; //? 案件が存在しない際のフラグをFalseに
            this.detailFlag = false; //? 右側案件詳細を閉じる

            // * フレームワーク 検索語 Vuexに値を格納する
            this.$store.dispatch('framworkSearch', {
              framwork: frameworkStateEnd,
            })
            // * フレームワークが１つも選択されていない時の処理
            if(params.framework.length == 0 ) {
              this.$store.dispatch('framworkSearch', {
                framwork: null,
              })
            }
            // * もし案件が存在しなかったら処理が走る
            if(!this.jobs.length) {
              this.jobsNullFlag = true;
            }
          }, 1500)
        })
    },
    // * その他スキル 検索
    searchSkill() {
      this.loading = false;
      const arraySkill = [];
      const skillState = []; //? Stateにその他スキルを複数いれるための配列
      const params = {
        skill: this.selectedSkill,
      }
      for(let i =0; i < params.skill.length; i++) {
        const skillParams = params.skill[i];
        skillState.push(skillParams)
        const queryParams =  'skill_id' + '[' + Number(skillParams - 1) + ']' + '=' + skillParams + '&';
        arraySkill.push(queryParams)
      }
      const skillStateEnd = skillState.slice(0)
      const result = arraySkill.join('');
        axios.get(`http://localhost:8888/api/v1/job/?${result}`)
        .then(response => {
          this.jobs = response.data
          this.skillModal = false
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.jobsNullFlag = false; //? 案件が存在しない際のフラグをFalseに
            this.detailFlag = false; //? 右側案件詳細を閉じる

            // * その他スキル 検索語 Vuexに値を格納する
            this.$store.dispatch('skillSearch', {
              skill: skillStateEnd,
            })
            // * その他スキルが１つも選択されていない時の処理
            if(params.skill.length == 0 ) {
              this.$store.dispatch('skillSearch', {
                skill: null,
              })
            }
            // * もし案件が存在しなかったら処理が走る
            if(!this.jobs.length) {
              this.jobsNullFlag = true;
            }
          }, 1500)
        })
    },
    // * フリーワード 検索
    searchFreeword() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        const posts = [];
        axios.get('http://localhost:8888/api/v1/job')
        .then(response => {
          for(const i in response.data){
            const jobs = response.data[i];
            if(jobs.jobDescription.indexOf(this.freeWord) !== -1){
              posts.push(jobs)
            }
          }
          // * フリーワード 検索語 Vuexに値を格納する
          this.$store.dispatch('freeWordSearch', {
            freeWord: this.freeWord,
          })
          this.jobs = posts;
          this.jobsNullFlag = false; //? 案件が存在しない際のフラグをFalseに
          this.detailFlag = false; //? 右側案件詳細を閉じる
          // * もし案件が存在しなかったら処理が走る
          if(!this.jobs.length) {
            this.jobsNullFlag = true;
          }
        })
      }, 1000);
    },
    // * 案件を保存する
    saveJob() {
      const params = {
        jobId: this.jobDetail.id, 
        userId: 1 
      };
      axios.post(`${this.$baseURL}/favorite_job/`, params)
      .then(response => {
        this.saveFlag = false
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    },
    // * 案件保存を削除する
    deleteJob() {
      const params = {
        jobId: this.jobDetail.id,
        userId: 1
      };
      axios.delete(`${this.$baseURL}/favorite_job/`,{data: params})
      .then(response => {
        this.saveFlag = true
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    // * click して案件を取得 === 詳細
    getJob(job) {
      this.jobDetail = job; //? clickした案件を取得
      this.detailFlag = true; //? 詳細画面を表示するか否かを判定する
      this.id = job.id;  //? clickしたIdを this.idに格納する
      this.selfJobPost = false; //? clickする度に 自分の案件では無くする
      this.applyFlug = true; //? clickする度に 応募済み案件にする
      // * ログインしていれば以下の処理が走る
      if(this.userId) {
        // * 自分の案件かを判定
        axios.get(`http://localhost:8888/api/v1//job/?user_id=${ this.userId }`)
        .then(response => {
          for(let i = 0; i < response.data.length; i++) {
            this.selfJob = response.data[i]
            if(this.selfJob.id === this.id) {
              this.selfJobPost = true
            }
          }
        })
          // * 応募済みか応募済みでないかを判断
        axios.get(`http://localhost:8888/api/v1/apply_job/?user_id=${ this.userId }`)
        .then(response => {
          const arrayApply = []
          for(let c = 0; c < response.data.length; c++){
            const applyData = response.data[c];
            arrayApply.push(applyData.job.id)
          }
          if(arrayApply.includes(this.jobDetail.id)) {
            this.applyFlug = false
          } 
        })
          // * 保存済みか保存済みではないかを判定する
        axios.get(`http://localhost:8888/api/v1/favorite_job/?user_id=${ this.userId }`)
        .then(response => {
          const array = []
          for(let i = 0; i < response.data.length; i++){
            const likeData = response.data[i]
            array.push(likeData.job.id)
          }
          if(array.includes(this.jobDetail.id)){
            this.saveFlag = false
          }
          else{
            this.saveFlag = true
          }
        })
      } 
      
      // * 登録 or ログインしてない場合
      else {
        console.log("登録してからご利用いただけます")
      }
    },

    // * エントリーが完了したら応募済みにする
    compliteEntry() {
      this.applyFlug = false;
    },
    
    // * モーダル
    openModal() {
      this.modal = true
    },
    closeModal() {
      this.modal = false
    },
    doSend() {
      this.closeModal()
    },
    // *検索 モーダル
    // ? 開発言語モーダル
    langSearchModal() {
      this.langModal = true;
    },
    closeLangSearchModal() {
      this.langModal = false;
    },
    // ? 開発フレームワークモーダル
    frameworkSearchModal() {
      this.frameworkModal = true;
    },
    closeFrameworkSearchModal() {
      this.frameworkModal = false;
    },
    // ? その他スキルモーダル
    skillSearchModal() {
      this.skillModal = true;
    },
    closeSkillSearchModal() {
      this.skillModal = false;
    },
    // * トップに行く
    scrollTop() {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
    },
    // * 100 を超えたらボタンを表示
    scrollWindow() {
      const top = 100 // ? ボタンを表示させたい位置
      this.scroll = window.scrollY
      if (top <= this.scroll) {
        this.buttonActive = true
      } else {
        this.buttonActive = false
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollWindow) //?ボタンを表示させたい位置
  },
  components: {
    Loading,
    Applybtn,
    ApplyModal,
    JobRegisterFalse,
    CardJob,
    LanguageSearchModal,
    FrameworkSearchModal,
    SkillSearchModal
  },
});
</script>

<style lang="scss" scoped>
.job-cards.sample-active {
  border-bottom: 4px solid #ff0800;
  font-weight: bold;
}

.className {
  background-color: red;
}

// * 詳細検索 
.search-area {
  width: calc(100% - 6rem);
  height: 48px;
  background-color: $basic-white;
  position: absolute;
  top: 0;
  position: sticky;
  z-index: 1;
  box-shadow: 0 2px 3px 0px rgb(197, 197, 197);
  text-align: left;
  padding: 0 3rem;
  display: inline-block;

  &__modal-btn {
    @include card-border-color;
    color: $text-sub-color;
    background-color: $basic-white;
    margin-top: 0.4rem;
    padding: 0.5rem 1.5rem;
    border-radius: 50rem;
    cursor: pointer;
    font-weight: bold;
    margin-left: 0.7rem;
    transition: .3s;
    outline: none;

    &:hover {
      @include primary-border_color;
      color: $primary-color;
      transition: .3s;
    }
  }

  &__freewrod {
    @include input-border-color;
    color: $text-main-color;
    font: 16px/24px sans-serif;
    box-sizing: border-box;
    transition: 0.3s;
    letter-spacing: 1px;
    border-radius: 4px;
    width: 28%;
    margin-top: 0.23rem;
    // border: solid 1px #E0E0E0;
    background-color: #E0E0E0;
    border-radius: 50rem;
    padding: 0.5rem 1rem;
    position: absolute;
    right: 0;
    margin-right: 4rem;
    border: none;
    outline: none;

    &:focus {
      @include form-hover;
    }
  }
}

//* 全体 
.job-wrapper {
  width: 100%;
  margin: 0 auto;
  padding: 0rem 0 2rem 0;
  position: relative;

  // * スクロール
  .scroll-area {
    width: 50px;
    height: 50px;
    position: fixed;
    right: 0;
    bottom: 0;
    background: #2196F3;
    opacity: 0.6;
    border-radius: 50%;
    margin-right: 20px;
    margin-bottom: 20px;
    z-index: 100;

    a {
      position: relative;
      display: block;
      width: 50px;
      height: 50px;
      text-decoration: none;

      .icon {
        color: #ffffff;
        margin-top: 0.7rem;
        font-size: 1.6em;
      }
    }

    a::before{
      font-weight: 900;
      font-size: 25px;
      color: #fff;
      position: absolute;
      width: 25px;
      height: 25px;
      top: -5px;
      bottom: 0;
      right: 0;
      left: 0;
      margin: auto;
      text-align: center;
    }
  }
  // * ふわっと表示 右側ボタン
  .button-enter-active,
  .button-leave-active {
    transition: opacity 0.5s;
  }
  .button-enter,
  .button-leave-to {
    opacity: 0;
  }

  // * 案件中央
  .job-wrapper-center {
    width: 90%;
    margin: 0 auto;
    position: relative;

    .router :hover {
      background-color: #2195f310;
      border: 1px solid $primary-color;
      box-shadow: 0 15px 30px -5px #2195f32d, 0 0 5px #2195f357;
      transform: translateY(-2px);
      cursor: pointer;
    }
  }
}

// * 案件詳細画面 
.job-wrapper-right {
  width: 52%;
  height: 88vh;
  margin-left: 2rem;
  margin-top: 1rem;
  background-color: $basic-white;
  position: sticky;
  display: inline-block;
  margin-bottom: 0.2rem;
  bottom: 0;
  border-radius: 8px;
  color: #111111;
  border: solid 1px $card-border-color;
  text-align: left;

  .top-job-detail-area {
    width: calc(100% - 4rem);
    border-bottom: solid 1px $card-border-color;
    font-weight: bold;
    padding: 1.5rem 2rem 1rem 2rem;
    box-shadow: 0 3px 3px -2px rgba(3, 29, 41, 0.15);

    &__title {
      width: 100%;
      height: 50%;
      font-size: 1.2em;
    }

    .top-job-detail-bottom {
      width: 100%;
      height: 65%;
      display: inline-block;
      position: relative;
      margin-top: 0.8rem;
    }
  }
}

.btn-box-save {
  display: inline-block;
  height: calc(100% - 1rem);
  padding: 0.3rem 0 0 1.2rem;
  position: absolute;
  top: 0;
}

.job-wrapper-right .main-job-detail-area {
  width: calc(100% - 4rem);
  height: calc(79% - 1rem);
  overflow: auto;
  padding: 0 2rem 1rem 2rem;
  position: relative;

  .tag-area {
    font-weight: bold;
    margin: 1rem 0 0.5rem 0;
    font-size: 1em;

    .icon {
      color: $primary-color;
    }
  }
}
/* スクロールの幅の設定 */
.job-wrapper-right .main-job-detail-area::-webkit-scrollbar {
  width: 7px;
}

/* スクロールの背景の設定 */
.job-wrapper-right .main-job-detail-area::-webkit-scrollbar-track {
  border-radius: 5px;
}

/* スクロールのつまみ部分の設定 */
.job-wrapper-right .main-job-detail-area::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: $sub-white;
}

.post-user-area {
  line-height: 1.8;
  font-size: 14px;
}

.jobDetail-time-area {
  margin-top: 1rem;
  font-size: 12px;
  color: #7c7c7c;
  float: right;
}

.post-user-name-area {
  line-height: 1.8;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 0.3rem;

  &:hover {
    color: $primary-color;
    transition: .3s;
  }
}

.detail-langage {
  @include border_language;
  color: $language-color;
  margin: 0 0px 0px 5px;
  text-align: left;
  display: inline-block;
  font-size: 14px;
  padding: 2px 23px;
  border-radius: 5px / 5px;
  font-weight: bold;
  pointer-events: none;
}

.detail-framework {
  @include border_framework;
  margin: 0px 0px 0 5px;
  text-align: left;
  display: inline-block;
  color: $framework-color;
  font-size: 14px;
  padding: 2px 23px;
  border-radius: 5px / 5px;
  font-weight: bold;
  pointer-events: none;
}

.detail-skill {
  @include border-skill;
  color: $skill-color;
  margin: 0px 0px 0 5px;
  text-align: left;
  display: inline-block;
  font-size: 14px;
  padding: 2px 23px;
  border-radius: 5px / 5px;
  font-weight: bold;
  pointer-events: none;
}

// * 管理画面遷移ボタン
.btn-box-manage {
  @include blue-btn;
  @include box-shadow-btn;
  padding: 0.75rem 3rem;
  border-radius: 8px;
  font-weight: 600;
  color: #fff;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  font-size: 1.1em;
  display: inline-block;
  cursor: pointer;
  border: none;
  margin-top: 4px;
  color: #F8FAFF;
  appearance: none;
  border: none;
  outline: none;
}

// * 応募するボタン 
.btn-box-apply {
  @include red-btn;
  @include box-shadow-btn;
  padding: 0.75rem 3rem;
  border-radius: 8px;
  font-weight: 600;
  color: #fff;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  font-size: 1.1em;
  display: inline-block;
  cursor: pointer;
  border: none;
  margin-top: 4px;
  appearance: none;
  border: none;
  transition: .3s;
  outline: none;

  &:hover {
    @include red-btn-hover;
  }
}

// * 応募済みボタン 
.btn-box-apply-false {
  @include grey-btn;
  display: block;
  padding: 0.75rem 3rem;
  border-radius: 8px;
  font-weight: 600;
  color: $basic-white;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin: auto;
  margin-top: 4px;
  font-size: 1.1em;
  display: inline-block;
}

// * モーダル内のキャンセルボタン 
.modal-btn {
  @include blue-btn;
  @include box-shadow-btn;
  padding: 1rem 2.4rem;
  border-radius: 50px;
  font-weight: 600;
  color: $basic-white;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin-left: 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
  outline: none;
}

// * 保存アイコン 
.save-icon {
  font-size: 30px;
  padding: 10px;
  width: 20px;
  height: 20px;
  color: $basic-white;
  cursor: pointer;
  background-color: #d8d6d6;
  border-radius: 5px / 5px;
}

.save-end-icon {
  font-size: 30px;
  padding: 10px;
  width: 20px;
  height: 20px;
  color: red;
  cursor: pointer;
  background-color: #d8d6d6;
  border-radius: 5px / 5px;
}

// * 右側 詳細を表示しない際に 
.job-wrapper-right-false {
  width: 52%;
  // height: 40vh;
  float: right;
  position: sticky;
  // display: inline-block;
  margin-left: 2rem;
  margin-bottom: 0.2rem;
  // bottom: 0;
  top: 0;
  border-radius: 8px;
  color: $text-main-color;
  text-align: left;
}

// * 案件カード側 
.job-wrapper-left {
  width: 43%;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  display: inline-block;
  margin-top: 1rem;
}
.job-wrapper-left-false {
  width: 43%;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  display: inline-block;
  margin-top: 15rem;
}

.label-lang {
  font-weight: bold;
  font-size: 1.5em;
  color: #111111;
}

.round {
  text-align: left;
  width: 24%;
  margin-right: 0.3rem;
  display: inline-block;
  position: relative;
  margin-bottom: 2rem;
}
.round-skill {
  text-align: left;
  width: 22%;
  margin-right: 0.2rem;
  display: inline-block;
  position: relative;
  margin-bottom: 2rem;
}

input[type="checkbox"] {
  background-color: $basic-white;
  border: 1px solid #ccc;
  border-radius: 80%;
  cursor: pointer;
  height: 28px;
  width: 22px;
}

label.checkbox {
  position: absolute;
  top: 0;
  margin-top: 0.37rem;
  color: #111111;
  margin-left: 0.4rem;
  font-size: 14px;
}

.serach-btn {
  @include blue-btn;
  display: block;
  width: 77%;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  color: $basic-white;
  line-height: 1;
  text-align: center;
  margin: auto;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 0px 5px 2px #d4d4d4;
  transition: .3s;
}

.router-1 {
  display: none;
}

@media screen and (max-width: 1289px) {
  .job-wrapper .job-wrapper-center {
    width: 95%;
  }

  .job-wrapper-right {
    margin-left: 0.5rem;
  }
}

@media screen and (max-width: 999px) {
  .search-area {
    overflow-x: auto;
    width: 100%;
    padding: 0;
  }
  // * 右側案件をdisplaynone 
  .job-wrapper-right {
    display: none;
  }

  .router-1 {
    display: block;
  }

  .job-wrapper-left, .job-wrapper-right-false {
    display: none;
  }

  .job-wrapper-left {
    width: 90%;
  }

  .job-wrapper .job-wrapper-center {
    width: 80%;
  }
}

@media screen and (max-width: 700px) {
  .search-area .search-freewrod-box {
    position: relative;
    padding: 0.4rem 1rem;
    margin-left: 0.5rem;
    margin-right: 0;
    width: 40%;
  }
  .job-wrapper-left {
    width: 100%;
  }

  .job-wrapper .job-wrapper-center {
    width: 80%;
  }
}

@media screen and (max-width: 580px) {
  .job-wrapper-left {
    width: 100%;
  }

  .job-wrapper .job-wrapper-center {
    width: 95%;
  }

  .search-area {
    white-space: nowrap;
  }
}
</style>
