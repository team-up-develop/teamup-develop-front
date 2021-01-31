<script lang="ts">
import Loading from '@/components/Organisms/Commons/Loading/Loading.vue'
import Vue from 'vue';

export default Vue.extend({
  components: {
    Loading
  },
  data() {
    return {
      loading: true, 
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000)
  }
});
</script>


<template>
  <section>
    <div class="wrapper" v-show="!loading">
      <div class="container">
        <div class="top-area">
          <div class="top-area__left">
            <div class="top-title">
              <span>チーム開発で誰にも負けないスキルを</span>
              <p>
                本気でキャリアを変えようと努力している未経験エンジニア同士が
                オンラインでの「チーム開発」を通じて相互に成長し、
                エンジニアとしてスタートを切る。
              </p>
            </div>
            <div class="top-btn">
              <button class="login">ログインする</button>
              <button class="register">登録する</button>
            </div>
          </div>
          <div class="top-area__right">
            <img class="img" src="@/assets/images/teamup.jpg" width="100%" height="350px"/> 
          </div>
        </div>
        <div class="middle-area">
          <div class="middle-titlle">
            チームアップが可能にすること
          </div>
          <div class="middle-btn-area">
            <div class="middle-btn">
              <button class="login">ログインする</button>
              <button class="register">登録する</button>
            </div>
          </div>
        </div>
        <div class="bottom-area">
          <div class="bottom-title">
            チームアップはスキルアップの手助けをします
          </div>
          <div class="bottom_contents">
            <div class="bottom_contents_left">
              <div class="bottom_contents_left__top">
                <h3>チームの『知』を自分の『知』にできる</h3>
              </div>
              <div class="bottom_contents_left__upper">
                <p>個人で得る情報には、偏りがまれやすい。
                    しかし、チーム開発を行うことで、<br>その偏りを技ない、知識の幅を広げることができる。<br>
                    チーム内の誰かが発した聞きなれない聞き慣れないワードは,<br>やがて自分の『知』となり<br>
                    チーム内の誰かが取り入れた見慣れない方法はやがて自分の『知』となる。</p>
              </div>
              <div class="bottom_contents_left__top">
                <h3>チームの『知』を自分の『知』にできる</h3>
              </div>
              <div class="bottom_contents_left__upper">
                <p>個人で得る情報には、偏りがまれやすい。
                    しかし、チーム開発を行うことで、その偏りを技ない、知識の幅を広げることができる。
                    チーム内の誰かが発した聞きなれない聞き慣れないワードはやがて自分の『知』』となり
                    チーム内の誰かが取り入れた見慣れない方法はやがて自分の『知』となる。</p>
              </div>
              <div class="bottom_contents_left__top">
                <h3>チームの『知』を自分の『知』にできる</h3>
              </div>
              <div class="bottom_contents_left__upper">
                <p>個人で得る情報には、偏りがまれやすい。
                しかし、チーム開発を行うことで、その偏りを技ない、知識の幅を広げることができる。
                チーム内の誰かが発した聞きなれない聞き慣れないワードは<br>やがて自分の『知』』となり
                チーム内の誰かが取り入れた見慣れない方法はやがて自分の『知』となる。</p>
              </div>
            </div>
            <div class="bottom_contents_right">

            </div>
          </div>
        </div>
        <div class="image">
          <div class="image_inner">
            <p>チームアップはスキル向上の手助けをします</p>
          </div>
        </div>
      </div>
    </div>
    <Loading v-show="loading">
    </Loading>
  </section>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';


// * 背景 波 
//.bc-image {
//  background-image: url('data:image/svg+xml;charset=utf8,%20%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201440%20320%22%3E%20%3Cpath%20fill%3D%22%232196F3%22%20fill-opacity%3D%221%22%20d%3D%22M0%2C64L48%2C90.7C96%2C117%2C192%2C171%2C288%2C186.7C384%2C203%2C480%2C181%2C576%2C154.7C672%2C128%2C768%2C96%2C864%2C85.3C960%2C75%2C1056%2C85%2C1152%2C106.7C1248%2C128%2C1344%2C160%2C1392%2C176L1440%2C192L1440%2C320L1392%2C320C1344%2C320%2C1248%2C320%2C1152%2C320C1056%2C320%2C960%2C320%2C864%2C320C768%2C320%2C672%2C320%2C576%2C320C480%2C320%2C384%2C320%2C288%2C320C192%2C320%2C96%2C320%2C48%2C320L0%2C320Z%22%3E%3C%2Fpath%3E%20%3C%2Fsvg%3E');
//  background-repeat: no-repeat;
//  background-position: center;
//  height: 450px;
//  z-index: -10;
//}

  .wrapper {
    width: 100%;

    .container {
      width: 90%;
      margin: 0 auto;

      // * トップ エリア
      .top-area {
        height: 60vh;
        width: 100%;
        margin-top: 2rem;
        position: relative;

        &__left {
          padding: 2rem 0 2rem 0;
          width: 50%;
          height: calc(100% - 5rem);
          // background-color: rgb(175, 175, 175);
          position: absolute;
          left: 0;
          top: 0;

          .top-title {
            text-align: left;
            height: 50%;
            line-height: 1.8;

            span {
              background: -webkit-linear-gradient(0deg, #1142e2, #19bde6);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              font-weight: bold;
              font-size: 2em;
            }

            p {
              margin-top: 2rem;
              font-weight: bold;
            }
          }

          .top-btn {
            width: 430px;
            height: 30%;
            margin: 3rem auto;
            position: relative;
            // background-color: yellowgreen;

            .login {
              border: solid 1px #2196F3;
              color: #2196F3;
              background-color: #ffffff;
              text-align: left;
              display: block;
              padding: 1.1rem 3rem;
              border-radius: 8px;
              font-size: .875rem;
              font-weight: 600;
              line-height: 1;
              text-align: center;
              max-width: 280px;
              margin: auto;
              font-size: 1rem;
              float: right;
              cursor: pointer;
              transition: .3s;
              outline: none;
              position: absolute;
              right: 0;
              bottom: 0;
            }

            .register {
              //@include purple-btn;
              background-color:  #1f23ff;
              text-align: left;
              display: block;
              padding: 1.1rem 4rem;
              border-radius: 8px;
              border: none;
              font-size: .875rem;
              font-weight: 600;
              color: $white;
              line-height: 1;
              text-align: center;
              max-width: 280px;
              margin: auto;
              font-size: 1rem;
              float: right;
              cursor: pointer;
              transition: .3s;
              outline: none;
              position: absolute;
              left: 0;
              bottom: 0;
            }
          }
        }
        
        &__right {
          width: 50%;
          height: 100%;
          // background-color: rgba(204, 52, 52, 0.739);
          position: absolute;
          right: 0;
          top: 0;
        }
      }
      //* できることエリア
      .middle-area {
        width: 100%;
        .middle-titlle {
          font-weight: bold;
          font-size: 2em;
          }

        .middle-btn-area{
          width: 100%;
          height: 15vh;
          margin: 5rem auto;
          position: relative;
          background-color: rgba(6, 6, 129, 0.788);
          
        
          .middle-btn{
            width: 430px;
            height:100px;
            position:  relative; 
            margin:  auto;
            
          

            .login {
              border: solid 1px #2196F3;
              color: #2196F3;
              background-color: #ffffff;
              text-align: left;
              display: block;
              padding: 1.1rem 3rem;
              border-radius: 50px;
              font-size: .875rem;
              font-weight: 600;
              line-height: 1;
              text-align: center;
              max-width: 280px;
              margin: 1rem auto;
              font-size: 1rem;
              float: right;
              cursor: pointer;
              transition: .3s;
              outline: none;
              position: absolute;
              right: 0;
              bottom: 0;
            }
            .register {
              //@include purple-btn;
              background-color:  #1f22f3;
              text-align: left;
              display: block;
              padding: 1.1rem 4rem;
              border-radius: 50px;
              border: none;
              font-size: .875rem;
              font-weight: 600;
              color: $white;
              line-height: 1;
              text-align: center;
              max-width: 280px;
              margin: 1rem auto;
              font-size: 1rem;
              float: right;
              cursor: pointer;
              transition: .3s;
              outline: none;
              position: absolute;
              left: 0;
              bottom: 0;
              }
            }  
          }
      }

      .bottom-area{
        position:  relative; 
        margin-top: 150px;
        //background-color: burlywood;
      
        .bottom-title{
          font-weight: bold;
          font-size: 2em;
        }
        
        .bottom_contents{
          position:  relative; 
          height: 100vh;
          margin-top: 4rem;
        
          .bottom_contents_left{
            position:absolute;
            //background-color: pink;
            width: 50%;
            float:left;
            left: 0;

            .bottom_contents_left__top{
              //background-color:coral;
              float: left;
              margin-top: 1rem;
            }

            .bottom_contents_left__upper{
              //background-color: crimson;
            // margin-top:1rem;
              float:left;
              text-align: left;
              margin: 1rem 0;
            }
            
            h3{
              color: #2196F3;
            }

            p {
              margin-top: 1rem;
            }
            
          }

          .bottom_contents_right{
            //background-color: yellow;
            height: 300px;
            width: 50%;
            float: right;
            position:absolute;
            right:0;
            }
          }
        }
      
      .image_inner{
        background-color: navy;
        height: 30vh;
        width: 100%;
      }
    }
  }


@media screen and (max-width: 1100px) {
  .wrapper {
    width: 100%;
    .container {
      width: calc(100% - 0rem);
      //padding: 2.5rem 0rem;
    }
  }
}

/* タブレット */
@media (max-width: 900px) {
  .wrapper 
  .container {
    width: 100%;
  }
}
</style>