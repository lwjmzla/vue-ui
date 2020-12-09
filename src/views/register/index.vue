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
        <el-form-item label="授权码" class="w350">
          <el-input v-model="form.authCode" placeholder="授权码请联系管理索取"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import { register } from '@/api/index.js';
  export default {
    name: 'Register',
    data() {
      return {
        form: {
          account: '',
          pwd: '',
          authCode: ''
        },
        svg: ''
      };
    },
    computed: {
    },
    created() {
    },
    methods: {
      register() {
        let params = this.form;
        this.$showLoading();
        register(params).then((res) => {
          console.log(res);
          if (res.success) {
            this.$message.success(res.message);
            this.$router.push('/login');
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
    color: $color-primary;margin-left: 10px;
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
