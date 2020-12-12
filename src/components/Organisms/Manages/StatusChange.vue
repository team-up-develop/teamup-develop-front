<script>
// FIXME: 使用していない
import axios from 'axios';
export default {
  props: {
    applyUsers: null,
    id: Number
  },
  data() {
    return {
      statusChangeUser: [], //? ステータスの変更ユーザー
      jobTitle: "", //? 案件タイトル
      message: "Emit"
    }
  },
  filters: {
    //* 案件タイトル 詳細 文字制限
    truncateDetailTitle: function(value) {
      const length = 60;
      const ommision = "...";
      if (value.length <= length) {
        return value;
      }
      return value.substring(0, length) + ommision;
    },
  },
  created() {
    this.applyUsersNum = this.applyUsers.length
    //* 案件タイトルを取得する
    axios.get(`http://localhost:8888/api/v1/apply_job/?job_id=${this.id}`)
    .then(response => {
      const job = response.data[0];
      // console.log(job.job.jobTitle)
      this.jobTitle = job.job.jobTitle;
    })
  },
  methods: {
    // * 参加させる
    applyUserPut() {
      const params = {
        jobId: 1,
        userId: this.statusChangeUser,
        applyStatusId: 2
      };
      axios.put(`${this.$baseURL}/apply_job/`, params)
      .then(response => {
        console.log(response.data)
        this.$emit('compliteAssgin', this.message)
      })
      .catch(error => {
        console.log(error)
      })
    },
    // * 拒否する
    applyUserReject() {
      const params = {
        jobId: 1,
        userId: this.statusChangeUser,
        applyStatusId: 3
      };
      axios.put(`${this.$baseURL}/apply_job/`, params)
      .then(response => {
        console.log(response.data)
        this.$emit('compliteReject', this.message)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
}
</script>

<template>
  <div class="job-status-change-area">
    <div class="status-change-top">
      <router-link :to="`/manage/job/${ this.id }`" class="router">
      {{ jobTitle | truncateDetailTitle }}
      </router-link>
    </div>
    <div class="status-change-left">
      <label for="" class="label">応募者選択</label>
      <div class="cp_ipselect cp_sl02">
        <select required v-model="statusChangeUser">
          <option v-for="user in applyUsers" v-bind:value="user.user.id " v-bind:key="user.user.id">
            {{ user.user.userName }}
          </option>
        </select>
      </div>
    </div>
    <div class="status-change-right">
      <button class="permit-btn" @click="applyUserPut">参加させる</button>
      <button class="reject-btn" @click="applyUserReject">落選させる</button>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.router {
  text-decoration: none;
  color: $basic-white;
}

/* ステータス変更 */
.job-status-change-area {
  // min-width : 950px;
  @include card-border-color;
  width: 95%;
  height: 20%;
  border-radius: 20px;
  margin: 2rem 2rem 2rem 2rem;
  background-color: $basic-white;
  float: right;
  position: relative;
}

.status-change-top {
  @include box-shadow-manage;
  width: 100%;
  height: 10%;
  padding: 0.8rem 0;
  border-radius: 15px 15px 0px 0;
  background-color: $secondary-color;
  color: $basic-white;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}

.status-change-left {
  width: 30%;
  height: 40%;
  padding: 1rem 2rem;
  text-align: left;
}

.label {
  font-weight: bold;
}

.status-change-right {
  width: 360px;
  height: 30%;
  padding-top: 4.6rem;
  padding-right: 2rem;
  position: absolute;
  right: 0;
  top: 0;
}

.permit-btn {
  @include red-btn ;
  @include box-shadow-btn ;
  padding: 1rem 2.4rem;
  border-radius: 50px;
  font-weight: 600;
  color: $basic-white;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  font-size: 1rem;
  display: inline-block;
  cursor: pointer;
  border: none;
  outline: none;
}

.reject-btn {
  @include blue-btn ;
  @include box-shadow-btn ;
  padding: 1rem 2.4rem;
  border-radius: 50px;
  font-weight: 600;
  color: $basic-white;
  line-height: 1;
  text-align: center;
  max-width: 280px;
  margin-left: 1.2rem;
  font-size: 1rem;
  float: right;
  cursor: pointer;
  border: none;
  outline: none;
}

/* セレクトボックス */
.cp_ipselect {
  overflow: hidden;
  width: 90%;
  margin: 0.2em 0;
  text-align: center;

  select {
    width: 100%;
    padding-right: 1em;
    cursor: pointer;
    text-indent: 0.01px;
    text-overflow: ellipsis;
    border: none;
    outline: none;
    background: transparent;
    background-image: none;
    box-shadow: none;
    -webkit-appearance: none;
    appearance: none;

    &::-ms-expand {
      display: none;
    }
  }

  &.cp_sl02 {
    position: relative;
    border: 1px solid #bbbbbb;
    border-radius: 2px;
    background: #ffffff;

    &::before {
      position: absolute;
      top: 0.8em;
      right: 0.9em;
      width: 0;
      height: 0;
      padding: 0;
      content: '';
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid #666666;
      pointer-events: none;
    }

    &:after {
      position: absolute;
      top: 0;
      right: 2.5em;
      bottom: 0;
      width: 1px;
      content: '';
      border-left: 1px solid #bbbbbb;
    }

    select {
      padding: 8px 38px 8px 8px;
      color: $text-sub-color;
    }
  }
}
</style>