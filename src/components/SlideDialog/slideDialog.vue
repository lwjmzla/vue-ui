<template>
  <div class="wrap" v-if="visible" @click="closeDialog">
    <transition>
      <div class="detail-dialog" v-if="show" :style="`width: ${width}`" @click.stop="doNoth">
        <!-- <detail v-bind="$attrs" v-on="$listeners"></detail> -->
        <slot></slot>
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
        default: '80%'
      },
      maskClick: {
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
        this.maskClick ? this.$emit('update:visible', false) : '';
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
        position: fixed;background: rgba(0,0,0,0.7);z-index: 100;
        top: 90px;left: 260px;right: 0;bottom: 0;
    }
    .detail-dialog{
        position: absolute;
        top: 0px;
        right: 0;
        width: 80%;
        height: 100%;
        background: #fff;
        box-sizing: border-box;
        padding: 20px;
    }
</style>
