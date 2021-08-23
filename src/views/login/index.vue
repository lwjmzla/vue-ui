<template>
  <div class="login_page">
    <div class="login_cont">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
        <div class="ball" v-show="ballFlag" ref="ball">
          <div class="inner" ref="inner"></div>
        </div>
      </transition>
      <el-form ref="form" :model="form" label-width="80px">
        <div class="car">
          <span ref="car">购物车</span>
        </div>
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
        <div class="add">
          <span id="ball" @click="addCar($event)">+</span>
        </div>
      </el-form>
      <el-button type="primary" @click="changeVal">修改</el-button>
      <el-button type="primary" @click="changeVal1">修改1</el-button>
      <div v-for="(item,index) in arr" :key="index">{{ item }}</div>
      <p>{{ form.name }}</p>
      <div v-for="(item,index) in objectList" :key="item.id">{{ item.value }}</div>
      <div id="button" @click="sendMsgToWorker('主线程：我传信息给worker了')">button</div>
    </div>
  </div>
</template>
<script>
  import { getCaptcha, login } from '@/api/index.js';
  import Worker from '@/worker/messages.worker';
  let WorkerObj = null;
  let CONNECTID = null;
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
        svg: '',
        ballFlag: false,
        startPosition: {},
        arr: [1],
        objectList: [
          { value: 1, id: 1 },
          { value: 2, id: 2 },
          { value: 3, id: 3 }
        ]
      };
    },

    computed: {
    },
    created() {
      this._getCaptcha();
      console.log(process.env.VUE_APP_BASE_API);
      console.log(this.arr);
      // class Person {
      //   constructor(name) {
      //     this.name = name;
      //   }
      //   run() {
      //     console.log('Person run');
      //   }
      // }
      // class LWJ extends Person {
      //   static arr = ['1', '2']
      //   constructor(name) {
      //     super(name);
      //   }
      //   run() {
      //     console.log('lwj run');
      //     super.run();
      //   }
      // }
      // let lwj = new LWJ('LWJ');
      // console.log(lwj);
      // lwj.run();
      // console.dir(LWJ);
    },
    async mounted() {
      setTimeout(() => {
        WorkerObj = new Worker();
        console.log('WorkerObj', WorkerObj);

        WorkerObj.port.onmessage = (e) => {
          console.log('onmessage', e.data);
          const {
            msg,
            connectID
          } = e.data || {};
          if (connectID) CONNECTID = connectID;
        };

        WorkerObj.port.onerror = (e) => {
          console.log(e);
        };
        // 刷新/关闭页面时通知SharedWorker过滤当前实例
        window.onbeforeunload = () => {
          WorkerObj.port.postMessage({
            connectID: CONNECTID
          });
        };
      }, 2000);
    },
    methods: {
      sleep(time = 1000) {
        return new Promise((resolve, reject) => {
          setTimeout(resolve, time);
        });
      },
      sendMsgToWorker(msg) {
        WorkerObj.port.postMessage({ msg });
      },
      changeVal() {
        this.objectList[1].value = 3;
        this.arr[0] = 10;
        this.form.name = 'lwj';
        // console.log(this.arr);
        // this.arr.splice(0, 0); 
      },
      changeVal1() {
        this.$set(this.arr, 0, 11);
        this.$set(this.form, 'name', 'lwb');
        console.log(this.arr);
      },
      addCar(ev) {
        this.ballFlag = true;
        this.startPosition = ev.target.getBoundingClientRect(); // !哪里点击哪里就是开始位置
      },
      beforeEnter(el) {
        const carPosition = this.$refs.car.getBoundingClientRect(); // !到达的目的位置
        const xDist = this.startPosition.left - carPosition.left;
        const yDist = this.startPosition.top - carPosition.top;
        // !首先通过transform 到达开始位置
        el.style.transform = `translate(0px, ${yDist}px)`;//! 控制对Y轴的动画
        this.$refs.inner.style.transform = `translate(${xDist}px, 0px)`;//! 控制对X轴的动画
      },
      enter(el, done) {
        // el.offsetWidth; // !重绘
        // !el.offsetWidth、setTimeout都是实现重绘的效果，因为beforeEnter、enter钩子都在同一主线程，连续设置el.style.transform看不到变化的效果，所以需要重绘
        setTimeout(() => {
          el.style.transform = 'translate(0,0)';
          el.style.transition = 'all 0.7s cubic-bezier(.4,-0.3,1,.68)'; // !对Y轴的
          this.$refs.inner.style.transform = 'translate(0,0)';
          this.$refs.inner.style.transition = 'all 0.7s linear';// !对X轴的
          done();
        }, 10);
      },
      afterEnter(el) {
        this.ballFlag = !this.ballFlag;
      },
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
  .ball {
      width: 15px;
      height: 15px;
      top: 40px;
      right: 52px;
      position: absolute;
      z-index: 99;
      .inner{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
      }
  }
  .car{
    text-align: right;
    span{
    }
  }
  .add{
    span{
      display: block;width: 15px;height: 15px;background: red;color: #fff;
      text-align: center;border-radius: 50%;cursor: pointer;
    }
  }
</style>
