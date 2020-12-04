<template>
  <div class="wrap">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="手机/邮箱" class="w350">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" class="w350">
        <el-input placeholder="请输入密码" v-model="form.pwd" show-password></el-input>
      </el-form-item>
      <div class="yzm">
        <el-form-item label="验证吗" class="w350">
          <el-input v-model="form.yzm"></el-input>
        </el-form-item>
        <div class="yzm-svg" v-html="svg" @click="_getCaptcha"></div>
      </div>
      <el-form-item>
        <el-button type="primary" @click="login">立即登录</el-button>
        <span class="forget">忘记密码？</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { getCaptcha } from '@/api/index.js';
  export default {
    data() {
      return {
        activeName: 'login',
        form: {
          account: '',
          pwd: '',
          yzm: ''
        },
        svg: ''
      };
    },
    created() {
      // this._getCaptcha();
    },
    methods: {
      handleTabClick(tab, event) {
        console.log(tab);
        if (tab.name === 'register') {
          this.$router.push('/register');
        }
      },
      login() {
        console.log('submit!');
      },
      _getCaptcha() {
        this.$showLoading();
        let params = {};
        getCaptcha(params).then((res) => {
          if (res.code === 200) {
            this.svg = res.data;
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

<style lang='scss' scoped>
  .w350{
    width: 350px;
  }
  .forget{
    color: $color-primary;
  }
  .wrap{
    padding: 15px;
  }
</style>
