<template>
  <div class="wrap" v-if="visible" @click="maskClick ? closeDialog(): ''">
    <transition>
      <div class="detail-dialog" v-if="show" :style="`width: ${width}`" @click.stop="doNoth">
        <header>
          <span>{{ title }}</span>
          <i class="el-icon-close" @click="closeDialog"></i>
        </header>
        <div class="detail-b">
          <slot></slot>
        </div>
      </div>
    </transition>
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
          setTimeout(() => {
            this.show = newVal;
          }, 100);
        },
        immediate: true
      }
    },
    data() {
      return {
        show: false
      };
    },
    components: {
      // detail
    },
    methods: {
      doNoth() {},
      closeDialog() {
        if (this.customClose) {
          this.$emit('customCloseCallback');
        } else {
          this.$emit('update:visible', false);
        }
      }
    }
  };
</script>

<style lang='scss' scoped>
    .v-enter-active,.v-leave-active {
        transition:all 0.3s;
    }

    .v-enter,.v-leave-to{
        transform:translateX(100%);
    }
    .wrap{
        position: fixed;
        background: rgba(0,0,0,0.7);
        z-index: 4000;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .detail-dialog{
        position: absolute;
        top: 0px;
        right: 0;
        width: 60%;
        height: 100%;
        background: #fff;
        box-sizing: border-box;
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
