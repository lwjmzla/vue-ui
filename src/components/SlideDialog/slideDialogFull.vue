<template>
  <div v-if="show">
    <div class="mask" v-show="animShow"></div>
    <div class="dialog-wrap" @click="maskClick ? closeDialog(): ''">
      <div class="detail-dialog" :class="animShow ? 'active-in' : 'active-out'" :style="`width: ${width}`" @click.stop="doNoth">
        <header>
          <span>{{ title }}</span>
          <i class="el-icon-close" @click="closeDialog"></i>
        </header>
        <div class="detail-b">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    // import detail from './detail';
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      width: {
        type: String,
        default: '60%'
      },
      maskClick: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: 'title'
      },
      customClose: {
        type: Boolean,
        default: false
      }
    },
    inheritAttrs: false,
    watch: {
      visible: {
        handler(newVal) {
          // setTimeout(() => {
          //   this.show = newVal;
          // }, 100);
          if (newVal) {
            this.handleAnimShow();
          } else {
            this.handleAnimHide();
          }
        }
        // immediate: true
      }
    },
    data() {
      return {
        show: false,
        animShow: false
      };
    },
    components: {
      // detail
    },
    methods: {
      doNoth() {},
      closeDialog() {
        // if (this.customClose) {
        //   this.$emit('customCloseCallback');
        // } else {
        //   this.$emit('update:visible', false);
        // }
        this.$emit('update:visible', false);
      },
      onHide() {
        this.show = false;
      },
      handleAnimHide() {
        this.animShow = false;
        setTimeout(() => {
          this.onHide();
        }, 300);
      },
      handleAnimShow() {
        this.show = true;
        setTimeout(() => {
          this.animShow = true;
        }, 200);
      }
    }
  };
</script>

<style lang='scss' scoped>
.dialog-wrap,.mask{
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.mask{
  background: rgba(0,0,0,0.7);
}
.detail-dialog{
  position: absolute;
  top: 0px;
  right: 0;
  width: 60%;
  height: 100%;
  background: #fff;
  box-sizing: border-box;
  transition: all 0.3s;
  transform: translate(100%, 0);
  &.active-in{
    transform: translate(0, 0);
  }
  &.active-out{
    transform: translate(100%, 0);
  }
}
.detail-dialog header{
  padding: 0 20px;
  height: 48px;
  background: #F7F7F7;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-icon-close{
  cursor: pointer;
}
.detail-b{
  height: calc(100% - 48px);
}
</style>
