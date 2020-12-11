<template>
  <div class="login_page">
    <div class="login_cont">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号" class="w350">
          <el-input v-model="form.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" class="w350">
          <el-input placeholder="请输入密码" v-model="form.pwd" show-password></el-input>
        </el-form-item>
        <div class="yzm">
          <el-form-item label="验证码" class="w350">
            <el-input v-model="form.yzm" placeholder="请输入验证码" @keyup.enter.native="login"></el-input>
          </el-form-item>
          <div class="yzm-svg" v-html="svg" @click="_getCaptcha"></div>
        </div>
        <el-form-item>
          <el-button type="primary" @click="login">立即登录</el-button>
          <span class="forget" @click="forget">忘记密码？</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import { getCaptcha, login } from '@/api/index.js';
  export default {
    name: 'Login',

    data() {
      return {
        activeName: 'login',
        form: {
          account: '13535123588',
          pwd: '123456',
          yzm: '',
          identify: ''
        },
        svg: ''
      };
    },

    computed: {
    },
    created() {
      this._getCaptcha();
    },
    methods: {
      forget() {
        this.$router.push('/modifyPwd');
      },
      handleTabClick(tab, event) {
        console.log(tab);
        if (tab.name === 'register') {
          this.$router.push('/register');
        }
      },
      login() {
        let params = this.form;
        if (!params.account) {
          this.$message.warning('请输入账号');
          return;
        }
        if (!params.pwd) {
          this.$message.warning('请输入密码');
          return;
        }
        if (!params.yzm) {
          this.$message.warning('请输入验证码');
          return;
        }
        this.$showLoading();
        login(params).then((res) => {
          console.log(res);
          if (res.success) {
            sessionStorage.setItem('jwtToken', res.content.jwtToken);
            this.$router.push('/member');
          } else {
            this.$message.error(res.message);
            this._getCaptcha();
          }
        }).catch((err) => {
          console.log(err);
        }).finally(() => {
          this.$hideLoading();
        });
      },
      _getCaptcha() {
        this.$showLoading();
        let params = {};
        getCaptcha(params).then((res) => {
          if (res.success) {
            this.svg = res.content.svg;
            this.form.identify = res.content.identify;
          } else {
            this.$message.error(res.message);
          }
        }).catch((err) => {
          console.log(err);
        }).finally(() => {
          this.$hideLoading();
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
  .login_page {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    
    background:url(/img/login_bg.jpg);
    background-size:100% 100%;

    .login_cont {
      position: absolute;
      width:370px;
      padding:25px 24px;
      padding-top: 40px;
      background-color: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 2px 23px 0 rgba(0,85,158,0.20);
      border-radius: 6px;
    }
  }
  .w350{
    width: 350px;
  }
  .forget{
    color: $color-primary;margin-left: 10px;cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
  }
  .yzm{
    margin-bottom: 22px;
    display: flex;align-items: center;justify-content: space-between;
    .el-form-item{margin-bottom: 0;}
    .yzm-svg{
      width: 150px;height: 40px;
      ::v-deep svg{height: 40px;}
    }
  }
</style>
