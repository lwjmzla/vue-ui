<template>
  <div class="el-dialog__wrapper" v-if="visible">
    <div class="mask" @click="maskClick ? closeDialog() : ''"></div>
    <div class="wrapper" :style="`width: ${width}`">
      <header>
        <span>{{ title }}</span>
        <i class="el-icon-close" @click="closeDialog"></i>
      </header>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      width: {
        type: String,
        default: '50%'
      },
      maskClick: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      };
    },
    created() {
    },
    methods: {
      closeDialog() {
        this.$emit('update:visible', false);
      }
    }
        
  };
</script>
<style lang='scss' scoped>
.el-dialog__wrapper{
    z-index: 2001;
    display: flex;
    align-items: center;
    justify-content: center;
}
.mask{
    position: absolute;top: 0px;left: 0px;right: 0;bottom: 0;background: rgba(0,0,0,0.3);
}
.wrapper{
    width: 560px;
    background: #fff;
    position: relative;
}
.wrapper header{
    padding: 0 15px;
    height: 56px;
    background: #F7F7F7;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.el-icon-close{
    cursor: pointer;
}
</style>
